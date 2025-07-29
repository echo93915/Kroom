import { Bed, Bath, Car, Square, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Tag = "NEW" | "SALE" | "RECOMMENDED";

interface PropertyCardProps {
  id: string; // Add unique identifier
  image: string;
  price: string;
  title: string;
  location: string;
  date: string;
  beds: number;
  baths: number;
  area: number;
  tag?: Tag;
  onClick?: (id: string) => void; // Optional click handler
  onHeartClick?: (id: string) => void; // Optional heart click handler
}

const tagStyles: { [key in Tag]: string } = {
  NEW: "bg-blue-500 text-white",
  SALE: "bg-red-500 text-white",
  RECOMMENDED: "bg-green-500 text-white",
};

const PropertyCard = ({
  id,
  image,
  price,
  title,
  location,
  date,
  beds,
  baths,
  area,
  tag,
  onClick,
  onHeartClick,
}: PropertyCardProps) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when heart is clicked
    if (onHeartClick) {
      onHeartClick(id);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {tag && (
          <div
            className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${tagStyles[tag]}`}
          >
            {tag}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 rounded-full hover:bg-white/90"
          onClick={handleHeartClick}
        >
          <Heart className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors" />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold">{price}</h3>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-500 text-sm mt-2">{date}</p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex items-center gap-1">
            <Bed className="h-5 w-5 text-gray-500" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-5 w-5 text-gray-500" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-5 w-5 text-gray-500" />
            <span>{area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 