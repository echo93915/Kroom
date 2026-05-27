DO $$
DECLARE
  r1 UUID; r2 UUID; r3 UUID; r4 UUID;
  s1 UUID; s2 UUID; s3 UUID; s4 UUID;
BEGIN

-- ─────────────────────────────────────────
-- ROOMSHARE listings
-- ─────────────────────────────────────────

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, maximum_occupants, status, is_demo, tag_label
) VALUES (
  'Roommate Wanted — Westwood 2BR',
  'Looking for one roommate to share a sunny 2-bedroom apartment in Westwood, steps from UCLA. Furnished room available, shared living room and kitchen. Great for international students. Korean and English spoken.',
  'roomshare', '832 Gayley Ave', 'Los Angeles', 'CA', '90024',
  2, 1, 750, 120000, 120000,
  '2025-02-01', 2, 'active', TRUE, 'NEW'
) RETURNING id INTO r1;

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, maximum_occupants, status, is_demo, tag_label
) VALUES (
  'Roommate Needed — East Village 3BR',
  'Seeking one roommate in a renovated 3-bedroom apartment in the East Village, 10 minutes from NYU by subway. Two current tenants are NYU grad students. Utilities split equally. Pet-friendly building.',
  'roomshare', '214 E 10th St', 'New York', 'NY', '10003',
  3, 1, 900, 160000, 160000,
  '2025-03-01', 3, 'active', TRUE, 'RECOMMENDED'
) RETURNING id INTO r2;

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, maximum_occupants, status, is_demo, tag_label
) VALUES (
  'Shared Room Near Harvard — Cambridge',
  'One room available in a 4-bedroom house in Cambridge, 5-minute walk to Harvard Yard. Quiet, study-friendly environment. Fully furnished common areas. Looking for a graduate student or young professional.',
  'roomshare', '47 Kirkland St', 'Cambridge', 'MA', '02138',
  4, 2, 1200, 140000, 140000,
  '2025-02-15', 4, 'active', TRUE, NULL
) RETURNING id INTO r3;

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, maximum_occupants, status, is_demo, tag_label
) VALUES (
  'Roommate Wanted — Capitol Hill Seattle',
  'One furnished room available in a modern 3BR apartment on Capitol Hill, one bus stop from UW. Shared kitchen and rooftop deck. Current roommates are UW students. Flexible on lease length.',
  'roomshare', '1521 10th Ave', 'Seattle', 'WA', '98122',
  3, 1, 850, 110000, 110000,
  '2025-01-15', 3, 'active', TRUE, NULL
) RETURNING id INTO r4;

-- Images for roomshare listings
INSERT INTO property_images (property_id, image_url, display_order, is_primary) VALUES
  (r1, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop', 0, TRUE),
  (r1, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop', 1, FALSE),
  (r2, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2940&auto=format&fit=crop', 0, TRUE),
  (r2, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop', 1, FALSE),
  (r3, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', 0, TRUE),
  (r3, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop', 1, FALSE),
  (r4, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2940&auto=format&fit=crop', 0, TRUE),
  (r4, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop', 1, FALSE);

-- Contacts for roomshare listings
INSERT INTO property_contacts (property_id, name, phone, email, languages, preferred_contact_method, is_primary) VALUES
  (r1, 'Minho Choi', '(310) 555-0201', 'minho.choi@example.com', ARRAY['Korean','English'], 'KakaoTalk/Text', TRUE),
  (r2, 'Sarah Kim', '(212) 555-0182', 'sarah.kim@example.com', ARRAY['English','Korean'], 'Email', TRUE),
  (r3, 'James Park', '(617) 555-0143', 'james.park@example.com', ARRAY['English'], 'Email/Text', TRUE),
  (r4, 'Yuna Lee', '(206) 555-0167', 'yuna.lee@example.com', ARRAY['English','Korean'], 'Text', TRUE);

-- ─────────────────────────────────────────
-- SUBLET listings
-- ─────────────────────────────────────────

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, available_until, status, is_demo, tag_label
) VALUES (
  'Summer Sublet — Studio Near UCLA',
  'Subletting my studio apartment in Westwood for the summer (June–August). Fully furnished with all utilities included. Perfect for students doing summer internships or research. Available for exactly 3 months.',
  'sublet', '10960 Wellworth Ave', 'Los Angeles', 'CA', '90024',
  1, 1, 420, 185000, 0,
  '2025-06-01', '2025-08-31', 'active', TRUE, 'NEW'
) RETURNING id INTO s1;

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, available_until, status, is_demo, tag_label
) VALUES (
  'Spring Sublet — 1BR in Greenwich Village',
  'Subletting my 1-bedroom apartment near NYU for spring semester. Fully furnished, high-speed WiFi included. Great location — walkable to Washington Square Park. Flexible on exact dates.',
  'sublet', '58 W 10th St', 'New York', 'NY', '10011',
  1, 1, 550, 240000, 0,
  '2025-01-15', '2025-05-31', 'active', TRUE, 'RECOMMENDED'
) RETURNING id INTO s2;

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, available_until, status, is_demo, tag_label
) VALUES (
  'Short-term Sublet — Cambridge 2BR',
  'Subletting a 2-bedroom apartment in Cambridge for 4 months while I study abroad. Furnished, in-unit laundry, near Harvard and MIT. Looking for a reliable subletter — no deposit required.',
  'sublet', '25 Magazine St', 'Cambridge', 'MA', '02139',
  2, 1, 780, 220000, 0,
  '2025-05-01', '2025-08-31', 'active', TRUE, NULL
) RETURNING id INTO s3;

INSERT INTO properties (
  title, description, listing_type, address, city, state, postal_code,
  beds, baths, area_sqft, monthly_rent_cents, deposit_cents,
  available_from, available_until, status, is_demo, tag_label
) VALUES (
  'Sublet Available — University District Seattle',
  'Subletting my 1BR apartment in the U-District for summer. Steps from UW campus, fully furnished, utilities included. Ideal for visiting students, researchers, or interns. Flexible 2–4 month term.',
  'sublet', '4318 University Way NE', 'Seattle', 'WA', '98105',
  1, 1, 500, 135000, 0,
  '2025-06-01', '2025-09-30', 'active', TRUE, NULL
) RETURNING id INTO s4;

-- Images for sublet listings
INSERT INTO property_images (property_id, image_url, display_order, is_primary) VALUES
  (s1, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop', 0, TRUE),
  (s1, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop', 1, FALSE),
  (s2, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop', 0, TRUE),
  (s2, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop', 1, FALSE),
  (s3, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', 0, TRUE),
  (s3, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop', 1, FALSE),
  (s4, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2940&auto=format&fit=crop', 0, TRUE),
  (s4, 'https://images.unsplash.com/photo-1560185127-6a8f05be2b22?q=80&w=1200&auto=format&fit=crop', 1, FALSE);

-- Contacts for sublet listings
INSERT INTO property_contacts (property_id, name, phone, email, languages, preferred_contact_method, is_primary) VALUES
  (s1, 'Jenny Oh', '(310) 555-0234', 'jenny.oh@example.com', ARRAY['English','Korean'], 'Email/KakaoTalk', TRUE),
  (s2, 'David Cho', '(212) 555-0198', 'david.cho@example.com', ARRAY['English','Korean'], 'Email', TRUE),
  (s3, 'Amy Seo', '(617) 555-0211', 'amy.seo@example.com', ARRAY['English'], 'Email', TRUE),
  (s4, 'Brian Yoon', '(206) 555-0189', 'brian.yoon@example.com', ARRAY['English','Korean'], 'Text', TRUE);

END $$;
