-- Replace the second image (kitchen) with a different high-quality image
-- Update the image at display_order = 1

DO $$
DECLARE
  ucla_property_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';
BEGIN
  RAISE NOTICE 'Replacing second image for UCLA property...';
  
  -- Update the second image (display_order = 1) with a new workspace/study area image
  UPDATE property_images 
  SET 
    image_url = 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt_text = 'Modern study area with desk, laptop, and organized workspace perfect for students'
  WHERE 
    property_id = ucla_property_id 
    AND display_order = 1;
  
  RAISE NOTICE 'Successfully replaced second image with study area view!';
  
END $$;