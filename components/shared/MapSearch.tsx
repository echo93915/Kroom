import { Button } from "../ui/button";

const MapSearch = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">
            Search Your Dream House On The Map
          </h2>
          <p className="text-gray-600 mt-4">
            Find the house you are looking for easily according to location
            information.
          </p>
          <Button variant="destructive" className="mt-6">
            Search On Map
          </Button>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1588499752092-d39a37a3479d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Person using a map on their phone"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSearch; 