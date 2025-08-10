"use client";

import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Property as DatabaseProperty } from "@/lib/types/property";

const FeaturedSales = () => {
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback properties in case database is empty
  const fallbackProperties = [
    {
      id: "featured-sale-stanford-002",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$675,000",
      title: "2BR Townhouse",
      location: "Palo Alto, CA (Near Stanford)",
      date: "Listed November 2024",
      beds: 2,
      baths: 2,
      area: 1100,
      is_demo: true,
    },
    {
      id: "featured-sale-berkeley-003",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$380,000",
      title: "Studio Loft Investment",
      location: "Berkeley, CA (Near UC Berkeley)",
      date: "Listed October 2024",
      beds: 1,
      baths: 1,
      area: 480,
      tag: "NEW" as const,
      is_demo: true,
    },
    {
      id: "featured-sale-seattle-004",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$525,000",
      title: "Modern 2BR Apartment",
      location: "Seattle, WA (Near UW)",
      date: "Listed September 2024",
      beds: 2,
      baths: 1,
      area: 850,
      is_demo: true,
    },
  ];

  useEffect(() => {
    const fetchSaleProperties = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            images:property_images(image_url, display_order, is_primary)
          `)
          .eq('status', 'active')
          .eq('listing_type', 'sale')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) {
          console.error('Error fetching sale properties:', error);
          setProperties(fallbackProperties);
          return;
        }

        if (data && data.length > 0) {
          // Transform database properties to match PropertyCard props
          const transformedProperties = data.map((prop: DatabaseProperty) => {
            const primaryImage = prop.images?.find((img: any) => img.is_primary);
            const firstImage = prop.images?.[0];
            const imageUrl = primaryImage?.image_url || firstImage?.image_url || '/placeholder-property.jpg';
            
            return {
              id: prop.id,
              image: imageUrl,
              price: prop.sale_price_cents ? `$${(prop.sale_price_cents / 100).toLocaleString()}` : 'Price on request',
              title: prop.title,
              location: `${prop.city}, ${prop.state}`,
              date: prop.available_from ? `Available ${new Date(prop.available_from).toLocaleDateString()}` : 'Available Now',
              beds: prop.beds || 0,
              baths: prop.baths || 0,
              area: prop.area_sqft || 0,
              tag: prop.tag_label as "SALE" | "NEW" | undefined,
              is_demo: prop.is_demo || false,
            };
          });
          
          setProperties(transformedProperties);
        } else {
          // Use fallback if no database properties found
          setProperties(fallbackProperties);
        }
      } catch (error) {
        console.error('Error in fetchSaleProperties:', error);
        setProperties(fallbackProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProperties();
  }, []);

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleHeartClick = (propertyId: string) => {
    setSavedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
    // In a real app, this would also update the backend/database
  };

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Sales</h2>
            <Button variant="outline" onClick={() => router.push("/search")}>All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Sales</h2>
          <Button variant="outline" onClick={() => router.push("/search")}>All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
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
    </section>
  );
};

export default FeaturedSales; 