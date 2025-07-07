import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-[#1EE4B7]">Kroom</h1>
        </Link>
        <nav className="hidden md:flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            For Sale
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            For Rent
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Daily Rental
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Projects
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="destructive">Advertise</Button>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header; 