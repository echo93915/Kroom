import Hero from "@/components/shared/Hero";
import FeaturedSales from "@/components/shared/FeaturedSales";
import FeaturedRentals from "@/components/shared/FeaturedRentals";
import MapSearch from "@/components/shared/MapSearch";
import FeaturedProjects from "@/components/shared/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSales />
      <FeaturedRentals />
      <MapSearch />
      <FeaturedProjects />
    </>
  );
}
