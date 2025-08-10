-- Update primary image to square dimension for UCLA property
-- Replace the primary image (display_order = 0) with a square image

DO $$
DECLARE
  ucla_property_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';
BEGIN
  RAISE NOTICE 'Updating primary image to square dimension...';
  
  -- Update the primary image (display_order = 0) with a square image
  UPDATE property_images 
  SET 
    image_url = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&h=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt_text = 'Modern studio apartment with square crop - interior view with contemporary furnishings and natural light'
  WHERE 
    property_id = ucla_property_id 
    AND display_order = 0;
  
  RAISE NOTICE 'Successfully updated primary image to square dimension!';
  RAISE NOTICE 'New image: Modern studio apartment (1000x1000)';
  
END $$;