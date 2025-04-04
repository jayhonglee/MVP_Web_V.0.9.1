-- Create hangout participants table
CREATE TABLE public.hangout_participants (
    id SERIAL PRIMARY KEY,
    hangout_id uuid REFERENCES public.hangouts(id) ON DELETE CASCADE,
    user_profile_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    status text NOT NULL CHECK (status IN ('pending', 'accepted')),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    -- Ensure a user can only participate once in a hangout
    UNIQUE(hangout_id, user_profile_id)
);

-- Create trigger for updated_at
CREATE TRIGGER set_hangout_participants_updated_at
    BEFORE UPDATE ON public.hangout_participants
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.hangout_participants ENABLE ROW LEVEL SECURITY;

-- Grant access to public
GRANT ALL ON public.hangout_participants TO postgres, anon, authenticated, service_role;

-- Create policies for hangout_participants

-- Everyone can view participants
CREATE POLICY "Hangout participants are viewable by everyone"
    ON public.hangout_participants FOR SELECT
    USING (true);

-- Host is allowed to be added to hangout, and Users can request to join hangouts (insert with pending status)
CREATE POLICY "Users can request to join hangouts"
    ON public.hangout_participants FOR INSERT
    WITH CHECK (
        auth.uid() = user_profile_id 
        AND (
            -- Regular users can request to join with pending status
            (status = 'pending'
            AND EXISTS (
                -- Check if the hangout exists and has space
                SELECT 1 FROM public.hangouts h
                WHERE h.id = hangout_id
                -- Prevent joining if user is already a participant
                AND NOT EXISTS (
                    SELECT 1 FROM public.hangout_participants
                    WHERE hangout_id = hangout_id
                    AND user_profile_id = auth.uid()
                )
            ))
            OR
            -- Hosts can add themselves as accepted participants to their own hangouts
            (status = 'accepted'
            AND EXISTS (
                SELECT 1 FROM public.hangouts h
                WHERE h.id = hangout_id
                AND h.host_id = auth.uid()
            ))
        )
    );

-- Host can update participant status (only from pending to accepted)
CREATE POLICY "Hosts can update participant status"
    ON public.hangout_participants FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.hangouts
            WHERE hangouts.id = hangout_participants.hangout_id
            AND hangouts.host_id = auth.uid()
        )
        AND auth.uid() != user_profile_id  -- Prevent host from updating their own status
    );

-- Users can delete their own participation requests
CREATE POLICY "Users can delete their own participation"
    ON public.hangout_participants FOR DELETE
    USING (
        auth.uid() = user_profile_id
        OR
        EXISTS (
            -- Host can also remove participants
            SELECT 1 FROM public.hangouts
            WHERE hangouts.id = hangout_participants.hangout_id
            AND hangouts.host_id = auth.uid()
        )
    );

-- Create function to check group size before accepting participants
CREATE OR REPLACE FUNCTION check_hangout_capacity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'accepted' THEN
        -- Check if accepting this participant would exceed the group size
        IF (
            SELECT COUNT(*) 
            FROM public.hangout_participants hp
            WHERE hp.hangout_id = NEW.hangout_id
            AND hp.status = 'accepted'
        ) >= (
            SELECT group_size 
            FROM public.hangouts 
            WHERE id = NEW.hangout_id
        ) THEN
            RAISE EXCEPTION 'Cannot accept more participants: hangout is full';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check capacity before accepting participants
CREATE TRIGGER check_hangout_capacity_before_update
    BEFORE UPDATE OF status ON public.hangout_participants
    FOR EACH ROW
    WHEN (NEW.status = 'accepted')
    EXECUTE FUNCTION check_hangout_capacity();

-- Create function to automatically add host as participant
CREATE OR REPLACE FUNCTION add_host_as_participant()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.hangout_participants (
        hangout_id,
        user_profile_id,
        status
    ) VALUES (
        NEW.id,
        NEW.host_id,
        'accepted'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to add host as participant when hangout is created
CREATE TRIGGER add_host_as_participant_after_insert
    AFTER INSERT ON public.hangouts
    FOR EACH ROW
    EXECUTE FUNCTION add_host_as_participant();



-- SYSTEM MANAGED CRUD OPERATIONS

-- Create function to handle hangout join requests
CREATE OR REPLACE FUNCTION request_to_join_hangout(
    hangout_id_param uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    requesting_user_id uuid;
    hangout_record record;
    existing_request record;
    result json;
BEGIN
    -- Get the requesting user's ID
    requesting_user_id := auth.uid();
    
    -- Check if user is authenticated
    IF requesting_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Get hangout details
    SELECT * INTO hangout_record
    FROM hangouts
    WHERE id = hangout_id_param;

    -- Check if hangout exists
    IF hangout_record IS NULL THEN
        RAISE EXCEPTION 'Hangout not found';
    END IF;

    -- Check if user is the host (hosts don't need to request to join)
    IF requesting_user_id = hangout_record.host_id THEN
        RAISE EXCEPTION 'Hosts are automatically added to their hangouts';
    END IF;

    -- Check if user already has a request
    SELECT * INTO existing_request
    FROM hangout_participants
    WHERE hangout_id = hangout_id_param
    AND user_profile_id = requesting_user_id;

    IF existing_request IS NOT NULL THEN
        RAISE EXCEPTION 'You have already requested to join this hangout';
    END IF;

    -- Check if hangout is full
    IF (
        SELECT COUNT(*)
        FROM hangout_participants
        WHERE hangout_id = hangout_id_param
        AND status = 'accepted'
    ) >= hangout_record.group_size THEN
        RAISE EXCEPTION 'Hangout is full';
    END IF;

    -- Insert the join request
    INSERT INTO hangout_participants (
        hangout_id,
        user_profile_id,
        status
    ) VALUES (
        hangout_id_param,
        requesting_user_id,
        'pending'
    )
    RETURNING id INTO existing_request;

    -- TODO: Remove this when admission system is implemented
    -- Temporarily auto-accept all join requests
    UPDATE hangout_participants SET status = 'accepted' WHERE id = existing_request.id;

    -- Prepare the response
    SELECT json_build_object(
        'success', true,
        'message', 'Join request sent successfully',
        'request_id', existing_request.id
    ) INTO result;

    RETURN result;

EXCEPTION
    WHEN OTHERS THEN
        -- Handle any other errors
        RETURN json_build_object(
            'success', false,
            'message', SQLERRM
        );
END;
$$;

-- Create function to handle dropping from hangout
CREATE OR REPLACE FUNCTION drop_from_hangout(
    hangout_id_param uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    requesting_user_id uuid;
    hangout_record record;
    participant_record record;
    result json;
BEGIN
    -- Get the requesting user's ID
    requesting_user_id := auth.uid();
    
    -- Check if user is authenticated
    IF requesting_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Get hangout details
    SELECT * INTO hangout_record
    FROM hangouts
    WHERE id = hangout_id_param;

    -- Check if hangout exists
    IF hangout_record IS NULL THEN
        RAISE EXCEPTION 'Hangout not found';
    END IF;

    -- Check if user is the host (hosts cannot leave their own hangout)
    IF requesting_user_id = hangout_record.host_id THEN
        RAISE EXCEPTION 'Hosts cannot leave their own hangouts';
    END IF;

    -- Get participant record
    SELECT * INTO participant_record
    FROM hangout_participants
    WHERE hangout_id = hangout_id_param
    AND user_profile_id = requesting_user_id;

    -- Check if user is actually a participant
    IF participant_record IS NULL THEN
        RAISE EXCEPTION 'You are not a participant in this hangout';
    END IF;

    -- Delete the participation record
    DELETE FROM hangout_participants
    WHERE hangout_id = hangout_id_param
    AND user_profile_id = requesting_user_id
    RETURNING id INTO participant_record;

    -- Prepare the response
    SELECT json_build_object(
        'success', true,
        'message', 'Successfully left the hangout'
    ) INTO result;

    RETURN result;

EXCEPTION
    WHEN OTHERS THEN
        -- Handle any other errors
        RETURN json_build_object(
            'success', false,
            'message', SQLERRM
        );
END;
$$;

-- Create function for hosts to remove participants
CREATE OR REPLACE FUNCTION remove_participant_from_hangout(
    hangout_id_param uuid,
    participant_id_param uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    requesting_user_id uuid;
    hangout_record record;
    participant_record record;
    result json;
BEGIN
    -- Get the requesting user's ID (host)
    requesting_user_id := auth.uid();
    
    -- Check if user is authenticated
    IF requesting_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Get hangout details and verify host
    SELECT * INTO hangout_record
    FROM hangouts
    WHERE id = hangout_id_param
    AND host_id = requesting_user_id;

    -- Check if hangout exists and user is host
    IF hangout_record IS NULL THEN
        RAISE EXCEPTION 'Hangout not found or you are not the host';
    END IF;

    -- Check if target user is not the host
    IF participant_id_param = requesting_user_id THEN
        RAISE EXCEPTION 'Hosts cannot remove themselves';
    END IF;

    -- Get participant record
    SELECT * INTO participant_record
    FROM hangout_participants
    WHERE hangout_id = hangout_id_param
    AND user_profile_id = participant_id_param;

    -- Check if user is actually a participant
    IF participant_record IS NULL THEN
        RAISE EXCEPTION 'User is not a participant in this hangout';
    END IF;

    -- Delete the participation record
    DELETE FROM hangout_participants
    WHERE hangout_id = hangout_id_param
    AND user_profile_id = participant_id_param
    RETURNING id INTO participant_record;

    -- Prepare the response
    SELECT json_build_object(
        'success', true,
        'message', 'Successfully removed participant from the hangout'
    ) INTO result;

    RETURN result;

EXCEPTION
    WHEN OTHERS THEN
        -- Handle any other errors
        RETURN json_build_object(
            'success', false,
            'message', SQLERRM
        );
END;
$$;

-- Grant execute permission on the functions
GRANT EXECUTE ON FUNCTION request_to_join_hangout(uuid) TO authenticated; 
GRANT EXECUTE ON FUNCTION drop_from_hangout(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION remove_participant_from_hangout(uuid, uuid) TO authenticated;