-- Add new columns to user_profiles
ALTER TABLE public.user_profiles
  ADD COLUMN cover_photo_url text,
  ADD COLUMN introduction text;

-- Drop the interests column from user_profiles
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS interests;

-- Create interests table
CREATE TABLE public.interests (
    id text PRIMARY KEY,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Create junction table for user_profiles and interests
CREATE TABLE public.user_profile_interests (
    user_profile_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    interest_id text REFERENCES public.interests(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now() NOT NULL,
    PRIMARY KEY (user_profile_id, interest_id)
);

-- Grant access to public
GRANT ALL ON public.interests TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.user_profile_interests TO postgres, anon, authenticated, service_role;

-- Enable RLS
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profile_interests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Interests are viewable by everyone" ON public.interests
    FOR SELECT USING (true);

CREATE POLICY "User profile interests are viewable by everyone" ON public.user_profile_interests
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own interests" ON public.user_profile_interests
    FOR ALL USING (auth.uid() = user_profile_id)
    WITH CHECK (auth.uid() = user_profile_id);

-- Create storage bucket for avatars with size limit
insert into storage.buckets
  (id, name, public, file_size_limit)
values
  ('avatars', 'avatars', true, 10485760), -- 10MB = 10 * 1024 * 1024 bytes
  ('covers', 'covers', true, 20971520); -- 20MB = 20 * 1024 * 1024 bytes

-- Set up storage policies for avatars
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

-- Set up storage policies for cover photos
create policy "Cover photos are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'covers' );

create policy "Users can upload their own cover photo"
  on storage.objects for insert
  with check (
    bucket_id = 'covers' AND
    auth.uid() = owner
  );

create policy "Users can update their own cover photo"
  on storage.objects for update
  using (
    bucket_id = 'covers' AND
    auth.uid() = owner
  );

create policy "Users can delete their own cover photo"
  on storage.objects for delete
  using (
    bucket_id = 'covers' AND
    auth.uid() = owner
  );

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();