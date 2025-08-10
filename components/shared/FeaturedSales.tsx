"use client";

import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FeaturedSales = () => {
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const properties = [
    {
      id: "featured-sale-nyu-001",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$425,000",
      title: "Modern Condo Near NYU",
      location: "Greenwich Village, New York, NY",
      date: "Listed December 2024",
      beds: 1,
      baths: 1,
      area: 650,
      tag: "SALE" as const,
      is_demo: true,
    },
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