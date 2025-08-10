-- Add more images to UCLA property for better visual appeal
-- This will populate the image gallery with multiple photos

DO $$
DECLARE
  ucla_property_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';
BEGIN
  RAISE NOTICE 'Adding more images to UCLA property...';
  
  -- Insert additional property images
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
    -- Kitchen view
    (ucla_property_id, 
     'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     'Modern studio kitchen with stainless steel appliances and granite countertops',
     1,
     false),
    
    -- Bathroom view
    (ucla_property_id,
     'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     'Clean modern bathroom with glass shower and contemporary fixtures',
     2,
     false),
     
    -- Living area detail
    (ucla_property_id,
     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     'Comfortable living area with large windows and natural light',
     3,
     false),
     
    -- Bedroom/sleeping area
    (ucla_property_id,
     'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     'Cozy sleeping area with modern furnishings and city views',
     4,
     false),
     
    -- Building exterior
    (ucla_property_id,
     'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     'Modern apartment building exterior with secure entrance',
     5,
     false);
  
  RAISE NOTICE 'Added 5 additional images to UCLA property!';
  RAISE NOTICE 'Total images: 6 (1 primary + 5 additional)';
  
END $$;