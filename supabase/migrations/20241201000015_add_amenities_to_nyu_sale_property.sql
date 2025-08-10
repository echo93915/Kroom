-- Add amenities to the Modern Condo Near NYU sale property
-- This property was from the initial seed data but missing amenities

DO $$
DECLARE
  nyu_property_id UUID := 'ccdf19ae-7672-4dd7-9a09-b8be5eb567a3';  -- Modern Condo Near NYU
BEGIN
  RAISE NOTICE 'Adding amenities to Modern Condo Near NYU sale property...';
  
  -- Basic amenities for NYU Condo
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (nyu_property_id, 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi Included
  (nyu_property_id, 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Full Kitchen
  (nyu_property_id, 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  (nyu_property_id, 'ca840a2e-71c5-4186-ba56-01050dd40ff4'), -- TV/Cable
  (nyu_property_id, '37337ca8-1e79-4f56-9062-59ec8545e2f8'); -- Parking Available
  
  -- Premium amenities for upscale condo
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (nyu_property_id, 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- Air Conditioning
  (nyu_property_id, 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'), -- 24/7 Security
  (nyu_property_id, '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'); -- Fully Furnished
  
  -- Student-specific amenities (NYU location)
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (nyu_property_id, '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  (nyu_property_id, 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Public Transit Access
  (nyu_property_id, '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'), -- International Student Friendly
  (nyu_property_id, '75ea63ad-bb9d-4ac2-badd-86702ba0fe3e'); -- Quiet Study Area
  
  RAISE NOTICE 'Successfully added amenities to Modern Condo Near NYU!';
  RAISE NOTICE 'NYU Property now has: 12 amenities (5 basic + 3 premium + 4 student)';
  
END $$;