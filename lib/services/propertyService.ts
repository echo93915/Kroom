import { createClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';
import type { 
  Property, 
  PropertySearchParams, 
  PropertySearchResult,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  FormattedPricing,
  ListingType
} from '@/lib/types/property';

// Utility functions for price formatting
export function formatPricing(pricing: any): FormattedPricing {
  return {
    monthly_rent: pricing.monthly_rent_cents ? pricing.monthly_rent_cents / 100 : undefined,
    sale_price: pricing.sale_price_cents ? pricing.sale_price_cents / 100 : undefined,
    deposit: pricing.deposit_cents ? pricing.deposit_cents / 100 : undefined,
    utilities: pricing.utilities_cents ? pricing.utilities_cents / 100 : undefined,
    parking: pricing.parking_cents ? pricing.parking_cents / 100 : undefined,
    hoa: pricing.hoa_cents ? pricing.hoa_cents / 100 : undefined,
    property_tax: pricing.property_tax_cents ? pricing.property_tax_cents / 100 : undefined,
  };
}

export function formatPropertyPrice(property: any): string {
  const pricing = formatPricing(property);
  
  if (property.listing_type === 'sale') {
    return pricing.sale_price ? `$${pricing.sale_price.toLocaleString()}` : 'Price on request';
  } else {
    return pricing.monthly_rent ? `$${pricing.monthly_rent.toLocaleString()}/month` : 'Contact for price';
  }
}

export function calculateTotalMonthly(property: any): number {
  const pricing = formatPricing(property);
  
  if (property.listing_type === 'sale') {
    return (pricing.hoa || 0) + (pricing.property_tax || 0) + (pricing.utilities || 0) + (pricing.parking || 0);
  } else {
    return (pricing.monthly_rent || 0) + (pricing.utilities || 0) + (pricing.parking || 0);
  }
}

// Transform database row to Property type
function transformProperty(row: any): Property {
  const pricing = formatPricing(row);
  
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    listing_type: row.listing_type,
    property_type: row.property_type,
    address: row.address,
    city: row.city,
    state: row.state,
    postal_code: row.postal_code,
    country: row.country,
    latitude: row.latitude,
    longitude: row.longitude,
    beds: row.beds,
    baths: row.baths,
    area_sqft: row.area_sqft,
    floor_number: row.floor_number,
    total_floors: row.total_floors,
    pricing: {
      monthly_rent_cents: row.monthly_rent_cents,
      sale_price_cents: row.sale_price_cents,
      deposit_cents: row.deposit_cents,
      utilities_cents: row.utilities_cents,
      parking_cents: row.parking_cents,
      hoa_cents: row.hoa_cents,
      property_tax_cents: row.property_tax_cents,
    },
    available_from: row.available_from ? new Date(row.available_from) : undefined,
    available_until: row.available_until ? new Date(row.available_until) : undefined,
    minimum_stay_months: row.minimum_stay_months,
    maximum_occupants: row.maximum_occupants,
    status: row.status,
    featured: row.featured,
    tags: row.tags,
    tag_label: row.tag_label,
    is_demo: row.is_demo,
    created_at: new Date(row.created_at),
    updated_at: new Date(row.updated_at),
    created_by: row.created_by,
    
    // Computed fields
    primary_image: row.images?.[0]?.image_url || '/placeholder-property.jpg',
    formatted_price: formatPropertyPrice(row),
    formatted_address: `${row.address}, ${row.city}, ${row.state}`,
    nearest_university: row.universities?.[0],
    
    // Relations
    images: row.images || [],
    amenities: row.amenities || [],
    contacts: row.contacts || [],
    universities: row.universities || [],
  };
}

// Client-side service functions
export class PropertyService {
  private supabase;
  
  constructor(isServer = false) {
    this.supabase = isServer ? createServerClient() : createClient();
  }

  // Search properties with filters
  async searchProperties(params: PropertySearchParams = {}): Promise<PropertySearchResult> {
    let query = this.supabase
      .from('properties')
      .select(`
        *,
        images:property_images(id, image_url, alt_text, display_order, is_primary),
        amenities:property_amenities(amenity:amenities(id, name, icon, category)),
        contacts:property_contacts(id, name, phone, email, languages, preferred_contact_method, is_primary),
        universities:property_universities(
          id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods,
          university:universities(id, name, short_name, city, state)
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    // Apply filters
    if (params.listing_type) {
      if (Array.isArray(params.listing_type)) {
        query = query.in('listing_type', params.listing_type);
      } else {
        query = query.eq('listing_type', params.listing_type);
      }
    }

    if (params.city) {
      query = query.ilike('city', `%${params.city}%`);
    }

    if (params.state) {
      query = query.eq('state', params.state);
    }

    if (params.featured_only) {
      query = query.eq('featured', true);
    }

    if (params.beds) {
      query = query.gte('beds', params.beds);
    }

    if (params.baths) {
      query = query.gte('baths', params.baths);
    }

    if (params.min_price) {
      query = query.gte('monthly_rent_cents', params.min_price * 100);
    }

    if (params.max_price) {
      query = query.lte('monthly_rent_cents', params.max_price * 100);
    }

    if (params.search_query) {
      query = query.textSearch('search_vector', params.search_query);
    }

    if (params.available_from) {
      query = query.gte('available_from', params.available_from.toISOString());
    }

    // Pagination
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to search properties: ${error.message}`);
    }

    const properties = (data || []).map(transformProperty);

    return {
      properties,
      total_count: count || 0,
      has_more: properties.length === limit,
    };
  }

  // Get property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    const { data, error } = await this.supabase
      .from('properties')
      .select(`
        *,
        images:property_images(id, image_url, alt_text, display_order, is_primary),
        amenities:property_amenities(amenity:amenities(id, name, icon, category)),
        contacts:property_contacts(id, name, phone, email, languages, preferred_contact_method, is_primary),
        universities:property_universities(
          id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods,
          university:universities(id, name, short_name, city, state)
        )
      `)
      .eq('id', id)
      .eq('status', 'active')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to get property: ${error.message}`);
    }

    return transformProperty(data);
  }

  // Get featured properties
  async getFeaturedProperties(listingType?: ListingType): Promise<Property[]> {
    const params: PropertySearchParams = {
      featured_only: true,
      limit: 8,
    };

    if (listingType) {
      params.listing_type = listingType;
    }

    const result = await this.searchProperties(params);
    return result.properties;
  }

  // Record property view for analytics
  async recordPropertyView(propertyId: string, userId?: string): Promise<void> {
    const { error } = await this.supabase
      .from('property_views')
      .insert({
        property_id: propertyId,
        user_id: userId,
        ip_address: null, // Could be populated server-side
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      });

    if (error) {
      console.error('Failed to record property view:', error);
      // Don't throw error for analytics - shouldn't break user experience
    }
  }

  // Save/unsave property for user
  async toggleSavedProperty(propertyId: string, userId: string): Promise<boolean> {
    const { data: existing } = await this.supabase
      .from('saved_properties')
      .select('*')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single();

    if (existing) {
      // Remove from saved
      const { error } = await this.supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId);

      if (error) {
        throw new Error(`Failed to unsave property: ${error.message}`);
      }
      return false;
    } else {
      // Add to saved
      const { error } = await this.supabase
        .from('saved_properties')
        .insert({
          user_id: userId,
          property_id: propertyId,
        });

      if (error) {
        throw new Error(`Failed to save property: ${error.message}`);
      }
      return true;
    }
  }

  // Get user's saved properties
  async getUserSavedProperties(userId: string): Promise<Property[]> {
    const { data, error } = await this.supabase
      .from('saved_properties')
      .select(`
        property:properties(
          *,
          images:property_images(id, image_url, alt_text, display_order, is_primary),
          amenities:property_amenities(amenity:amenities(id, name, icon, category)),
          contacts:property_contacts(id, name, phone, email, languages, preferred_contact_method, is_primary),
          universities:property_universities(
            id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods,
            university:universities(id, name, short_name, city, state)
          )
        )
      `)
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get saved properties: ${error.message}`);
    }

    return (data || [])
      .map(item => item.property)
      .filter(Boolean)
      .map(transformProperty);
  }

  // Create new property (for landlords/admin)
  async createProperty(request: CreatePropertyRequest, userId: string): Promise<Property> {
    const { error, data } = await this.supabase
      .from('properties')
      .insert({
        title: request.title,
        description: request.description,
        listing_type: request.listing_type,
        property_type: request.property_type,
        address: request.address,
        city: request.city,
        state: request.state,
        postal_code: request.postal_code,
        beds: request.beds,
        baths: request.baths,
        area_sqft: request.area_sqft,
        floor_number: request.floor_number,
        total_floors: request.total_floors,
        monthly_rent_cents: request.pricing.monthly_rent_cents,
        sale_price_cents: request.pricing.sale_price_cents,
        deposit_cents: request.pricing.deposit_cents,
        utilities_cents: request.pricing.utilities_cents,
        parking_cents: request.pricing.parking_cents,
        hoa_cents: request.pricing.hoa_cents,
        property_tax_cents: request.pricing.property_tax_cents,
        available_from: request.available_from,
        available_until: request.available_until,
        minimum_stay_months: request.minimum_stay_months,
        maximum_occupants: request.maximum_occupants,
        tags: request.tags,
        tag_label: request.tag_label,
        is_demo: request.is_demo,
        created_by: userId,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create property: ${error.message}`);
    }

    // TODO: Add related data (images, amenities, contacts, etc.)

    return this.getPropertyById(data.id) as Promise<Property>;
  }
}

// Singleton instances for client and server
export const propertyService = new PropertyService(false);
export const serverPropertyService = new PropertyService(true); 