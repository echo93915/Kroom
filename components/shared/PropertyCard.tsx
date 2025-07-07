import { Bed, Bath, Car, Square } from "lucide-react";

interface PropertyCardProps {
  image: string;
  price: string;
  title: string;
  location: string;
  date: string;
  beds: number;
  baths: number;
  area: number;
}

const PropertyCard = ({
  image,
  price,
  title,
  location,
  date,
  beds,
  baths,
  area,
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
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