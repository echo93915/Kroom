import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, ListFilter, Map } from "lucide-react";

const FilterBar = () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="bg-green-100 text-green-600">
          Buy
        </Button>
        <Button variant="ghost">Rent</Button>
        <Button variant="ghost">Sell</Button>
        <Button
          variant="ghost"
          className="bg-green-100 text-green-600 rounded-full"
        >
          House <span className="ml-2 text-red-500">X</span>
        </Button>
        <FilterDropdown title="Rooms" />
        <FilterDropdown title="Price" />
        <FilterDropdown title="Keywords" />
        <FilterDropdown title="More" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline">
          <ListFilter className="mr-2 h-4 w-4" />
          Save Search
        </Button>
        <Button variant="ghost">
          <Map className="mr-2 h-4 w-4" />
          Show maps
        </Button>
      </div>
    </div>
  );
};

const FilterDropdown = ({ title }: { title: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {title} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
        <DropdownMenuItem>Option 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterBar; 