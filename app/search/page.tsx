"use client";

import { useSearchParams } from "next/navigation";
import FilterBar from "@/components/shared/FilterBar";
import PropertyCard, { type Tag } from "@/components/shared/PropertyCard";
import Map from "@/components/shared/Map";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const properties = [
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$24,000,000",
      title: "1999 Wufna Point",
      location: "Minnesota, Atlanta, GA",
      date: "26 November 2020",
      beds: 4,
      baths: 2,
      area: 6725,
      tag: "NEW" as Tag,
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$989,000",
      title: "1999 Wufna Point",
      location: "Minnesota, Atlanta, GA",
      date: "26 November 2020",
      beds: 4,
      baths: 2,
      area: 6725,
      tag: "SALE" as Tag,
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$896,000",
      title: "1999 Wufna Point",
      location: "Minnesota, Atlanta, GA",
      date: "26 November 2020",
      beds: 4,
      baths: 2,
      area: 6725,
      tag: "RECOMMENDED" as Tag,
    },
  ];

  return (
    <div className="flex">
      <div className="w-2/3 p-8">
        <p className="text-sm text-gray-500">10 appear from 237 Results</p>
        <h1 className="text-3xl font-bold mt-2">
          Search Result '{address}'
        </h1>
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
      <div className="w-1/3">
        {lat && lng && <Map lat={parseFloat(lat)} lng={parseFloat(lng)} />}
      </div>
    </div>
  );
};

export default SearchPage;
