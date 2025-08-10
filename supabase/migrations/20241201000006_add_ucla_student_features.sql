-- Add student-specific amenities to UCLA property
-- This will populate the Student-Friendly Features section

DO $$
DECLARE
  ucla_property_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';
  near_uni_id UUID;
  transit_id UUID;
  intl_friendly_id UUID;
BEGIN
  RAISE NOTICE 'Adding student features to UCLA property...';
  
  -- Get student-specific amenity IDs
  SELECT id INTO near_uni_id FROM amenities WHERE name = 'Near University';
  SELECT id INTO transit_id FROM amenities WHERE name = 'Public Transit Access';
  SELECT id INTO intl_friendly_id FROM amenities WHERE name = 'International Student Friendly';
  
  -- Log the IDs we found
  RAISE NOTICE 'Found student amenity IDs:';
  RAISE NOTICE '  Near University: %', near_uni_id;
  RAISE NOTICE '  Public Transit: %', transit_id;
  RAISE NOTICE '  International Friendly: %', intl_friendly_id;
  
  -- Insert student amenities
  IF near_uni_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, near_uni_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added Near University';
  END IF;
  
  IF transit_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, transit_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added Public Transit Access';
  END IF;
  
  IF intl_friendly_id IS NOT NULL THEN
    INSERT INTO property_amenities (property_id, amenity_id) 
    VALUES (ucla_property_id, intl_friendly_id)
    ON CONFLICT (property_id, amenity_id) DO NOTHING;
    RAISE NOTICE 'Added International Student Friendly';
  END IF;
  
  RAISE NOTICE 'UCLA student features added successfully!';
  
END $$;