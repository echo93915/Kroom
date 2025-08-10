-- Add a fourth rental property for variety in Featured Rentals
-- Adding a property near University of Washington in Seattle

DO $$
DECLARE
  seattle_rental_id UUID := gen_random_uuid();
  uw_university_id UUID;
BEGIN
  RAISE NOTICE 'Adding fourth rental property near University of Washington...';
  
  -- Get University of Washington ID
  SELECT id INTO uw_university_id FROM universities WHERE short_name = 'UW' LIMIT 1;
  
  -- Add the main rental property
  INSERT INTO properties (
    id, title, description, listing_type, property_type,
    beds, baths, area_sqft, monthly_rent_cents, deposit_cents, utilities_cents,
    address, city, state, postal_code,
    available_from, status, is_demo, created_by, featured
  ) VALUES (
    seattle_rental_id,
    'Cozy 1BR Near University District',
    'Charming 1-bedroom apartment in Seattle''s vibrant University District. Walking distance to University of Washington campus, with easy access to restaurants, cafes, and public transportation. Perfect for graduate students or young professionals.',
    'rental',
    '1br',
    1, 1, 650, 195000, 195000, 15000, -- $1,950/month rent, $1,950 deposit, $150 utilities
    '4321 15th Ave NE',
    'Seattle',
    'WA',
    '98105',
    '2025-02-01',
    'active',
    true,
    NULL,
    true
  );
  
  -- Add university relationship
  IF uw_university_id IS NOT NULL THEN
    INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
    VALUES (seattle_rental_id, uw_university_id, 0.6, 10, 5, ARRAY['walking', 'biking', 'public_transit']);
  END IF;
  
  -- Add contact information
  INSERT INTO property_contacts (property_id, name, phone, email, languages, preferred_contact_method, is_primary)
  VALUES (seattle_rental_id, 'Mike Johnson', '(206) 555-0167', 'mike.johnson@example.com', ARRAY['English'], 'phone', true);
  
  RAISE NOTICE 'Successfully added Seattle rental property!';
  RAISE NOTICE 'Seattle 1BR ID: %', seattle_rental_id;
  
END $$;