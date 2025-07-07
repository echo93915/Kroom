import { Button } from "../ui/button";

const FeaturedProjects = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="outline">All</Button>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold">Life Valley Project</h3>
            <p className="text-gray-600 mt-4">
              The privileged location in Lambeth region in the west of London
              city. The project is close to many hotels, hospitals and
              commercial centers...
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Modern apartment buildings"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 