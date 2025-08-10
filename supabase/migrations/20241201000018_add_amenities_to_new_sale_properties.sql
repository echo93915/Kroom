-- Add amenities to the newly migrated sale properties
-- Stanford Townhouse, Berkeley Studio Loft, Seattle 2BR Apartment

DO $$
DECLARE
  stanford_property_id UUID := '3716271d-d783-4763-9d1b-aad942acfb9a';  -- Stanford Townhouse
  berkeley_property_id UUID := 'd792d84c-3efe-4d62-b079-279d0f3197e8';   -- Berkeley Studio Loft
  seattle_property_id UUID := 'd1bf8923-698f-484b-8ddc-19e82c0744e0';    -- Seattle 2BR Apartment
BEGIN
  RAISE NOTICE 'Adding amenities to newly migrated sale properties...';
  
  -- Amenities for Stanford 2BR Townhouse
  RAISE NOTICE 'Adding amenities for Stanford 2BR Townhouse...';
  
  -- Basic amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (stanford_property_id, 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi Included
  (stanford_property_id, 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Full Kitchen
  (stanford_property_id, 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  (stanford_property_id, 'ca840a2e-71c5-4186-ba56-01050dd40ff4'), -- TV/Cable
  (stanford_property_id, '37337ca8-1e79-4f56-9062-59ec8545e2f8'); -- Parking Available
  
  -- Premium amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (stanford_property_id, 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- Air Conditioning
  (stanford_property_id, 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'), -- 24/7 Security
  (stanford_property_id, '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'); -- Fully Furnished
  
  -- Student-specific amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (stanford_property_id, '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  (stanford_property_id, 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Public Transit Access
  (stanford_property_id, '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'), -- International Student Friendly
  (stanford_property_id, '75ea63ad-bb9d-4ac2-badd-86702ba0fe3e'); -- Quiet Study Area
  
  -- Amenities for Berkeley Studio Loft Investment
  RAISE NOTICE 'Adding amenities for Berkeley Studio Loft Investment...';
  
  -- Basic amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (berkeley_property_id, 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi Included
  (berkeley_property_id, 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Full Kitchen
  (berkeley_property_id, 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  (berkeley_property_id, 'ca840a2e-71c5-4186-ba56-01050dd40ff4'); -- TV/Cable
  
  -- Premium amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (berkeley_property_id, 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- Air Conditioning
  (berkeley_property_id, '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'); -- Fully Furnished
  
  -- Student-specific amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (berkeley_property_id, '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  (berkeley_property_id, 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Public Transit Access
  (berkeley_property_id, '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'); -- International Student Friendly
  
  -- Amenities for Seattle Modern 2BR Apartment
  RAISE NOTICE 'Adding amenities for Seattle Modern 2BR Apartment...';
  
  -- Basic amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (seattle_property_id, 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi Included
  (seattle_property_id, 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Full Kitchen
  (seattle_property_id, 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  (seattle_property_id, 'ca840a2e-71c5-4186-ba56-01050dd40ff4'), -- TV/Cable
  (seattle_property_id, '37337ca8-1e79-4f56-9062-59ec8545e2f8'); -- Parking Available
  
  -- Premium amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (seattle_property_id, 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- Air Conditioning
  (seattle_property_id, 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'), -- 24/7 Security
  (seattle_property_id, '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'); -- Fully Furnished
  
  -- Student-specific amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (seattle_property_id, '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  (seattle_property_id, 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Public Transit Access
  (seattle_property_id, '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'), -- International Student Friendly
  (seattle_property_id, '75ea63ad-bb9d-4ac2-badd-86702ba0fe3e'); -- Quiet Study Area
  
  RAISE NOTICE 'Successfully added amenities to all newly migrated sale properties!';
  RAISE NOTICE 'Stanford Townhouse: 12 amenities (5 basic + 3 premium + 4 student)';
  RAISE NOTICE 'Berkeley Studio Loft: 9 amenities (4 basic + 2 premium + 3 student)';
  RAISE NOTICE 'Seattle 2BR Apartment: 12 amenities (5 basic + 3 premium + 4 student)';
  
END $$;