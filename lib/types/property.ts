export type ListingType = 'rental' | 'sale' | 'roomshare' | 'sublet';
export type PropertyStatus = 'active' | 'inactive' | 'pending' | 'rented' | 'sold';
export type TagLabel = 'NEW' | 'SALE' | 'RECOMMENDED';

export interface University {
  id: string;
  name: string;
  short_name: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  website?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'premium' | 'student-specific';
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
  is_primary: boolean;
}

export interface PropertyContact {
  id: string;
  property_id: string;
  name: string;
  phone?: string;
  email?: string;
  languages: string[];
  preferred_contact_method?: string;
  is_primary: boolean;
}

export interface PropertyUniversity {
  id: string;
  property_id: string;
  university_id: string;
  distance_miles: number;
  walk_time_minutes?: number;
  transit_time_minutes?: number;
  transportation_methods: string[];
  university: University;
}

export interface PropertyPricing {
  monthly_rent_cents?: number;
  sale_price_cents?: number;
  deposit_cents?: number;
  utilities_cents?: number;
  parking_cents?: number;
  hoa_cents?: number;
  property_tax_cents?: number;
}

export interface Property {
  id: string;
  title: string;
  description?: string;
  listing_type: ListingType;
  property_type?: string;
  
  // Location
  address: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  
  // Property details
  beds?: number;
  baths?: number;
  area_sqft?: number;
  floor_number?: number;
  total_floors?: number;
  
  // Pricing
  pricing: PropertyPricing;
  
  // Availability
  available_from?: Date;
  available_until?: Date;
  minimum_stay_months?: number;
  maximum_occupants?: number;
  
  // Status and metadata
  status: PropertyStatus;
  featured: boolean;
  tags?: string[];
  tag_label?: TagLabel;
  is_demo?: boolean; // Invisible flag for demo data cleanup
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  
  // Relations (populated when needed)
  images?: PropertyImage[];
  amenities?: Amenity[];
  contacts?: PropertyContact[];
  universities?: PropertyUniversity[];
  
  // Computed fields for display
  primary_image?: string;
  formatted_price?: string;
  formatted_address?: string;
  nearest_university?: PropertyUniversity;
  view_count?: number;
  is_saved?: boolean;
}

// API Response types
export interface PropertySearchParams {
  listing_type?: ListingType | ListingType[];
  city?: string;
  state?: string;
  university_id?: string;
  min_price?: number;
  max_price?: number;
  beds?: number;
  baths?: number;
  amenities?: string[];
  available_from?: Date;
  featured_only?: boolean;
  limit?: number;
  offset?: number;
  search_query?: string;
}

export interface PropertySearchResult {
  properties: Property[];
  total_count: number;
  has_more: boolean;
}

// Form types for creating/editing properties
export interface CreatePropertyRequest {
  title: string;
  description?: string;
  listing_type: ListingType;
  property_type?: string;
  address: string;
  city: string;
  state: string;
  postal_code?: string;
  beds?: number;
  baths?: number;
  area_sqft?: number;
  floor_number?: number;
  total_floors?: number;
  pricing: Partial<PropertyPricing>;
  available_from?: Date;
  available_until?: Date;
  minimum_stay_months?: number;
  maximum_occupants?: number;
  tags?: string[];
  tag_label?: TagLabel;
  is_demo?: boolean;
  amenity_ids?: string[];
  university_relations?: Omit<PropertyUniversity, 'id' | 'property_id' | 'university'>[];
  contact: Omit<PropertyContact, 'id' | 'property_id'>;
  images?: { url: string; alt_text?: string; display_order: number }[];
}

export interface UpdatePropertyRequest extends Partial<CreatePropertyRequest> {
  id: string;
}

// Utility types for price formatting
export interface FormattedPricing {
  monthly_rent?: number;
  sale_price?: number;
  deposit?: number;
  utilities?: number;
  parking?: number;
  hoa?: number;
  property_tax?: number;
  total_monthly?: number;
}

// Analytics types
export interface PropertyView {
  id: string;
  property_id: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  viewed_at: Date;
}

export interface PropertyAnalytics {
  total_views: number;
  unique_views: number;
  views_last_7_days: number;
  views_last_30_days: number;
  top_referrers: { referrer: string; count: number }[];
  view_trend: { date: string; views: number }[];
} 