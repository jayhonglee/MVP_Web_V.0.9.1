-- Add new columns to user_profiles
ALTER TABLE public.user_profiles
  ADD COLUMN cover_photo_url text,
  ADD COLUMN introduction text;

-- Drop the interests column from user_profiles
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS interests;

-- Create hangout_categories table
CREATE TABLE public.hangout_categories (
    id text PRIMARY KEY,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Create junction table for user_profiles and hangout_categories
CREATE TABLE public.user_profile_categories (
    user_profile_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    category_id text REFERENCES public.hangout_categories(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now() NOT NULL,
    PRIMARY KEY (user_profile_id, category_id)
);

-- Grant access to public
GRANT ALL ON public.hangout_categories TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.user_profile_categories TO postgres, anon, authenticated, service_role;

-- Enable RLS
ALTER TABLE public.hangout_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profile_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Hangout categories are viewable by everyone" ON public.hangout_categories
    FOR SELECT USING (true);

CREATE POLICY "User profile categories are viewable by everyone" ON public.user_profile_categories
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own categories" ON public.user_profile_categories
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