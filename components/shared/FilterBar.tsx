import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, ListFilter, Map } from "lucide-react";

type FilterType = "rental" | "roomshare" | "sublet" | "sale";

interface FilterBarProps {
  activeFilters: FilterType[];
  onFilterToggle: (filter: FilterType) => void;
}

const FilterBar = ({ activeFilters, onFilterToggle }: FilterBarProps) => {
  const filterButtons = [
    { value: "rental" as FilterType, label: "Rental" },
    { value: "roomshare" as FilterType, label: "Find Roommate" },
    { value: "sublet" as FilterType, label: "Sublease" },
    { value: "sale" as FilterType, label: "Sale" }
  ];

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        {filterButtons.map((filter) => (
          <Button
            key={filter.value}
            variant="ghost"
            className={
              activeFilters.includes(filter.value)
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-300"
                : "hover:bg-gray-100 border border-gray-200"
            }
            onClick={() => onFilterToggle(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
        <div className="w-px h-6 bg-gray-300 mx-2" />
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