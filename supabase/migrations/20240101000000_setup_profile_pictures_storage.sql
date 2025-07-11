-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-pictures',
  'profile-pictures',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to upload their own profile pictures
CREATE POLICY "Users can upload their own profile pictures" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profile-pictures' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'profile-pictures'
  );

-- Policy to allow authenticated users to view all profile pictures
CREATE POLICY "Users can view all profile pictures" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'profile-pictures'
    AND auth.role() = 'authenticated'
  );

-- Policy to allow users to update their own profile pictures
CREATE POLICY "Users can update their own profile pictures" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'profile-pictures'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'profile-pictures'
  );

-- Policy to allow users to delete their own profile pictures
CREATE POLICY "Users can delete their own profile pictures" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'profile-pictures'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'profile-pictures'
  );

-- Policy to allow public access to profile pictures (for viewing)
CREATE POLICY "Public can view profile pictures" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'profile-pictures'
  ); 