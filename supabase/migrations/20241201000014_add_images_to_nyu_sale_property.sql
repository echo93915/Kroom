-- Add images to the Modern Condo Near NYU sale property
-- This property was from the initial seed data but missing images

DO $$
DECLARE
  nyu_property_id UUID := 'ccdf19ae-7672-4dd7-9a09-b8be5eb567a3';  -- Modern Condo Near NYU
BEGIN
  RAISE NOTICE 'Adding images to Modern Condo Near NYU sale property...';
  
  -- Images for Modern Condo Near NYU (Sale Property)
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  (nyu_property_id, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern condo near NYU with elegant design and city views', 0, true),
  (nyu_property_id, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3', 'Spacious living area with modern furnishings and natural light', 1, false),
  (nyu_property_id, 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Contemporary kitchen with high-end appliances', 2, false),
  (nyu_property_id, 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Comfortable bedroom with premium finishes', 3, false),
  (nyu_property_id, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern bathroom with luxury fixtures', 4, false);
  
  RAISE NOTICE 'Successfully added 5 images to Modern Condo Near NYU!';
  RAISE NOTICE 'NYU Property now has: Primary image + 4 additional images';
  
END $$;