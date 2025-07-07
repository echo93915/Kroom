import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";

const FeaturedSales = () => {
  const properties = [
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "290.000 $",
      title: "Apartment for sale",
      location: "London, Oxford St.",
      date: "26 November 2020",
      beds: 3,
      baths: 1,
      area: 150,
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "290.000 $",
      title: "Apartment for sale",
      location: "London, Oxford St.",
      date: "26 November 2020",
      beds: 3,
      baths: 1,
      area: 150,
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "290.000 $",
      title: "Apartment for sale",
      location: "London, Oxford St.",
      date: "26 November 2020",
      beds: 3,
      baths: 1,
      area: 150,
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "290.000 $",
      title: "Apartment for sale",
      location: "London, Oxford St.",
      date: "26 November 2020",
      beds: 3,
      baths: 1,
      area: 150,
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Sales</h2>
          <Button variant="outline">All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSales; 