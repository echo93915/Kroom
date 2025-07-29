"use client";

import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FeaturedRentals = () => {
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const properties = [
    {
      id: "featured-rental-ucla-001",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$1,850/month",
      title: "Modern Studio Near UCLA",
      location: "Westwood, Los Angeles, CA",
      date: "Available January 2025",
      beds: 1,
      baths: 1,
      area: 450,
      tag: "NEW" as const,
    },
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
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Rental</h2>
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

export default FeaturedRentals; 