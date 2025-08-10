-- Fix missing amenities for UCLA property
-- The previous migration failed to insert amenities due to potential timing issues

DO $$
DECLARE
  ucla_property_id UUID := '0b74a2f5-40b8-472c-876a-76a77212ac00';
BEGIN
  RAISE NOTICE 'Adding missing amenities to UCLA property...';
  
  -- Insert property amenities (this time with explicit property ID)
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
    (ucla_property_id, get_amenity_id('WiFi Included')),
    (ucla_property_id, get_amenity_id('Parking Available')),
    (ucla_property_id, get_amenity_id('Full Kitchen')),
    (ucla_property_id, get_amenity_id('TV/Cable')),
    (ucla_property_id, get_amenity_id('Air Conditioning')),
    (ucla_property_id, get_amenity_id('Laundry')),
    (ucla_property_id, get_amenity_id('24/7 Security')),
    (ucla_property_id, get_amenity_id('Fully Furnished'))
  ON CONFLICT (property_id, amenity_id) DO NOTHING; -- Avoid duplicates
  
  RAISE NOTICE 'UCLA property amenities added successfully!';
  
END $$;