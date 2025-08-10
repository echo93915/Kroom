-- Insert standard amenities
INSERT INTO amenities (name, icon, category) VALUES
  ('WiFi Included', 'wifi', 'basic'),
  ('Parking Available', 'parking', 'basic'),
  ('Full Kitchen', 'kitchen', 'basic'),
  ('TV/Cable', 'tv', 'basic'),
  ('Air Conditioning', 'aircon', 'premium'),
  ('Laundry', 'washing', 'basic'),
  ('24/7 Security', 'security', 'premium'),
  ('Fully Furnished', 'furnished', 'premium'),
  ('Near University', 'nearUniversity', 'student-specific'),
  ('Public Transit Access', 'publicTransport', 'student-specific'),
  ('Quiet Study Area', 'studyRoom', 'student-specific'),
  ('International Student Friendly', 'internationalFriendly', 'student-specific'),
  ('Korean Speaking Support', 'koreanSupport', 'student-specific');

-- Insert major universities
INSERT INTO universities (name, short_name, city, state, latitude, longitude) VALUES
  ('University of California, Los Angeles', 'UCLA', 'Los Angeles', 'CA', 34.0689, -118.4452),
  ('University of Southern California', 'USC', 'Los Angeles', 'CA', 34.0224, -118.2851),
  ('Harvard University', 'Harvard', 'Cambridge', 'MA', 42.3770, -71.1167),
  ('Massachusetts Institute of Technology', 'MIT', 'Cambridge', 'MA', 42.3601, -71.0942),
  ('Stanford University', 'Stanford', 'Stanford', 'CA', 37.4275, -122.1697),
  ('University of California, Berkeley', 'UC Berkeley', 'Berkeley', 'CA', 37.8719, -122.2585),
  ('University of Washington', 'UW', 'Seattle', 'WA', 47.6553, -122.3035),
  ('University of Michigan', 'U of M', 'Ann Arbor', 'MI', 42.2780, -83.7382),
  ('New York University', 'NYU', 'New York', 'NY', 40.7295, -73.9965),
  ('Boston University', 'BU', 'Boston', 'MA', 42.3505, -71.1054);

-- Function to get amenity ID by name
CREATE OR REPLACE FUNCTION get_amenity_id(amenity_name TEXT)
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM amenities WHERE name = amenity_name LIMIT 1);
END;
$$ LANGUAGE plpgsql;

-- Function to get university ID by short name
CREATE OR REPLACE FUNCTION get_university_id(uni_short_name TEXT)
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM universities WHERE short_name = uni_short_name LIMIT 1);
END;
$$ LANGUAGE plpgsql;

-- Insert sample properties (using null for created_by since auth users are managed by Supabase Auth)
DO $$
DECLARE
  -- Property IDs to reference later
  prop_ucla_studio UUID;
  prop_harvard_2br UUID;
  prop_usc_studio UUID;
  prop_umich_housing UUID;
  prop_nyu_condo UUID;
  prop_stanford_townhouse UUID;
  prop_berkeley_loft UUID;
  prop_seattle_apt UUID;
  
BEGIN

  -- Insert featured rental properties
  INSERT INTO properties (
    id, title, description, listing_type, property_type,
    address, city, state, postal_code,
    beds, baths, area_sqft,
    monthly_rent_cents, deposit_cents, utilities_cents, parking_cents,
    available_from, minimum_stay_months, maximum_occupants,
    status, featured, tag_label, is_demo,
    created_by
  ) VALUES 
  (
    gen_random_uuid(), 'Modern Studio Near UCLA', 
    'Stunning modern studio apartment in the heart of Westwood, just steps from UCLA campus. This bright and airy unit features floor-to-ceiling windows, hardwood floors, and a modern kitchen with stainless steel appliances.',
    'rental', 'studio',
    '456 Westwood Blvd', 'Los Angeles', 'CA', '90024',
    1, 1, 450,
    185000, 185000, 12000, 8000, -- $1850 rent, $1850 deposit, $120 utilities, $80 parking
    '2025-01-01', 12, 1,
    'active', true, 'NEW', true,
    NULL
  ),
  (
    gen_random_uuid(), 'Shared 2BR Apartment',
    'Charming 2-bedroom apartment in historic Cambridge, perfect for sharing between international students. Located in a beautiful Victorian building with original details and modern amenities.',
    'rental', '2br',
    '89 Brattle Street', 'Cambridge', 'MA', '02138',
    2, 1, 750,
    240000, 240000, 18000, 15000, -- $2400 rent, $2400 deposit, $180 utilities, $150 parking
    '2025-02-01', 12, 2,
    'active', true, 'RECOMMENDED', true,
    NULL
  );

  -- Insert featured sale properties
  INSERT INTO properties (
    id, title, description, listing_type, property_type,
    address, city, state, postal_code,
    beds, baths, area_sqft,
    sale_price_cents, utilities_cents, hoa_cents, property_tax_cents,
    available_from, maximum_occupants,
    status, featured, tag_label, is_demo,
    created_by
  ) VALUES 
  (
    gen_random_uuid(), 'Modern Condo Near NYU',
    'Rare opportunity to own a modern 1-bedroom condo in the heart of Greenwich Village, just blocks from NYU campus. Recently renovated with modern finishes.',
    'sale', '1br',
    '123 MacDougal Street', 'New York', 'NY', '10012',
    1, 1, 650,
    42500000, 20000, 45000, 65000, -- $425k sale, $200 utilities, $450 HOA, $650 tax
    '2024-12-01', 2,
    'active', true, 'SALE', true,
    NULL
  );

END $$; 