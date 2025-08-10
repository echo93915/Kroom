-- Add amenities to the new Seattle rental property

DO $$
DECLARE
  seattle_rental_id UUID := '7816617c-7da9-4c72-8bc2-c227638ce3ab';  -- Seattle 1BR Near UW
BEGIN
  RAISE NOTICE 'Adding amenities to Seattle 1BR rental property...';
  
  -- Basic amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (seattle_rental_id, 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi Included
  (seattle_rental_id, 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Full Kitchen
  (seattle_rental_id, 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  (seattle_rental_id, 'ca840a2e-71c5-4186-ba56-01050dd40ff4'), -- TV/Cable
  (seattle_rental_id, '37337ca8-1e79-4f56-9062-59ec8545e2f8'); -- Parking Available
  
  -- Premium amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (seattle_rental_id, 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- Air Conditioning
  (seattle_rental_id, '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'); -- Fully Furnished
  
  -- Student-specific amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
  (seattle_rental_id, '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  (seattle_rental_id, 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Public Transit Access
  (seattle_rental_id, '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'), -- International Student Friendly
  (seattle_rental_id, '75ea63ad-bb9d-4ac2-badd-86702ba0fe3e'); -- Quiet Study Area
  
  RAISE NOTICE 'Successfully added amenities to Seattle rental property!';
  RAISE NOTICE 'Seattle 1BR now has: 11 amenities (5 basic + 2 premium + 4 student)';
  
END $$;