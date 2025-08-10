-- Manually insert UCLA amenities using direct amenity IDs
-- This bypasses any potential issues with the get_amenity_id function

DO $$
DECLARE
  ucla_property_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';
  wifi_id UUID;
  parking_id UUID;
  kitchen_id UUID;
  tv_id UUID;
  ac_id UUID;
  laundry_id UUID;
  security_id UUID;
  furnished_id UUID;
BEGIN
  RAISE NOTICE 'Manually adding amenities to UCLA property using direct lookups...';
  
  -- Get amenity IDs directly
  SELECT id INTO wifi_id FROM amenities WHERE name = 'WiFi Included';
  SELECT id INTO parking_id FROM amenities WHERE name = 'Parking Available';
  SELECT id INTO kitchen_id FROM amenities WHERE name = 'Full Kitchen';
  SELECT id INTO tv_id FROM amenities WHERE name = 'TV/Cable';
  SELECT id INTO ac_id FROM amenities WHERE name = 'Air Conditioning';
  SELECT id INTO laundry_id FROM amenities WHERE name = 'Laundry';
  SELECT id INTO security_id FROM amenities WHERE name = '24/7 Security';
  SELECT id INTO furnished_id FROM amenities WHERE name = 'Fully Furnished';
  
  -- Log the IDs we found
  RAISE NOTICE 'Found amenity IDs:';
  RAISE NOTICE '  WiFi: %', wifi_id;
  RAISE NOTICE '  Parking: %', parking_id;
  RAISE NOTICE '  Kitchen: %', kitchen_id;
  RAISE NOTICE '  TV: %', tv_id;
  
  -- Insert them one by one with error handling
  IF wifi_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, wifi_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added WiFi';
  END IF;
  
  IF parking_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, parking_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added Parking';
  END IF;
  
  IF kitchen_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, kitchen_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added Kitchen';
  END IF;
  
  IF tv_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, tv_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added TV';
  END IF;
  
  IF ac_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, ac_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added AC';
  END IF;
  
  IF laundry_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, laundry_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added Laundry';
  END IF;
  
  IF security_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, security_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added Security';
  END IF;
  
  IF furnished_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, furnished_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added Furnished';
  END IF;
  
  RAISE NOTICE 'UCLA property amenities insertion completed!';
  
END $$;