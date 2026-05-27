-- Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('rental', 'sale', 'roomshare', 'sublet')),
  property_type TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT,
  country TEXT DEFAULT 'US',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  beds INTEGER,
  baths DECIMAL(3,1),
  area_sqft INTEGER,
  floor_number INTEGER,
  total_floors INTEGER,
  monthly_rent_cents INTEGER,
  sale_price_cents INTEGER,
  deposit_cents INTEGER,
  utilities_cents INTEGER,
  parking_cents INTEGER,
  hoa_cents INTEGER,
  property_tax_cents INTEGER,
  available_from DATE,
  available_until DATE,
  minimum_stay_months INTEGER,
  maximum_occupants INTEGER,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'rented', 'sold')),
  featured BOOLEAN DEFAULT FALSE,
  is_demo BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  tag_label TEXT CHECK (tag_label IN ('NEW', 'SALE', 'RECOMMENDED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  icon TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE property_amenities (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);

CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  short_name TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'US',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE property_universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  distance_miles DECIMAL(4, 2),
  walk_time_minutes INTEGER,
  transit_time_minutes INTEGER,
  transportation_methods TEXT[],
  UNIQUE(property_id, university_id)
);

CREATE TABLE property_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  languages TEXT[],
  preferred_contact_method TEXT,
  is_primary BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE property_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE saved_properties (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, property_id)
);

CREATE INDEX idx_properties_listing_type ON properties(listing_type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_featured ON properties(featured);
CREATE INDEX idx_properties_location ON properties(city, state);
CREATE INDEX idx_properties_price_rental ON properties(monthly_rent_cents) WHERE listing_type IN ('rental', 'roomshare', 'sublet');
CREATE INDEX idx_properties_price_sale ON properties(sale_price_cents) WHERE listing_type = 'sale';
CREATE INDEX idx_properties_available_from ON properties(available_from);
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_amenities_property_id ON property_amenities(property_id);
CREATE INDEX idx_property_universities_property_id ON property_universities(property_id);
CREATE INDEX idx_property_views_property_id ON property_views(property_id);
CREATE INDEX idx_property_views_viewed_at ON property_views(viewed_at);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active properties" ON properties
  FOR SELECT USING (status = 'active');
CREATE POLICY "Users can create properties" ON properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own properties" ON properties
  FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Anyone can view property images" ON property_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM properties WHERE properties.id = property_images.property_id AND properties.status = 'active')
  );
CREATE POLICY "Users can manage images for own properties" ON property_images
  FOR ALL USING (
    EXISTS (SELECT 1 FROM properties WHERE properties.id = property_images.property_id AND properties.created_by = auth.uid())
  );

CREATE POLICY "Anyone can view amenities" ON property_amenities
  FOR SELECT USING (true);
CREATE POLICY "Users can manage amenities for own properties" ON property_amenities
  FOR ALL USING (
    EXISTS (SELECT 1 FROM properties WHERE properties.id = property_amenities.property_id AND properties.created_by = auth.uid())
  );

CREATE POLICY "Anyone can view property contacts" ON property_contacts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM properties WHERE properties.id = property_contacts.property_id AND properties.status = 'active')
  );

CREATE POLICY "Users can manage own saved properties" ON saved_properties
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Anyone can record property views" ON property_views
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own property views" ON property_views
  FOR SELECT USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
