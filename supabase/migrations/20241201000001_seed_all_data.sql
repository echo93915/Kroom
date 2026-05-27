-- Consolidated seed data with all fixed UUIDs

-- Helper functions
CREATE OR REPLACE FUNCTION get_amenity_id(amenity_name TEXT) RETURNS UUID AS $$
BEGIN RETURN (SELECT id FROM amenities WHERE name = amenity_name LIMIT 1); END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_university_id(uni_short_name TEXT) RETURNS UUID AS $$
BEGIN RETURN (SELECT id FROM universities WHERE short_name = uni_short_name LIMIT 1); END;
$$ LANGUAGE plpgsql;

-- Amenities with fixed UUIDs
INSERT INTO amenities (id, name, icon, category) VALUES
  ('f44d847b-43a4-4107-9e81-404982361c76', 'WiFi Included',                  'wifi',                 'basic'),
  ('37337ca8-1e79-4f56-9062-59ec8545e2f8', 'Parking Available',              'parking',              'basic'),
  ('f302b784-e88a-4b62-acd9-a3e0588bbb75', 'Full Kitchen',                   'kitchen',              'basic'),
  ('ca840a2e-71c5-4186-ba56-01050dd40ff4', 'TV/Cable',                       'tv',                   'basic'),
  ('a09d585b-75ea-49e9-812a-beb8ec261ad2', 'Laundry',                        'washing',              'basic'),
  ('a0b89012-ca1e-420b-b69c-07974b6a7f7d', 'Air Conditioning',               'aircon',               'premium'),
  ('d96cbf21-2d2f-4ce7-91fc-a4a9f3555d42', '24/7 Security',                  'security',             'premium'),
  ('5eae4c2f-b2f2-48c9-8790-834cc598ad9e', 'Fully Furnished',                'furnished',            'premium'),
  ('3e723a74-e713-4861-851e-19848e265035', 'Near University',                 'nearUniversity',       'student-specific'),
  ('fdc43c66-60f4-4a0a-a486-c04dd7ff0725', 'Public Transit Access',          'publicTransport',      'student-specific'),
  ('75ea63ad-bb9d-4ac2-badd-86702ba0fe3e', 'Quiet Study Area',               'studyRoom',            'student-specific'),
  ('02f34e9f-8a42-4ae8-a796-bf2da33a90aa', 'International Student Friendly', 'internationalFriendly','student-specific'),
  ('d4e5f6a7-b8c9-4d0e-a1b2-c3d4e5f6a7b8', 'Korean Speaking Support',       'koreanSupport',        'student-specific');

-- Universities
INSERT INTO universities (name, short_name, city, state, latitude, longitude) VALUES
  ('University of California, Los Angeles', 'UCLA',      'Los Angeles', 'CA', 34.0689, -118.4452),
  ('University of Southern California',     'USC',       'Los Angeles', 'CA', 34.0224, -118.2851),
  ('Harvard University',                    'Harvard',   'Cambridge',   'MA', 42.3770,  -71.1167),
  ('Massachusetts Institute of Technology', 'MIT',       'Cambridge',   'MA', 42.3601,  -71.0942),
  ('Stanford University',                   'Stanford',  'Stanford',    'CA', 37.4275, -122.1697),
  ('University of California, Berkeley',    'UC Berkeley','Berkeley',   'CA', 37.8719, -122.2585),
  ('University of Washington',              'UW',        'Seattle',     'WA', 47.6553, -122.3035),
  ('University of Michigan',                'U of M',    'Ann Arbor',   'MI', 42.2780,  -83.7382),
  ('New York University',                   'NYU',       'New York',    'NY', 40.7295,  -73.9965),
  ('Boston University',                     'BU',        'Boston',      'MA', 42.3505,  -71.1054);

-- ============================================================
-- PROPERTIES
-- ============================================================

-- 1. Modern Studio Near UCLA (featured rental)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, monthly_rent_cents, deposit_cents, utilities_cents, parking_cents, available_from, minimum_stay_months, maximum_occupants, status, featured, tag_label, is_demo, created_by)
VALUES ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'Modern Studio Near UCLA',
  'Stunning modern studio apartment in the heart of Westwood, just steps from UCLA campus. This bright and airy unit features floor-to-ceiling windows, hardwood floors, and a modern kitchen with stainless steel appliances. Perfect for international students.',
  'rental', 'studio', '456 Westwood Blvd', 'Los Angeles', 'CA', '90024',
  1, 1, 450, 185000, 185000, 12000, 8000, '2025-01-01', 12, 1, 'active', true, 'NEW', true, NULL);

-- 2. Shared 2BR Apartment — Harvard (featured rental)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, monthly_rent_cents, deposit_cents, utilities_cents, parking_cents, available_from, minimum_stay_months, maximum_occupants, status, featured, tag_label, is_demo, created_by)
VALUES ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'Shared 2BR Apartment',
  'Charming 2-bedroom apartment in historic Cambridge, perfect for sharing between international students. Located in a beautiful Victorian building with original details and modern amenities. Walking distance to Harvard Square.',
  'rental', '2br', '89 Brattle Street', 'Cambridge', 'MA', '02138',
  2, 1, 750, 240000, 240000, 18000, 15000, '2025-02-01', 12, 2, 'active', true, 'RECOMMENDED', true, NULL);

-- 3. Modern Studio Apartment — UCLA demo (rental)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, monthly_rent_cents, deposit_cents, utilities_cents, parking_cents, available_from, minimum_stay_months, maximum_occupants, status, featured, tag_label, is_demo, created_by)
VALUES ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'Modern Studio Apartment',
  'Beautiful modern studio apartment perfect for international students. Located just 2 blocks from campus with easy access to public transportation. The unit features high-end finishes, in-unit laundry, and a fully equipped kitchen. Building amenities include 24/7 security, fitness center, and study lounges.',
  'rental', 'studio', '123 University Ave', 'Los Angeles', 'CA', '90007',
  1, 1, 550, 250000, 250000, 15000, 10000, '2024-12-01', 12, 1, 'active', true, 'NEW', true, NULL);

-- 4. Cozy 1BR Near University District — Seattle (featured rental)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, monthly_rent_cents, deposit_cents, utilities_cents, available_from, minimum_stay_months, maximum_occupants, status, featured, is_demo, created_by)
VALUES ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'Cozy 1BR Near University District',
  'Charming 1-bedroom apartment in Seattle''s vibrant University District. Walking distance to University of Washington campus, with easy access to restaurants, cafes, and public transportation. Perfect for graduate students or young professionals.',
  'rental', '1br', '4321 15th Ave NE', 'Seattle', 'WA', '98105',
  1, 1, 650, 195000, 195000, 15000, '2025-02-01', 12, 1, 'active', true, true, NULL);

-- 5. Modern Condo Near NYU (featured sale)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, sale_price_cents, utilities_cents, hoa_cents, property_tax_cents, available_from, maximum_occupants, status, featured, tag_label, is_demo, created_by)
VALUES ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'Modern Condo Near NYU',
  'Rare opportunity to own a modern 1-bedroom condo in the heart of Greenwich Village, just blocks from NYU campus. Recently renovated with modern finishes, open-concept layout, granite countertops, and a spa-like bathroom.',
  'sale', '1br', '123 MacDougal Street', 'New York', 'NY', '10012',
  1, 1, 650, 42500000, 20000, 45000, 65000, '2024-12-01', 2, 'active', true, 'SALE', true, NULL);

-- 6. 2BR Townhouse — Stanford (featured sale)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, sale_price_cents, utilities_cents, hoa_cents, property_tax_cents, available_from, maximum_occupants, status, featured, tag_label, is_demo, created_by)
VALUES ('3716271d-d783-4763-9d1b-aad942acfb9a', '2BR Townhouse',
  'Beautiful 2-bedroom townhouse in prestigious Palo Alto, walking distance to Stanford University. Features modern amenities, private patio, hardwood floors, and excellent investment potential in Silicon Valley.',
  'sale', '2br', '123 University Ave', 'Palo Alto', 'CA', '94301',
  2, 2, 1100, 67500000, 25000, 32000, 85000, '2024-11-01', 4, 'active', true, 'SALE', true, NULL);

-- 7. Studio Loft Investment — Berkeley (featured sale)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, sale_price_cents, utilities_cents, hoa_cents, property_tax_cents, available_from, maximum_occupants, status, featured, tag_label, is_demo, created_by)
VALUES ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'Studio Loft Investment',
  'Modern studio loft in vibrant Berkeley, perfect for investors or students. High ceilings, exposed brick, and contemporary finishes. Great rental income potential near UC Berkeley campus.',
  'sale', 'studio', '456 Telegraph Ave', 'Berkeley', 'CA', '94704',
  1, 1, 480, 38000000, 15000, 28000, 42000, '2024-10-01', 2, 'active', true, 'SALE', true, NULL);

-- 8. Modern 2BR Apartment — Seattle (featured sale)
INSERT INTO properties (id, title, description, listing_type, property_type, address, city, state, postal_code, beds, baths, area_sqft, sale_price_cents, utilities_cents, hoa_cents, property_tax_cents, available_from, maximum_occupants, status, featured, tag_label, is_demo, created_by)
VALUES ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'Modern 2BR Apartment',
  'Stunning modern 2-bedroom apartment in Seattle with panoramic city and water views. Premium finishes, in-unit laundry, and close proximity to University of Washington. Perfect for urban living.',
  'sale', '2br', '789 NE 45th St', 'Seattle', 'WA', '98105',
  2, 1, 850, 52500000, 18000, 38000, 52000, '2024-09-01', 3, 'active', true, 'SALE', true, NULL);

-- ============================================================
-- IMAGES
-- ============================================================

-- Modern Studio Near UCLA (902c82d5)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop', 'Modern studio apartment near UCLA', 0, true),
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2940&auto=format&fit=crop', 'Bright living area with large windows', 1, false),
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2958&auto=format&fit=crop', 'Modern kitchen with stainless steel appliances', 2, false),
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop', 'Comfortable sleeping area', 3, false);

-- Shared 2BR Apartment — Harvard (e575ffd1)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop', 'Spacious 2-bedroom apartment', 0, true),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop', 'Bright living room', 1, false),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop', 'Well-equipped kitchen', 2, false),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2940&auto=format&fit=crop', 'Master bedroom', 3, false),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop', 'Second bedroom', 4, false);

-- Modern Studio Apartment — UCLA demo (0b74a2f5)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop', 'Modern studio apartment interior', 0, true),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2940&auto=format&fit=crop', 'Modern kitchen with stainless steel appliances', 1, false),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2940&auto=format&fit=crop', 'Clean modern bathroom', 2, false),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2940&auto=format&fit=crop', 'Comfortable living area with large windows', 3, false),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2940&auto=format&fit=crop', 'Cozy sleeping area', 4, false);

-- Cozy 1BR Seattle rental (7816617c)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2940&auto=format&fit=crop', 'Cozy 1-bedroom in Seattle University District', 0, true),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop', 'Bright living area', 1, false),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2940&auto=format&fit=crop', 'Modern kitchen with updated appliances', 2, false),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop', 'Peaceful bedroom', 3, false),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2940&auto=format&fit=crop', 'University District neighborhood', 4, false);

-- Modern Condo Near NYU (ccdf19ae)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop', 'Modern condo near NYU', 0, true),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2940&auto=format&fit=crop', 'Spacious living area', 1, false),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop', 'Contemporary kitchen', 2, false),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop', 'Comfortable bedroom', 3, false),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop', 'Modern bathroom', 4, false);

-- Stanford 2BR Townhouse (3716271d)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop', 'Beautiful 2-bedroom townhouse near Stanford', 0, true),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop', 'Spacious living area', 1, false),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop', 'Contemporary kitchen with granite counters', 2, false),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=2940&auto=format&fit=crop', 'Master bedroom', 3, false),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'https://images.unsplash.com/photo-1545324418-cc1a3fa833e5?q=80&w=2940&auto=format&fit=crop', 'Private patio', 4, false);

-- Berkeley Studio Loft (d792d84c)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop', 'Modern studio loft in Berkeley', 0, true),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2940&auto=format&fit=crop', 'Open concept living space', 1, false),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2940&auto=format&fit=crop', 'Compact kitchen with modern appliances', 2, false),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop', 'Contemporary bathroom', 3, false);

-- Seattle Modern 2BR Apartment — sale (d1bf8923)
INSERT INTO property_images (property_id, image_url, alt_text, display_order, is_primary) VALUES
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2940&auto=format&fit=crop', 'Modern 2-bedroom apartment in Seattle', 0, true),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop', 'Bright living room with floor-to-ceiling windows', 1, false),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2940&auto=format&fit=crop', 'Gourmet kitchen', 2, false),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2940&auto=format&fit=crop', 'Master bedroom with city views', 3, false),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2940&auto=format&fit=crop', 'Modern bathroom', 4, false);

-- ============================================================
-- AMENITIES PER PROPERTY
-- ============================================================

-- Modern Studio Near UCLA (902c82d5)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'f44d847b-43a4-4107-9e81-404982361c76'), -- WiFi
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', '37337ca8-1e79-4f56-9062-59ec8545e2f8'), -- Parking
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'), -- Kitchen
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'), -- TV/Cable
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'), -- Laundry
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'), -- AC
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'), -- Furnished
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', '3e723a74-e713-4861-851e-19848e265035'), -- Near University
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'), -- Transit
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'); -- Intl Friendly

-- Shared 2BR Apartment — Harvard (e575ffd1)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'f44d847b-43a4-4107-9e81-404982361c76'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', '37337ca8-1e79-4f56-9062-59ec8545e2f8'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'), -- Security
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', '3e723a74-e713-4861-851e-19848e265035'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', '75ea63ad-bb9d-4ac2-badd-86702ba0fe3e'), -- Study Area
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', '02f34e9f-8a42-4ae8-a796-bf2da33a90aa');

-- Modern Studio Apartment — UCLA demo (0b74a2f5)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'f44d847b-43a4-4107-9e81-404982361c76'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', '37337ca8-1e79-4f56-9062-59ec8545e2f8'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', '3e723a74-e713-4861-851e-19848e265035'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', '02f34e9f-8a42-4ae8-a796-bf2da33a90aa');

-- Cozy 1BR Seattle rental (7816617c)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'f44d847b-43a4-4107-9e81-404982361c76'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', '37337ca8-1e79-4f56-9062-59ec8545e2f8'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', '5eae4c2f-b2f2-48c9-8790-834cc598ad9e'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', '3e723a74-e713-4861-851e-19848e265035'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', '02f34e9f-8a42-4ae8-a796-bf2da33a90aa'),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', '75ea63ad-bb9d-4ac2-badd-86702ba0fe3e');

-- Modern Condo Near NYU (ccdf19ae)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'f44d847b-43a4-4107-9e81-404982361c76'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', '3e723a74-e713-4861-851e-19848e265035'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', '02f34e9f-8a42-4ae8-a796-bf2da33a90aa');

-- Stanford 2BR Townhouse (3716271d)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'f44d847b-43a4-4107-9e81-404982361c76'),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', '37337ca8-1e79-4f56-9062-59ec8545e2f8'),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', '3e723a74-e713-4861-851e-19848e265035'),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725');

-- Berkeley Studio Loft (d792d84c)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'f44d847b-43a4-4107-9e81-404982361c76'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', '3e723a74-e713-4861-851e-19848e265035'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', '02f34e9f-8a42-4ae8-a796-bf2da33a90aa');

-- Seattle Modern 2BR — sale (d1bf8923)
INSERT INTO property_amenities (property_id, amenity_id) VALUES
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'f44d847b-43a4-4107-9e81-404982361c76'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'f302b784-e88a-4b62-acd9-a3e0588bbb75'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'ca840a2e-71c5-4186-ba56-01050dd40ff4'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'a09d585b-75ea-49e9-812a-beb8ec261ad2'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'a0b89012-ca1e-420b-b69c-07974b6a7f7d'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'd96cbf21-2d2f-4ce7-91fc-a4a9f3555d42'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', '3e723a74-e713-4861-851e-19848e265035'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'fdc43c66-60f4-4a0a-a486-c04dd7ff0725'),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', '02f34e9f-8a42-4ae8-a796-bf2da33a90aa');

-- ============================================================
-- CONTACTS
-- ============================================================

INSERT INTO property_contacts (property_id, name, phone, email, languages, preferred_contact_method, is_primary) VALUES
  ('902c82d5-a2bc-4709-b558-79f978a7c97d', 'Jennifer Park',    '(310) 555-0124', 'jennifer.park@example.com',   ARRAY['English','Korean'],  'Text/KakaoTalk', true),
  ('e575ffd1-f8c0-4005-840c-47c54b529b88', 'Michael Chen',     '(617) 555-0198', 'michael.chen@example.com',    ARRAY['English','Chinese'], 'Email',          true),
  ('0b74a2f5-40b8-472c-876a-76a77212ac00', 'Sarah Kim',        '(323) 555-0123', 'sarah.kim@example.com',       ARRAY['English','Korean'],  'Text/KakaoTalk', true),
  ('7816617c-7da9-4c72-8bc2-c227638ce3ab', 'Mike Johnson',     '(206) 555-0167', 'mike.johnson@example.com',    ARRAY['English'],           'Phone',          true),
  ('ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', 'Rebecca Wang',     '(212) 555-0189', 'rebecca.wang@example.com',    ARRAY['English','Chinese'], 'Email/Phone',    true),
  ('3716271d-d783-4763-9d1b-aad942acfb9a', 'James Patterson',  '(650) 555-0176', 'james.patterson@example.com', ARRAY['English'],           'Email',          true),
  ('d792d84c-3efe-4d62-b079-279d0f3197e8', 'Lisa Chang',       '(510) 555-0134', 'lisa.chang@example.com',      ARRAY['English','Chinese','Korean'], 'Text/Email', true),
  ('d1bf8923-698f-484b-8ddc-19e82c0744e0', 'Steven Kim',       '(206) 555-0156', 'steven.kim@example.com',      ARRAY['English','Korean'],  'Phone/Text',     true);

-- ============================================================
-- UNIVERSITY RELATIONSHIPS
-- ============================================================

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT '902c82d5-a2bc-4709-b558-79f978a7c97d', id, 0.3, 6,  NULL, ARRAY['walking'] FROM universities WHERE short_name = 'UCLA';

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT 'e575ffd1-f8c0-4005-840c-47c54b529b88', id, 0.5, 8,  NULL, ARRAY['walking'] FROM universities WHERE short_name = 'Harvard';

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT '0b74a2f5-40b8-472c-876a-76a77212ac00', id, 0.4, 8,  3,    ARRAY['walking','bus','bike'] FROM universities WHERE short_name = 'UCLA';

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT '7816617c-7da9-4c72-8bc2-c227638ce3ab', id, 0.6, 10, 5,    ARRAY['walking','biking','public_transit'] FROM universities WHERE short_name = 'UW';

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT 'ccdf19ae-7672-4dd7-9a09-b8be5eb567a3', id, 0.2, 3,  NULL, ARRAY['walking'] FROM universities WHERE short_name = 'NYU';

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT '3716271d-d783-4763-9d1b-aad942acfb9a', id, 0.8, 12, 5,    ARRAY['walking','biking','public_transit'] FROM universities WHERE short_name = 'Stanford';

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT 'd792d84c-3efe-4d62-b079-279d0f3197e8', id, 1.2, 18, 8,    ARRAY['walking','biking','public_transit'] FROM universities WHERE short_name = 'UC Berkeley';

INSERT INTO property_universities (property_id, university_id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods)
SELECT 'd1bf8923-698f-484b-8ddc-19e82c0744e0', id, 1.5, 22, 12,   ARRAY['walking','biking','public_transit'] FROM universities WHERE short_name = 'UW';
