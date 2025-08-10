-- Fix the remaining duplicate image in Modern Studio Apartment
-- Still has duplicate kitchen image at display_order = 2

DO $$
DECLARE
  modern_studio_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';  -- Modern Studio Apartment
BEGIN
  RAISE NOTICE 'Fixing remaining duplicate kitchen image...';
  
  -- Replace the kitchen image at display_order = 2 with a completely different one
  -- Old: photo-1586023492125-27b2c045efd7 (still same as UCLA)
  -- New: Unique modern living area image
  UPDATE property_images 
  SET 
    image_url = 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    alt_text = 'Spacious modern living area with contemporary furniture and natural lighting'
  WHERE 
    property_id = modern_studio_id 
    AND display_order = 2;
  
  RAISE NOTICE 'Successfully fixed remaining duplicate image!';
  RAISE NOTICE 'Modern Studio Apartment now has completely unique images';
  
END $$;