-- Add demo UCLA property to database
-- This migrates the hardcoded 'rental-ucla-studio-001' property to the database

-- Migration for UCLA Modern Studio property
-- This will demonstrate the full data flow from database instead of hardcoded data

DO $$
DECLARE
  ucla_property_id UUID := gen_random_uuid();
  ucla_university_id UUID;
BEGIN
  -- Get UCLA university ID
  SELECT id INTO ucla_university_id FROM universities WHERE short_name = 'UCLA' LIMIT 1;

  -- Insert main property record
  INSERT INTO properties (
    id, title, description, listing_type, property_type,
    address, city, state, postal_code,
    beds, baths, area_sqft,
    monthly_rent_cents, deposit_cents, utilities_cents, parking_cents,
    available_from, minimum_stay_months, maximum_occupants,
    status, featured, tag_label, is_demo,
    created_by
  ) VALUES (
    ucla_property_id,
    'Modern Studio Apartment',
    'Beautiful modern studio apartment perfect for international students. Located just 2 blocks from USC campus with easy access to public transportation. The unit features high-end finishes, in-unit laundry, and a fully equipped kitchen. Building amenities include 24/7 security, fitness center, and study lounges.',
    'rental',
    'studio',
    '123 University Ave, Los Angeles, CA 90007',
    'Los Angeles',
    'CA',
    '90007',
    1, 1, 550,
    250000, 250000, 15000, 10000, -- $2500 rent, $2500 deposit, $150 utilities, $100 parking
    '2024-12-01',
    12,
    1,
    'active',
    true,
    'NEW',
    true,
    NULL
  );

  -- Insert property images
  INSERT INTO property_images (
    property_id, image_url, alt_text, display_order, is_primary
  ) VALUES (
    ucla_property_id,
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Modern studio apartment interior with contemporary furnishings',
    0,
    true
  );

  -- Insert property amenities
  INSERT INTO property_amenities (property_id, amenity_id) VALUES
    (ucla_property_id, get_amenity_id('WiFi Included')),
    (ucla_property_id, get_amenity_id('Parking Available')),
    (ucla_property_id, get_amenity_id('Full Kitchen')),
    (ucla_property_id, get_amenity_id('TV/Cable')),
    (ucla_property_id, get_amenity_id('Air Conditioning')),
    (ucla_property_id, get_amenity_id('Laundry')),
    (ucla_property_id, get_amenity_id('24/7 Security')),
    (ucla_property_id, get_amenity_id('Fully Furnished'));

  -- Insert university relationship
  INSERT INTO property_universities (
    property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods
  ) VALUES (
    ucla_property_id,
    ucla_university_id,
    0.4,
    8,
    3,
    ARRAY['walking', 'bus', 'bike']
  );

  -- Insert contact information
  INSERT INTO property_contacts (
    property_id, name, phone, email, languages, preferred_contact_method, is_primary
  ) VALUES (
    ucla_property_id,
    'Sarah Kim',
    '(323) 555-0123',
    'sarah.kim@example.com',
    ARRAY['English', 'Korean'],
    'Text/KakaoTalk',
    true
  );

  RAISE NOTICE 'Demo UCLA property migration completed. Property ID: %', ucla_property_id;
  RAISE NOTICE 'UCLA university ID: %', ucla_university_id;

END $$;