-- Migrate the remaining 3 hardcoded sale properties to database
-- These are: Stanford Townhouse, Berkeley Studio Loft, Seattle 2BR Apartment

DO $$
DECLARE
  stanford_property_id UUID := gen_random_uuid();
  berkeley_property_id UUID := gen_random_uuid();
  seattle_property_id UUID := gen_random_uuid();
  
  stanford_university_id UUID;
  berkeley_university_id UUID;
  uw_university_id UUID;
BEGIN
  RAISE NOTICE 'Migrating remaining 3 sale properties to database...';
  
  -- Get university IDs for relationships
  SELECT id INTO stanford_university_id FROM universities WHERE short_name = 'Stanford' LIMIT 1;
  SELECT id INTO berkeley_university_id FROM universities WHERE short_name = 'UC Berkeley' LIMIT 1;
  SELECT id INTO uw_university_id FROM universities WHERE short_name = 'UW' LIMIT 1;
  
  -- 1. Stanford Townhouse ($675,000)
  RAISE NOTICE 'Adding Stanford 2BR Townhouse...';
  INSERT INTO properties (
    id, title, description, listing_type, property_type,
    beds, baths, area_sqft, sale_price_cents,
    address, city, state, postal_code,
    available_from, status, is_demo, created_by
  ) VALUES (
    stanford_property_id,
    '2BR Townhouse',
    'Beautiful 2-bedroom townhouse in prestigious Palo Alto, walking distance to Stanford University. Features modern amenities, private patio, and excellent investment potential in Silicon Valley.',
    'sale',
    '2br',
    2, 2, 1100, 67500000, -- $675,000 in cents
    '123 University Ave',
    'Palo Alto',
    'CA',
    '94301',
    '2024-11-01',
    'active',
    true,
    NULL
  );
  
  -- 2. Berkeley Studio Loft ($380,000)
  RAISE NOTICE 'Adding Berkeley Studio Loft Investment...';
  INSERT INTO properties (
    id, title, description, listing_type, property_type,
    beds, baths, area_sqft, sale_price_cents,
    address, city, state, postal_code,
    available_from, status, is_demo, created_by
  ) VALUES (
    berkeley_property_id,
    'Studio Loft Investment',
    'Modern studio loft in vibrant Berkeley, perfect for investors or students. High ceilings, exposed brick, and contemporary finishes. Great rental income potential near UC Berkeley campus.',
    'sale',
    'studio',
    1, 1, 480, 38000000, -- $380,000 in cents
    '456 Telegraph Ave',
    'Berkeley',
    'CA',
    '94704',
    '2024-10-01',
    'active',
    true,
    NULL
  );
  
  -- 3. Seattle 2BR Apartment ($525,000)
  RAISE NOTICE 'Adding Seattle Modern 2BR Apartment...';
  INSERT INTO properties (
    id, title, description, listing_type, property_type,
    beds, baths, area_sqft, sale_price_cents,
    address, city, state, postal_code,
    available_from, status, is_demo, created_by
  ) VALUES (
    seattle_property_id,
    'Modern 2BR Apartment',
    'Stunning modern 2-bedroom apartment in Seattle with panoramic city and water views. Premium finishes, in-unit laundry, and close proximity to University of Washington. Perfect for urban living.',
    'sale',
    '2br',
    2, 1, 850, 52500000, -- $525,000 in cents
    '789 NE 45th St',
    'Seattle',
    'WA',
    '98105',
    '2024-09-01',
    'active',
    true,
    NULL
  );
  
  -- Add university relationships if universities exist
  IF stanford_university_id IS NOT NULL THEN
    INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
    VALUES (stanford_property_id, stanford_university_id, 0.8, 12, 5, ARRAY['walking', 'biking', 'public_transit']);
  END IF;
  
  IF berkeley_university_id IS NOT NULL THEN
    INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
    VALUES (berkeley_property_id, berkeley_university_id, 1.2, 18, 8, ARRAY['walking', 'biking', 'public_transit']);
  END IF;
  
  IF uw_university_id IS NOT NULL THEN
    INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
    VALUES (seattle_property_id, uw_university_id, 1.5, 22, 12, ARRAY['walking', 'biking', 'public_transit']);
  END IF;
  
  RAISE NOTICE 'Successfully migrated 3 sale properties to database!';
  RAISE NOTICE 'Stanford Townhouse ID: %', stanford_property_id;
  RAISE NOTICE 'Berkeley Studio Loft ID: %', berkeley_property_id;
  RAISE NOTICE 'Seattle 2BR Apartment ID: %', seattle_property_id;
  
END $$;