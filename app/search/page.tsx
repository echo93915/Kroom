"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FilterBar from "@/components/shared/FilterBar";
import PropertyCard, { type Tag } from "@/components/shared/PropertyCard";
import Map from "@/components/shared/Map";
import { Home, Users, Key } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Property as DatabaseProperty } from "@/lib/types/property";

// Define listing types and their order
type ListingType = "rental" | "roomshare" | "sublet" | "sale";
type FilterType = "rental" | "roomshare" | "sublet" | "sale";

const listingTypeConfig = {
  rental: { label: "Rental", icon: Home },
  roomshare: { label: "Find Roommate", icon: Users },
  sublet: { label: "Sublease", icon: Key },
  sale: { label: "Sale", icon: Home }
};

const listingTypeOrder: ListingType[] = ["rental", "roomshare", "sublet", "sale"];

interface Property {
  id: string; // Add unique identifier
  image: string;
  price: string;
  title: string;
  location: string;
  date: string;
  beds: number;
  baths: number;
  area: number;
  tag?: Tag;
  listingType: ListingType;
  is_demo?: boolean;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const address = searchParams.get("address");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  // Filter state - initially all filters are active
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(["rental", "roomshare", "sublet", "sale"]);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            images:property_images(id, image_url, alt_text, display_order, is_primary)
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform database properties to search page format
        const transformedProperties: Property[] = (data || []).map((row: any) => ({
          id: row.id,
          image: row.images?.[0]?.image_url || '/placeholder-property.jpg',
          price: row.listing_type === 'sale' 
            ? `$${(row.sale_price_cents ? row.sale_price_cents / 100 : 0).toLocaleString()}`
            : `$${(row.monthly_rent_cents ? row.monthly_rent_cents / 100 : 0).toLocaleString()}/month`,
          title: row.title,
          location: `${row.address}, ${row.city}, ${row.state}`,
          date: row.available_from ? `Available ${new Date(row.available_from).toLocaleDateString()}` : 'Available Now',
          beds: row.beds || 0,
          baths: row.baths || 0,
          area: row.area_sqft || 0,
          tag: row.tag_label as Tag,
          listingType: row.listing_type as ListingType,
          is_demo: row.is_demo
        }));

        setProperties(transformedProperties);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
        // Fallback to empty array on error
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on active filters
  const filteredProperties = properties.filter(property => 
    activeFilters.includes(property.listingType)
  );

  // Group filtered properties by listing type
  const groupedProperties = listingTypeOrder.reduce((acc, type) => {
    const typeProperties = filteredProperties.filter(property => property.listingType === type);
    if (typeProperties.length > 0) {
      acc[type] = typeProperties;
    }
    return acc;
  }, {} as Record<ListingType, Property[]>);

  const totalProperties = filteredProperties.length;
  const totalAllProperties = properties.length;
  const allFiltersActive = activeFilters.length === 4;

  const handleFilterToggle = (filter: FilterType) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        // Remove filter if it's active
        return prev.filter(f => f !== filter);
      } else {
        // Add filter if it's not active
        return [...prev, filter];
      }
    });
  };

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleHeartClick = (propertyId: string) => {
    setSavedProperties(prev => {
      if (prev.includes(propertyId)) {
        // Remove from saved
        return prev.filter(id => id !== propertyId);
      } else {
        // Add to saved
        return [...prev, propertyId];
      }
    });
    // In a real app, this would also update the backend/database
  };

  // Generate filter status text
  const getFilterStatusText = () => {
    if (allFiltersActive) {
      return "";
    }
    if (activeFilters.length === 0) {
      return " • No filters selected";
    }
    const filterLabels = activeFilters.map(filter => listingTypeConfig[filter].label);
    return ` • Showing: ${filterLabels.join(", ")}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div>
        <p className="text-sm text-gray-500">
          {totalProperties} appear from {totalAllProperties + 200} Results
          <span className="text-blue-600">{getFilterStatusText()}</span>
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Search Result '{address}'
        </h1>
        <FilterBar activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />
      </div>

      <div className="flex gap-8 mt-8">
        <div className="w-2/3">
          {totalProperties === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No listings found for the selected filters.</p>
              <p className="text-gray-400 text-sm mt-2">Try selecting more filter categories.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedProperties).map(([type, typeProperties]) => {
                const config = listingTypeConfig[type as ListingType];
                const IconComponent = config.icon;
                
                return (
                  <div key={type} className="space-y-6">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                      <h2 className="text-2xl font-bold text-gray-900">{config.label}</h2>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {typeProperties.length} listing{typeProperties.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    {/* Properties Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {typeProperties.map((property) => (
                        <PropertyCard 
                          key={property.id}
                          id={property.id}
                          image={property.image}
                          price={property.price}
                          title={property.title}
                          location={property.location}
                          date={property.date}
                          beds={property.beds}
                          baths={property.baths}
                          area={property.area}
                          tag={property.tag}
                          onClick={handlePropertyClick}
                          onHeartClick={handleHeartClick}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="w-1/3">
          <div className="sticky top-24">
            {lat && lng && <Map lat={parseFloat(lat)} lng={parseFloat(lng)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
