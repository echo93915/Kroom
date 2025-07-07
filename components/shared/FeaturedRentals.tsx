import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";

const FeaturedRentals = () => {
  const properties = [
    {
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "3.000 $",
      title: "Apartment for rent",
      location: "London, John Ruskin St.",
      date: "20 November 2020",
      beds: 2,
      baths: 1,
      area: 110,
    },
    {
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "3.000 $",
      title: "Apartment for rent",
      location: "London, John Ruskin St.",
      date: "20 November 2020",
      beds: 2,
      baths: 1,
      area: 110,
    },
    {
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "3.000 $",
      title: "Apartment for rent",
      location: "London, John Ruskin St.",
      date: "20 November 2020",
      beds: 2,
      baths: 1,
      area: 110,
    },
    {
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "3.000 $",
      title: "Apartment for rent",
      location: "London, John Ruskin St.",
      date: "20 November 2020",
      beds: 2,
      baths: 1,
      area: 110,
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Rental</h2>
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

export default FeaturedRentals; 