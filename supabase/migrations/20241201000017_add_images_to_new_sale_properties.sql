-- Add images to the newly migrated sale properties
-- Stanford Townhouse, Berkeley Studio Loft, Seattle 2BR Apartment

DO $$
DECLARE
  stanford_property_id UUID := '3716271d-d783-4763-9d1b-aad942acfb9a';  -- Stanford Townhouse
  berkeley_property_id UUID := 'd792d84c-3efe-4d62-b079-279d0f3197e8';   -- Berkeley Studio Loft
  seattle_property_id UUID := 'd1bf8923-698f-484b-8ddc-19e82c0744e0';    -- Seattle 2BR Apartment
BEGIN
  RAISE NOTICE 'Adding images to newly migrated sale properties...';
  
  -- Images for Stanford 2BR Townhouse
  RAISE NOTICE 'Adding images for Stanford 2BR Townhouse...';
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  (stanford_property_id, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Beautiful 2-bedroom townhouse in Palo Alto near Stanford University', 0, true),
  (stanford_property_id, 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Spacious living area with modern furnishings and natural light', 1, false),
  (stanford_property_id, 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Contemporary kitchen with high-end appliances and granite counters', 2, false),
  (stanford_property_id, 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Master bedroom with premium finishes and ample storage', 3, false),
  (stanford_property_id, 'https://images.unsplash.com/photo-1545324418-cc1a3fa833e5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Private patio perfect for outdoor entertaining', 4, false);
  
  -- Images for Berkeley Studio Loft Investment
  RAISE NOTICE 'Adding images for Berkeley Studio Loft Investment...';
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  (berkeley_property_id, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern studio loft with high ceilings and exposed brick in Berkeley', 0, true),
  (berkeley_property_id, 'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Open concept living space with industrial design elements', 1, false),
  (berkeley_property_id, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2958&auto=format&fit=crop&ixlib=rb-4.0.3', 'Compact but efficient kitchen with modern appliances', 2, false),
  (berkeley_property_id, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Contemporary bathroom with sleek finishes', 3, false);
  
  -- Images for Seattle Modern 2BR Apartment
  RAISE NOTICE 'Adding images for Seattle Modern 2BR Apartment...';
  INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  (seattle_property_id, 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern 2-bedroom apartment in Seattle with panoramic city views', 0, true),
  (seattle_property_id, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Bright living room with floor-to-ceiling windows', 1, false),
  (seattle_property_id, 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Gourmet kitchen with stainless steel appliances and island', 2, false),
  (seattle_property_id, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Master bedroom with stunning water and city views', 3, false),
  (seattle_property_id, 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3', 'Modern bathroom with premium fixtures and finishes', 4, false);
  
  RAISE NOTICE 'Successfully added images to all newly migrated sale properties!';
  RAISE NOTICE 'Stanford Townhouse: 5 images added';
  RAISE NOTICE 'Berkeley Studio Loft: 4 images added';
  RAISE NOTICE 'Seattle 2BR Apartment: 5 images added';
  
END $$;