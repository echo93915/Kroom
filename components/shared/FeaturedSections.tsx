"use client";

import { useUserCity } from "@/hooks/useUserCity";
import FeaturedRentals from "./FeaturedRentals";
import FeaturedSales from "./FeaturedSales";
import FeaturedSubleases from "./FeaturedSubleases";
import FeaturedRoommates from "./FeaturedRoommates";

export interface UniFilterProps {
  selectedUniversities: Set<string>;
  nearbyList: { name: string }[];
}

const FeaturedSections = () => {
  const city = useUserCity();

  return (
    <>
      <FeaturedRentals city={city} />
      <FeaturedRoommates city={city} />
      <FeaturedSubleases city={city} />
      <FeaturedSales city={city} />
    </>
  );
};

export default FeaturedSections;
