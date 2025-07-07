import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div
      className="relative h-[50vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold">Your dream house is here.</h1>
        <div className="mt-4 relative max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 h-12 text-black"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Hero; 