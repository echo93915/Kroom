-- Add missing RLS policies for property_amenities and other tables
-- This allows public read access to amenities for active properties

-- RLS Policies for property_amenities (public read for active properties)
CREATE POLICY "Anyone can view property amenities for active properties" ON property_amenities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_amenities.property_id 
      AND properties.status = 'active'
    )
  );

CREATE POLICY "Users can manage amenities for own properties" ON property_amenities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_amenities.property_id 
      AND properties.created_by = auth.uid()
    )
  );

-- RLS Policies for property_contacts (public read for active properties)
CREATE POLICY "Anyone can view property contacts for active properties" ON property_contacts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_contacts.property_id 
      AND properties.status = 'active'
    )
  );

CREATE POLICY "Users can manage contacts for own properties" ON property_contacts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_contacts.property_id 
      AND properties.created_by = auth.uid()
    )
  );

-- RLS Policies for property_universities (public read for active properties)  
CREATE POLICY "Anyone can view property universities for active properties" ON property_universities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_universities.property_id 
      AND properties.status = 'active'
    )
  );

CREATE POLICY "Users can manage universities for own properties" ON property_universities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_universities.property_id 
      AND properties.created_by = auth.uid()
    )
  );