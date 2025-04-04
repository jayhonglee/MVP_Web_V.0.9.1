-- Enable the pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Create a function to clean up unverified users
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

-- Create the cron job to run every 5 minutes
SELECT cron.schedule(
  'cleanup-unverified-users',  -- job name
  '*/5 * * * *',              -- every 5 minutes
  'SELECT clean_unverified_users();'
);

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION clean_unverified_users() TO postgres; 