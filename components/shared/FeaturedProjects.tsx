import { Button } from "../ui/button";

const FeaturedProjects = () => {
  const projects = [
    {
      title: "Campus View Residences",
      description: "Modern student housing complex just 2 blocks from MIT. Features study lounges, fitness center, and 24/7 security. Perfect for international students with multilingual support staff.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Cambridge, MA"
    },
    {
      title: "University Heights Tower",
      description: "Luxury high-rise apartment building near UCLA campus. Featuring rooftop terrace, co-working spaces, and shuttle service to campus. Fully furnished units available for international students.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Westwood, Los Angeles, CA"
    }
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="outline">All</Button>
        </div>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-sm text-blue-600 font-medium mb-2">{project.location}</p>
                <p className="text-gray-600 mt-4">
                  {project.description}
                </p>
                <Button className="mt-4" variant="outline">
                  Learn More
                </Button>
              </div>
              <div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 