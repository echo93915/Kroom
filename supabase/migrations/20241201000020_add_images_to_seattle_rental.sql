-- Add images to the new Seattle rental property

DO $$
DECLARE
  seattle_rental_id UUID := '7816617c-7da9-4c72-8bc2-c227638ce3ab';  -- Seattle 1BR Near UW
BEGIN
  RAISE NOTICE 'Adding images to Seattle 1BR rental property...';
  
  -- Images for Seattle 1BR Near University District
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  (seattle_rental_id, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Cozy 1-bedroom apartment in Seattle University District', 0, true),
  (seattle_rental_id, 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Bright living area with comfortable seating and city views', 1, false),
  (seattle_rental_id, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2958&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern kitchen with updated appliances and breakfast bar', 2, false),
  (seattle_rental_id, 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Peaceful bedroom with ample natural light', 3, false),
  (seattle_rental_id, 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'University District neighborhood with cafes and shops nearby', 4, false);
  
  RAISE NOTICE 'Successfully added 5 images to Seattle rental property!';
  
END $$;