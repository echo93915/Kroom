"use client";

import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Property } from "@/lib/types/property";

const FeaturedRentals = () => {
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
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
          .eq('listing_type', 'rental')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(8);

        if (error) {
          throw error;
        }

        // Transform the data to include computed fields
        const transformedProperties = (data || []).map((row: any) => ({
          ...row,
          primary_image: row.images?.[0]?.image_url || '/placeholder-property.jpg',
          formatted_price: row.monthly_rent_cents ? `$${(row.monthly_rent_cents / 100).toLocaleString()}/month` : 'Contact for price',
          formatted_address: `${row.address}, ${row.city}, ${row.state}`,
        }));
        setProperties(transformedProperties);
      } catch (error) {
        console.error('Failed to fetch featured rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Helper function to normalize property data for display
  const normalizeProperty = (property: Property | any) => {
    return {
      id: property.id,
      image: property.primary_image || property.image || '/placeholder-property.jpg',
      price: property.formatted_price || property.price || 'Contact for price',
      title: property.title,
      location: property.formatted_address || property.location || `${property.city || ''}, ${property.state || ''}`.trim(),
      date: property.available_from ? `Available ${new Date(property.available_from).toLocaleDateString()}` : property.date || 'Available Now',
      beds: property.beds || 0,
      baths: property.baths || 0,
      area: property.area_sqft || property.area || 0,
      tag: property.tag_label || property.tag
    };
  };

  // Fallback hardcoded properties for when database is empty or loading fails
  const fallbackProperties = [
    {
      id: "featured-rental-harvard-002",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$2,400/month",
      title: "Shared 2BR Apartment",
      location: "Cambridge, MA (Near Harvard)",
      date: "Available February 2025",
      beds: 2,
      baths: 1,
      area: 750,
      tag: "RECOMMENDED" as const,
      is_demo: true,
    },
    {
      id: "featured-rental-usc-003",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$1,200/month",
      title: "Cozy Studio Near USC",
      location: "University Park, Los Angeles, CA",
      date: "Available Now",
      beds: 1,
      baths: 1,
      area: 380,
      is_demo: true,
    },
    {
      id: "featured-rental-umich-004",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$980/month",
      title: "Student Housing Complex",
      location: "Ann Arbor, MI (Near U of M)",
      date: "Available August 2025",
      beds: 1,
      baths: 1,
      area: 520,
      is_demo: true,
    },
  ];

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

  // Use database properties if available, otherwise fall back to hardcoded
  const displayProperties = properties.length > 0 ? properties : fallbackProperties;

  if (loading) {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Rental</h2>
            <Button variant="outline" onClick={() => router.push("/search")}>All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Rental</h2>
          <Button variant="outline" onClick={() => router.push("/search")}>All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProperties.map((property) => {
            const normalized = normalizeProperty(property);
            return (
              <PropertyCard 
                key={normalized.id} 
                id={normalized.id}
                image={normalized.image}
                price={normalized.price}
                title={normalized.title}
                location={normalized.location}
                date={normalized.date}
                beds={normalized.beds}
                baths={normalized.baths}
                area={normalized.area}
                tag={normalized.tag}
                onClick={handlePropertyClick}
                onHeartClick={handleHeartClick}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRentals; 