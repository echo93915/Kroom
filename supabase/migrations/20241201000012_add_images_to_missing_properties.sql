-- Add images to properties that are missing them
-- Adding images for "Modern Studio Near UCLA" and "Shared 2BR Apartment"

DO $$
DECLARE
  ucla_studio_id UUID := '902c82d5-a2bc-4709-b558-79f978a7c97d';  -- Modern Studio Near UCLA
  shared_2br_id UUID := 'e575ffd1-f8c0-4005-840c-47c54b529b88';   -- Shared 2BR Apartment
BEGIN
  RAISE NOTICE 'Adding images to properties missing them...';
  
  -- Images for Modern Studio Near UCLA
  RAISE NOTICE 'Adding images for Modern Studio Near UCLA...';
  
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  (ucla_studio_id, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern studio apartment near UCLA with contemporary design', 0, true),
  (ucla_studio_id, 'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Bright living area with large windows and city views', 1, false),
  (ucla_studio_id, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2958&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern kitchen with stainless steel appliances', 2, false),
  (ucla_studio_id, 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Comfortable sleeping area with premium bedding', 3, false);
  
  -- Images for Shared 2BR Apartment
  RAISE NOTICE 'Adding images for Shared 2BR Apartment...';
  
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  (shared_2br_id, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Spacious 2-bedroom apartment with modern furnishings', 0, true),
  (shared_2br_id, 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Bright living room with comfortable seating area', 1, false),
  (shared_2br_id, 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Well-equipped kitchen with dining space', 2, false),
  (shared_2br_id, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Master bedroom with ample natural light', 3, false),
  (shared_2br_id, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Second bedroom perfect for roommates', 4, false);
  
  RAISE NOTICE 'Successfully added images to both properties!';
  RAISE NOTICE 'Modern Studio Near UCLA: 4 images added';
  RAISE NOTICE 'Shared 2BR Apartment: 5 images added';
  
END $$;