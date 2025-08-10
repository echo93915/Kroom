-- Add amenities to properties that are missing them
-- Adding amenities for "Modern Studio Near UCLA" and "Shared 2BR Apartment"

DO $$
DECLARE
  ucla_studio_id UUID := '902c82d5-a2bc-4709-b558-79f978a7c97d';  -- Modern Studio Near UCLA
  shared_2br_id UUID := 'e575ffd1-f8c0-4005-840c-47c54b529b88';   -- Shared 2BR Apartment
BEGIN
  RAISE NOTICE 'Adding amenities to properties missing them...';
  
  -- Amenities for Modern Studio Near UCLA
  RAISE NOTICE 'Adding amenities for Modern Studio Near UCLA...';
  
  -- Basic amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (ucla_studio_id, 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi Included
  (ucla_studio_id, 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Full Kitchen
  (ucla_studio_id, 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  (ucla_studio_id, 'ca840a2e-71c5-4186-ba56-01050dd40ff4'), -- TV/Cable
  (ucla_studio_id, '37337ca8-1e79-4f56-9062-59ec8545e2f8'); -- Parking Available
  
  -- Premium amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (ucla_studio_id, 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- Air Conditioning
  (ucla_studio_id, '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'); -- Fully Furnished
  
  -- Student-specific amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (ucla_studio_id, '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  (ucla_studio_id, 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Public Transit Access
  (ucla_studio_id, '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'); -- International Student Friendly
  
  -- Amenities for Shared 2BR Apartment
  RAISE NOTICE 'Adding amenities for Shared 2BR Apartment...';
  
  -- Basic amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (shared_2br_id, 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi Included
  (shared_2br_id, 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Full Kitchen
  (shared_2br_id, 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  (shared_2br_id, 'ca840a2e-71c5-4186-ba56-01050dd40ff4'), -- TV/Cable
  (shared_2br_id, '37337ca8-1e79-4f56-9062-59ec8545e2f8'); -- Parking Available
  
  -- Premium amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (shared_2br_id, 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- Air Conditioning
  (shared_2br_id, 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'), -- 24/7 Security
  (shared_2br_id, '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'); -- Fully Furnished
  
  -- Student-specific amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (shared_2br_id, '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  (shared_2br_id, 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Public Transit Access
  (shared_2br_id, '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'), -- International Student Friendly
  (shared_2br_id, '75ea63ad-bb9d-4ac2-badd-86702ba0fe3e'); -- Quiet Study Area
  
  RAISE NOTICE 'Successfully added amenities to both properties!';
  RAISE NOTICE 'Modern Studio Near UCLA: 10 amenities added (5 basic + 2 premium + 3 student)';
  RAISE NOTICE 'Shared 2BR Apartment: 12 amenities added (5 basic + 3 premium + 4 student)';
  
END $$;