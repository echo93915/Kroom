-- Replace duplicate images in Modern Studio Apartment with unique ones
-- This property shares images with Modern Studio Near UCLA

DO $$
DECLARE
  modern_studio_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';  -- Modern Studio Apartment
BEGIN
  RAISE NOTICE 'Replacing duplicate images in Modern Studio Apartment...';
  
  -- Replace the primary image (display_order = 0)
  -- Old: photo-1522708323590-d24dbb6b0267 (same as UCLA)
  -- New: Unique modern studio apartment image
  UPDATE property_images 
  SET 
    image_url = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    alt_text = 'Elegant modern studio apartment with contemporary design and city views'
  WHERE 
    property_id = modern_studio_id 
    AND display_order = 0;
  
  -- Replace the kitchen image (display_order = 2)
  -- Old: photo-1586023492125-27b2c045efd7 (same as UCLA)
  -- New: Unique kitchen design
  UPDATE property_images 
  SET 
    image_url = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    alt_text = 'Sleek modern kitchen with marble countertops and stainless steel appliances'
  WHERE 
    property_id = modern_studio_id 
    AND display_order = 2;
  
  RAISE NOTICE 'Successfully replaced 2 duplicate images in Modern Studio Apartment!';
  RAISE NOTICE 'Property now has completely unique image set from UCLA property';
  
END $$;