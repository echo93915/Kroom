-- Fix the duplicate image at display_order = 3 in Modern Studio Apartment

DO $$
DECLARE
  modern_studio_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';  -- Modern Studio Apartment
BEGIN
  RAISE NOTICE 'Fixing duplicate image at display_order = 3...';
  
  -- Replace the duplicate image at display_order = 3
  -- Old: photo-1586023492125-27b2c045efd7 (same as UCLA)
  -- New: Unique modern bedroom/study area image
  UPDATE property_images 
  SET 
    image_url = 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    alt_text = 'Modern studio bedroom area with built-in workspace and storage'
  WHERE 
    property_id = modern_studio_id 
    AND display_order = 3;
  
  RAISE NOTICE 'Successfully replaced duplicate image at display_order = 3!';
  RAISE NOTICE 'All images should now be unique between properties';
  
END $$;