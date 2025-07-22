"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterBar from "@/components/shared/FilterBar";
import PropertyCard, { type Tag } from "@/components/shared/PropertyCard";
import Map from "@/components/shared/Map";
import { Home, Users, Key } from "lucide-react";

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
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  // Filter state - initially all filters are active
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(["rental", "roomshare", "sublet", "sale"]);

  const properties: Property[] = [
    // Rental properties
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$2,500/month",
      title: "Modern Studio Apartment",
      location: "Near USC Campus, Los Angeles, CA",
      date: "Available December 2024",
      beds: 1,
      baths: 1,
      area: 550,
      tag: "NEW" as Tag,
      listingType: "rental"
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$3,200/month",
      title: "2BR Apartment Near University",
      location: "Westwood, Los Angeles, CA",
      date: "Available January 2025",
      beds: 2,
      baths: 1,
      area: 800,
      listingType: "rental"
    },
    
    // Roommate properties
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$800/month",
      title: "Roommate Wanted - Shared House",
      location: "Berkeley, CA",
      date: "Available Now",
      beds: 1,
      baths: 1,
      area: 300,
      tag: "RECOMMENDED" as Tag,
      listingType: "roomshare"
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$1,100/month",
      title: "Female Roommate Needed",
      location: "Harvard Square, Cambridge, MA",
      date: "Available February 2025",
      beds: 1,
      baths: 1,
      area: 400,
      listingType: "roomshare"
    },

    // Sublet properties
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$1,800/month",
      title: "Summer Sublet - Furnished Studio",
      location: "Stanford Area, Palo Alto, CA",
      date: "May - August 2025",
      beds: 1,
      baths: 1,
      area: 450,
      listingType: "sublet"
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$1,500/month",
      title: "Spring Semester Sublet",
      location: "Ann Arbor, MI",
      date: "January - May 2025",
      beds: 1,
      baths: 1,
      area: 600,
      listingType: "sublet"
    },

    // Sale properties
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$989,000",
      title: "2BR Condo for Sale",
      location: "Seattle, WA",
      date: "Listed November 2024",
      beds: 2,
      baths: 2,
      area: 1100,
      tag: "SALE" as Tag,
      listingType: "sale"
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$1,250,000",
      title: "3BR Townhouse",
      location: "Boston, MA",
      date: "Listed October 2024",
      beds: 3,
      baths: 2,
      area: 1500,
      listingType: "sale"
    }
  ];

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
                      {typeProperties.map((property, index) => (
                        <PropertyCard 
                          key={`${type}-${index}`} 
                          image={property.image}
                          price={property.price}
                          title={property.title}
                          location={property.location}
                          date={property.date}
                          beds={property.beds}
                          baths={property.baths}
                          area={property.area}
                          tag={property.tag}
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
