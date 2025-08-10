import { createClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';

/**
 * Utility service for managing demo data cleanup
 * This service provides functions to identify and remove demo listings
 * when the platform goes live with real data
 */
export class DemoDataCleanupService {
  private supabase;
  
  constructor(isServer = false) {
    this.supabase = isServer ? createServerClient() : createClient();
  }

  /**
   * Get all demo properties
   */
  async getDemoProperties() {
    const { data, error } = await this.supabase
      .from('properties')
      .select('*')
      .eq('is_demo', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch demo properties: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Count demo properties by type
   */
  async getDemoPropertyStats() {
    const { data, error } = await this.supabase
      .from('properties')
      .select('listing_type, is_demo')
      .eq('is_demo', true);

    if (error) {
      throw new Error(`Failed to fetch demo property stats: ${error.message}`);
    }

    const stats = (data || []).reduce((acc, property) => {
      const type = property.listing_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: data?.length || 0,
      byType: stats
    };
  }

  /**
   * Delete all demo properties (USE WITH CAUTION!)
   * This will permanently remove all properties marked as demo data
   */
  async deleteDemoProperties() {
    // First, delete related data (due to foreign key constraints)
    const { error: imagesError } = await this.supabase
      .from('property_images')
      .delete()
      .in('property_id', 
        this.supabase
          .from('properties')
          .select('id')
          .eq('is_demo', true)
      );

    if (imagesError) {
      throw new Error(`Failed to delete demo property images: ${imagesError.message}`);
    }

    const { error: viewsError } = await this.supabase
      .from('property_views')
      .delete()
      .in('property_id', 
        this.supabase
          .from('properties')
          .select('id')
          .eq('is_demo', true)
      );

    if (viewsError) {
      throw new Error(`Failed to delete demo property views: ${viewsError.message}`);
    }

    const { error: savedError } = await this.supabase
      .from('saved_properties')
      .delete()
      .in('property_id', 
        this.supabase
          .from('properties')
          .select('id')
          .eq('is_demo', true)
      );

    if (savedError) {
      throw new Error(`Failed to delete demo saved properties: ${savedError.message}`);
    }

    // Now delete the demo properties
    const { data, error } = await this.supabase
      .from('properties')
      .delete()
      .eq('is_demo', true)
      .select('id');

    if (error) {
      throw new Error(`Failed to delete demo properties: ${error.message}`);
    }

    return {
      deletedCount: data?.length || 0,
      deletedIds: data?.map(p => p.id) || []
    };
  }

  /**
   * Mark properties as demo by ID
   */
  async markPropertiesAsDemo(propertyIds: string[]) {
    const { data, error } = await this.supabase
      .from('properties')
      .update({ is_demo: true })
      .in('id', propertyIds)
      .select('id, title');

    if (error) {
      throw new Error(`Failed to mark properties as demo: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Unmark properties as demo by ID (make them real listings)
   */
  async unmarkPropertiesAsDemo(propertyIds: string[]) {
    const { data, error } = await this.supabase
      .from('properties')
      .update({ is_demo: false })
      .in('id', propertyIds)
      .select('id, title');

    if (error) {
      throw new Error(`Failed to unmark properties as demo: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Filter out demo properties from a property list
   * Useful for production display where you want to hide demo data
   */
  filterOutDemoProperties<T extends { is_demo?: boolean }>(properties: T[]): T[] {
    return properties.filter(property => !property.is_demo);
  }

  /**
   * Get only demo properties from a property list
   * Useful for admin interfaces or testing
   */
  filterDemoPropertiesOnly<T extends { is_demo?: boolean }>(properties: T[]): T[] {
    return properties.filter(property => property.is_demo);
  }
}

// Export singleton instances
export const demoDataCleanup = new DemoDataCleanupService(false);
export const serverDemoDataCleanup = new DemoDataCleanupService(true);

// Hardcoded property IDs that are known to be demo data
// These correspond to the hardcoded properties in various components
export const KNOWN_DEMO_PROPERTY_IDS = [
  // Featured Rentals
  'featured-rental-ucla-001',
  'featured-rental-harvard-002', 
  'featured-rental-usc-003',
  'featured-rental-umich-004',
  
  // Featured Sales
  'featured-sale-nyu-001',
  'featured-sale-stanford-002',
  'featured-sale-berkeley-003', 
  'featured-sale-seattle-004',
  
  // Search Page Properties
  'rental-ucla-studio-001',
  'rental-westwood-2br-002',
  'roommate-berkeley-house-003',
  'roommate-harvard-female-004',
  'sublet-stanford-summer-005',
  'sublet-umich-spring-006',
  'sale-seattle-condo-007',
  'sale-boston-townhouse-008'
];

/**
 * Utility function to check if a property ID is known demo data
 */
export function isKnownDemoProperty(propertyId: string): boolean {
  return KNOWN_DEMO_PROPERTY_IDS.includes(propertyId);
}