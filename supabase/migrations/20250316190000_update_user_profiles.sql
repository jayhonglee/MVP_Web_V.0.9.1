-- Add new columns to user_profiles
ALTER TABLE public.user_profiles
  ADD COLUMN gender text,
  ADD COLUMN date_of_birth date,
  ADD COLUMN location_address text,
  ADD COLUMN location_coordinates postgis.geography(Point, 4326);

-- Drop the old location column as we're replacing it with more specific columns
ALTER TABLE public.user_profiles
  DROP COLUMN location;

-- Add constraints
ALTER TABLE public.user_profiles
  ADD CONSTRAINT gender_check CHECK (gender IN ('male', 'female', 'other'));

-- Update RLS policies to allow upsert
DROP POLICY IF EXISTS "Users can insert their own profile." ON "public"."user_profiles";
CREATE POLICY "Users can upsert their own profile." ON "public"."user_profiles" 
  FOR INSERT 
  WITH CHECK ((auth.uid() = id)); 