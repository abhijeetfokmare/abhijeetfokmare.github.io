/*
# Create portfolio tables (single-tenant, no auth)

1. New Tables
- `portfolio_profile`: Stores the portfolio owner's personal details (name, title, bio, contact info, avatar). Single row table.
- `portfolio_photos`: Stores portfolio photos with title, caption, category, and display order.
2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD because this is a single-tenant public portfolio with no sign-in.
*/

CREATE TABLE IF NOT EXISTS portfolio_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Your Name',
  title text NOT NULL DEFAULT 'Your Title',
  tagline text NOT NULL DEFAULT 'Your Tagline',
  bio text NOT NULL DEFAULT 'Tell your story here...',
  email text NOT NULL DEFAULT 'you@example.com',
  phone text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  avatar_url text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text NOT NULL DEFAULT '',
  caption text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_profile" ON portfolio_profile;
CREATE POLICY "anon_select_profile" ON portfolio_profile FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_profile" ON portfolio_profile;
CREATE POLICY "anon_insert_profile" ON portfolio_profile FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_profile" ON portfolio_profile;
CREATE POLICY "anon_update_profile" ON portfolio_profile FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_profile" ON portfolio_profile;
CREATE POLICY "anon_delete_profile" ON portfolio_profile FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_photos" ON portfolio_photos;
CREATE POLICY "anon_select_photos" ON portfolio_photos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_photos" ON portfolio_photos;
CREATE POLICY "anon_insert_photos" ON portfolio_photos FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_photos" ON portfolio_photos;
CREATE POLICY "anon_update_photos" ON portfolio_photos FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_photos" ON portfolio_photos;
CREATE POLICY "anon_delete_photos" ON portfolio_photos FOR DELETE
  TO anon, authenticated USING (true);

-- Seed a default profile row
INSERT INTO portfolio_profile (id, name, title, tagline, bio, email, avatar_url)
SELECT gen_random_uuid(), 'Alex Morgan', 'Creative Photographer & Visual Storyteller', 'Capturing moments that tell your story', 'I am a passionate visual artist dedicated to capturing the beauty in everyday moments. With years of experience behind the lens, I specialize in portrait, landscape, and street photography that evokes emotion and tells a story.', 'hello@alexmorgan.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE NOT EXISTS (SELECT 1 FROM portfolio_profile);

-- Seed some default photos
INSERT INTO portfolio_photos (image_url, title, caption, category, display_order)
SELECT 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800', 'Mountain Solitude', 'Captured at dawn in the Alps', 'Landscape', 1
WHERE NOT EXISTS (SELECT 1 FROM portfolio_photos LIMIT 1);

INSERT INTO portfolio_photos (image_url, title, caption, category, display_order)
SELECT 'https://images.pexels.com/photos/1681011/pexels-photo-1681011.jpeg?auto=compress&cs=tinysrgb&w=800', 'Urban Lines', 'City geometry in black and white', 'Street', 2
WHERE NOT EXISTS (SELECT 1 FROM portfolio_photos LIMIT 2);

INSERT INTO portfolio_photos (image_url, title, caption, category, display_order)
SELECT 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=800', 'Golden Portrait', 'Soft light, warm tones', 'Portrait', 3
WHERE NOT EXISTS (SELECT 1 FROM portfolio_photos LIMIT 3);

INSERT INTO portfolio_photos (image_url, title, caption, category, display_order)
SELECT 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800', 'Ocean Calm', 'Waves at golden hour', 'Landscape', 4
WHERE NOT EXISTS (SELECT 1 FROM portfolio_photos LIMIT 4);

INSERT INTO portfolio_photos (image_url, title, caption, category, display_order)
SELECT 'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=800', 'City Motion', 'Long exposure traffic trails', 'Street', 5
WHERE NOT EXISTS (SELECT 1 FROM portfolio_photos LIMIT 5);

INSERT INTO portfolio_photos (image_url, title, caption, category, display_order)
SELECT 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800', 'Quiet Moment', 'Candid portrait in natural light', 'Portrait', 6
WHERE NOT EXISTS (SELECT 1 FROM portfolio_photos LIMIT 6);
