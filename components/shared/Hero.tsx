"use client";

import { Input } from "@/components/ui/input";
import { Search, Home, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Hero = () => {
  const router = useRouter();
  const [listingType, setListingType] = useState<string>("all");
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        const searchParams = new URLSearchParams({
          address: description,
          lat: lat.toString(),
          lng: lng.toString(),
          ...(listingType !== "all" && { type: listingType })
        });
        router.push(`/search?${searchParams.toString()}`);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="cursor-pointer p-2 hover:bg-gray-100"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div
      className="relative h-[50vh] bg-cover flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://sdmntpreastus.oaiusercontent.com/files/00000000-d9d0-61f9-87af-bf397d37fe0d/raw?se=2025-07-14T01%3A33%3A38Z&sp=r&sv=2024-08-04&sr=b&scid=553012f4-d20a-5291-b2d2-d0631ce43bd0&skoid=b0fd38cc-3d33-418f-920e-4798de4acdd1&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-14T00%3A16%3A42Z&ske=2025-07-15T00%3A16%3A42Z&sks=b&skv=2024-08-04&sig=GJt488MfKGcjYcuMb8Rpe%2Bet6iVba5q0zRy3z7Vtx3U%3D')",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-6 flex flex-col justify-center h-full">
        <h1 className="text-5xl font-bold text-left text-white mb-4">유학생들의 내 집 마련하기</h1>
        <div className="mt-4 relative">
          <div className="flex items-stretch h-12 shadow-lg rounded-lg overflow-hidden border border-gray-200" style={{ minHeight: '48px' }}>
            {/* Listing Type Dropdown */}
            <div className="w-48 flex items-stretch">
              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger className="!h-full w-full bg-white text-black border-0 rounded-none focus:ring-0 focus:ring-offset-0 hover:bg-gray-50 transition-colors flex items-center px-3 !py-0 [&>span]:truncate">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      All Listings
                    </div>
                  </SelectItem>
                  <SelectItem value="rental">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Rental (월세)
                    </div>
                  </SelectItem>
                  <SelectItem value="sale">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Sale (매매)
                    </div>
                  </SelectItem>
                  <SelectItem value="roomshare">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Room Share (룸메)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Separator Line */}
            <div className="w-px bg-gray-300 self-stretch"></div>
            
            {/* Search Input */}
            <div className="flex-1 relative flex items-stretch">
              <Input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Search location..."
                className="pl-10 pr-3 !py-0 !h-full w-full text-black bg-white border-0 rounded-none focus:ring-0 focus:ring-offset-0 hover:bg-gray-50 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
          </div>
          
          {/* Search Suggestions */}
          {status === "OK" && (
            <ul className="absolute top-full left-0 right-0 bg-white text-black rounded-b-lg shadow-lg text-left z-50 ml-48 border-t border-gray-200">
              {renderSuggestions()}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero; 