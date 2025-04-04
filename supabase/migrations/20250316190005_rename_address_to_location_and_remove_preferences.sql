-- Drop the existing foreign key constraint for hangouts
ALTER TABLE public.hangouts
    DROP CONSTRAINT IF EXISTS hangouts_address_id_fkey;

-- Rename the column in hangouts
ALTER TABLE public.hangouts
    RENAME COLUMN address_id TO location_id;

-- Re-add the foreign key constraint for hangouts
ALTER TABLE public.hangouts
    ADD CONSTRAINT hangouts_location_id_fkey
    FOREIGN KEY (location_id)
    REFERENCES public.addresses(id);

-- Drop the existing foreign key constraint for user_profiles
ALTER TABLE public.user_profiles
    DROP CONSTRAINT IF EXISTS user_profiles_address_id_fkey;

-- Rename the column in user_profiles
ALTER TABLE public.user_profiles
    RENAME COLUMN address_id TO location_id;

-- Re-add the foreign key constraint for user_profiles
ALTER TABLE public.user_profiles
    ADD CONSTRAINT user_profiles_location_id_fkey
    FOREIGN KEY (location_id)
    REFERENCES public.addresses(id);

-- Update any existing RLS policies that might reference the old column name
-- (In this case, there weren't any RLS policies specifically referencing address_id) 

-- Drop the hangout_preferences table
DROP TABLE IF EXISTS public.hangout_preferences;

-- Drop any functions that reference hangout_preferences
DROP FUNCTION IF EXISTS clean_unverified_users() CASCADE;

-- Recreate the clean_unverified_users function without hangout_preferences references
CREATE OR REPLACE FUNCTION clean_unverified_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete users who:
  -- 1. Were created more than 10 minutes ago
  -- 2. Have not verified their email
  -- 3. Are not already confirmed
  DELETE FROM auth.users
  WHERE confirmed_at IS NULL
    AND email_confirmed_at IS NULL
    AND created_at <= NOW() - INTERVAL '10 minutes';
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION clean_unverified_users() TO postgres;

-- Reschedule the cron job (since we dropped and recreated the function)
SELECT cron.schedule(
  'cleanup-unverified-users',  -- job name
  '*/5 * * * *',              -- every 5 minutes
  'SELECT clean_unverified_users();'
); 