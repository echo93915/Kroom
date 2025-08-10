-- Remove the second image from UCLA property
-- Delete the image at display_order = 1

DO $$
DECLARE
  ucla_property_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';
BEGIN
  RAISE NOTICE 'Removing second image from UCLA property...';
  
  -- Delete the second image (display_order = 1)
  DELETE FROM property_images 
  WHERE 
    property_id = ucla_property_id 
    AND display_order = 1;
  
  RAISE NOTICE 'Successfully removed second image!';
  RAISE NOTICE 'Remaining images: Primary + 4 additional images';
  
END $$;