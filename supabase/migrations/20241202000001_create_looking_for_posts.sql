CREATE TABLE looking_for_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('rental', 'roommate', 'sublet', 'sale')),
  budget TEXT,
  location TEXT,
  move_in TEXT,
  photo_url TEXT,
  university TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_looking_for_posts_created_at ON looking_for_posts(created_at DESC);
CREATE INDEX idx_looking_for_posts_category ON looking_for_posts(category);

ALTER TABLE looking_for_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active posts" ON looking_for_posts
  FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can create posts" ON looking_for_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own posts" ON looking_for_posts
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own posts" ON looking_for_posts
  FOR DELETE USING (user_id = auth.uid());
