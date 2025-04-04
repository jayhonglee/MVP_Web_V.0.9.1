-- Create addresses table
CREATE TABLE public.addresses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    place_name text,
    address text,
    city text,
    state text,
    postal_code text,
    country text,
    longitude numeric,
    latitude numeric,
    coordinates postgis.geography(Point, 4326) NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Grant access to public
GRANT ALL ON public.addresses TO postgres, anon, authenticated, service_role;

-- Add address_id column to user_profiles and create foreign key
ALTER TABLE public.user_profiles
    ADD COLUMN address_id uuid REFERENCES public.addresses(id);

-- Drop the old location columns from user_profiles
ALTER TABLE public.user_profiles
    DROP COLUMN IF EXISTS location_address,
    DROP COLUMN IF EXISTS location_coordinates;

-- Enable RLS on addresses table
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Create policies for addresses
CREATE POLICY "Addresses are viewable by everyone"
    ON public.addresses FOR SELECT
    USING (true);

CREATE POLICY "Users can create addresses"
    ON public.addresses FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update addresses"
    ON public.addresses FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.address_id = addresses.id
            AND user_profiles.id = auth.uid()
        )
    );

-- Create hangouts table
CREATE TABLE public.hangouts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    host_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type text REFERENCES public.hangout_categories(id) ON DELETE RESTRICT,
    title text NOT NULL,
    description text NOT NULL,
    cover_image_url text,
    scheduled_when timestamptz NOT NULL,
    location_id uuid REFERENCES public.addresses(id) NOT NULL,
    navigation_instruction text,
    group_size int NOT NULL CHECK (group_size BETWEEN 3 AND 6),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create storage bucket for hangout cover images
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('hangout-covers', 'hangout-covers', true, 20971520); -- 20MB limit

-- Set up storage policies for hangout cover images
CREATE POLICY "Hangout cover images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'hangout-covers');

CREATE POLICY "Users can upload hangout cover images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'hangout-covers' AND auth.uid() = owner);

CREATE POLICY "Users can update their hangout cover images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'hangout-covers' AND auth.uid() = owner);

CREATE POLICY "Users can delete their hangout cover images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'hangout-covers' AND auth.uid() = owner);

-- Enable RLS on hangouts table
ALTER TABLE public.hangouts ENABLE ROW LEVEL SECURITY;

-- Create policies for hangouts
CREATE POLICY "Hangouts are viewable by everyone"
    ON public.hangouts FOR SELECT
    USING (true);

CREATE POLICY "Users can create their own hangouts"
    ON public.hangouts FOR INSERT
    WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Users can update their own hangouts"
    ON public.hangouts FOR UPDATE
    USING (auth.uid() = host_id);

CREATE POLICY "Users can delete their own hangouts"
    ON public.hangouts FOR DELETE
    USING (auth.uid() = host_id);

-- Grant access to public
GRANT ALL ON public.hangouts TO postgres, anon, authenticated, service_role;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.hangouts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_addresses_updated_at
    BEFORE UPDATE ON public.addresses
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Migration to move existing data from user_profiles to addresses
-- This would need a more complex migration script if there's existing data
-- For now, we'll add a comment indicating this need
/*
If there are existing user profiles with location data, you would need to:
1. Create new address records in the addresses table
2. Update the user_profiles.address_id to point to these new records
3. Drop the location_address and location_coordinates columns from user_profiles
*/

-- Create an additional migration file if needed to handle data migration