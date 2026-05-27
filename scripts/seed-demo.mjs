import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rwlzdoppepdfvmcravba.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bHpkb3BwZXBkZnZtY3JhdmJhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTgwMTE0NCwiZXhwIjoyMDk1Mzc3MTQ0fQ.UJPjOKNKyDemzPI51TRRMOlPNJwhitGVczsvmGOLleU'
);

const roomshare = [
  { title: 'Roommate Wanted — Westwood 2BR', description: 'Looking for one roommate to share a sunny 2-bedroom apartment in Westwood, steps from UCLA. Furnished room available, shared living room and kitchen. Great for international students. Korean and English spoken.', listing_type: 'roomshare', address: '832 Gayley Ave', city: 'Los Angeles', state: 'CA', postal_code: '90024', beds: 2, baths: 1, area_sqft: 750, monthly_rent_cents: 120000, deposit_cents: 120000, available_from: '2025-02-01', maximum_occupants: 2, status: 'active', is_demo: true, tag_label: 'NEW' },
  { title: 'Roommate Needed — East Village 3BR', description: 'Seeking one roommate in a renovated 3-bedroom apartment in the East Village, 10 minutes from NYU by subway. Two current tenants are NYU grad students. Utilities split equally. Pet-friendly building.', listing_type: 'roomshare', address: '214 E 10th St', city: 'New York', state: 'NY', postal_code: '10003', beds: 3, baths: 1, area_sqft: 900, monthly_rent_cents: 160000, deposit_cents: 160000, available_from: '2025-03-01', maximum_occupants: 3, status: 'active', is_demo: true, tag_label: 'RECOMMENDED' },
  { title: 'Shared Room Near Harvard — Cambridge', description: 'One room available in a 4-bedroom house in Cambridge, 5-minute walk to Harvard Yard. Quiet, study-friendly environment. Fully furnished common areas. Looking for a graduate student or young professional.', listing_type: 'roomshare', address: '47 Kirkland St', city: 'Cambridge', state: 'MA', postal_code: '02138', beds: 4, baths: 2, area_sqft: 1200, monthly_rent_cents: 140000, deposit_cents: 140000, available_from: '2025-02-15', maximum_occupants: 4, status: 'active', is_demo: true, tag_label: null },
  { title: 'Roommate Wanted — Capitol Hill Seattle', description: 'One furnished room available in a modern 3BR apartment on Capitol Hill, one bus stop from UW. Shared kitchen and rooftop deck. Current roommates are UW students. Flexible on lease length.', listing_type: 'roomshare', address: '1521 10th Ave', city: 'Seattle', state: 'WA', postal_code: '98122', beds: 3, baths: 1, area_sqft: 850, monthly_rent_cents: 110000, deposit_cents: 110000, available_from: '2025-01-15', maximum_occupants: 3, status: 'active', is_demo: true, tag_label: null },
];

const sublet = [
  { title: 'Summer Sublet — Studio Near UCLA', description: 'Subletting my studio apartment in Westwood for the summer (June to August). Fully furnished with all utilities included. Perfect for students doing summer internships or research. Available for exactly 3 months.', listing_type: 'sublet', address: '10960 Wellworth Ave', city: 'Los Angeles', state: 'CA', postal_code: '90024', beds: 1, baths: 1, area_sqft: 420, monthly_rent_cents: 185000, deposit_cents: 0, available_from: '2025-06-01', available_until: '2025-08-31', status: 'active', is_demo: true, tag_label: 'NEW' },
  { title: 'Spring Sublet — 1BR in Greenwich Village', description: 'Subletting my 1-bedroom apartment near NYU for spring semester. Fully furnished, high-speed WiFi included. Great location, walkable to Washington Square Park. Flexible on exact dates.', listing_type: 'sublet', address: '58 W 10th St', city: 'New York', state: 'NY', postal_code: '10011', beds: 1, baths: 1, area_sqft: 550, monthly_rent_cents: 240000, deposit_cents: 0, available_from: '2025-01-15', available_until: '2025-05-31', status: 'active', is_demo: true, tag_label: 'RECOMMENDED' },
  { title: 'Short-term Sublet — Cambridge 2BR', description: 'Subletting a 2-bedroom apartment in Cambridge for 4 months while I study abroad. Furnished, in-unit laundry, near Harvard and MIT. Looking for a reliable subletter, no deposit required.', listing_type: 'sublet', address: '25 Magazine St', city: 'Cambridge', state: 'MA', postal_code: '02139', beds: 2, baths: 1, area_sqft: 780, monthly_rent_cents: 220000, deposit_cents: 0, available_from: '2025-05-01', available_until: '2025-08-31', status: 'active', is_demo: true, tag_label: null },
  { title: 'Sublet Available — University District Seattle', description: 'Subletting my 1BR apartment in the U-District for summer. Steps from UW campus, fully furnished, utilities included. Ideal for visiting students, researchers, or interns. Flexible 2 to 4 month term.', listing_type: 'sublet', address: '4318 University Way NE', city: 'Seattle', state: 'WA', postal_code: '98105', beds: 1, baths: 1, area_sqft: 500, monthly_rent_cents: 135000, deposit_cents: 0, available_from: '2025-06-01', available_until: '2025-09-30', status: 'active', is_demo: true, tag_label: null },
];

const roomshareImages = [
  ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop'],
  ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2940&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop'],
  ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop'],
  ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2940&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop'],
];

const subletImages = [
  ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop'],
  ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop'],
  ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop'],
  ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2940&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560185127-6a8f05be2b22?q=80&w=1200&auto=format&fit=crop'],
];

const roomshareContacts = [
  { name: 'Minho Choi', phone: '(310) 555-0201', email: 'minho.choi@example.com', languages: ['Korean','English'], preferred_contact_method: 'KakaoTalk/Text' },
  { name: 'Sarah Kim', phone: '(212) 555-0182', email: 'sarah.kim@example.com', languages: ['English','Korean'], preferred_contact_method: 'Email' },
  { name: 'James Park', phone: '(617) 555-0143', email: 'james.park@example.com', languages: ['English'], preferred_contact_method: 'Email/Text' },
  { name: 'Yuna Lee', phone: '(206) 555-0167', email: 'yuna.lee@example.com', languages: ['English','Korean'], preferred_contact_method: 'Text' },
];

const subletContacts = [
  { name: 'Jenny Oh', phone: '(310) 555-0234', email: 'jenny.oh@example.com', languages: ['English','Korean'], preferred_contact_method: 'Email/KakaoTalk' },
  { name: 'David Cho', phone: '(212) 555-0198', email: 'david.cho@example.com', languages: ['English','Korean'], preferred_contact_method: 'Email' },
  { name: 'Amy Seo', phone: '(617) 555-0211', email: 'amy.seo@example.com', languages: ['English'], preferred_contact_method: 'Email' },
  { name: 'Brian Yoon', phone: '(206) 555-0189', email: 'brian.yoon@example.com', languages: ['English','Korean'], preferred_contact_method: 'Text' },
];

async function seed() {
  for (let i = 0; i < roomshare.length; i++) {
    const { data, error } = await supabase.from('properties').insert(roomshare[i]).select('id').single();
    if (error) { console.error('roomshare error:', error.message); continue; }
    await supabase.from('property_images').insert([
      { property_id: data.id, image_url: roomshareImages[i][0], display_order: 0, is_primary: true },
      { property_id: data.id, image_url: roomshareImages[i][1], display_order: 1, is_primary: false },
    ]);
    await supabase.from('property_contacts').insert({ property_id: data.id, ...roomshareContacts[i], is_primary: true });
    console.log('inserted roomshare:', roomshare[i].title);
  }

  for (let i = 0; i < sublet.length; i++) {
    const { data, error } = await supabase.from('properties').insert(sublet[i]).select('id').single();
    if (error) { console.error('sublet error:', error.message); continue; }
    await supabase.from('property_images').insert([
      { property_id: data.id, image_url: subletImages[i][0], display_order: 0, is_primary: true },
      { property_id: data.id, image_url: subletImages[i][1], display_order: 1, is_primary: false },
    ]);
    await supabase.from('property_contacts').insert({ property_id: data.id, ...subletContacts[i], is_primary: true });
    console.log('inserted sublet:', sublet[i].title);
  }

  console.log('All done!');
}

seed().catch(console.error);
