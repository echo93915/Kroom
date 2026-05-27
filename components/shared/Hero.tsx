"use client";

import { Input } from "@/components/ui/input";
import { Search, Home, Users, Key } from "lucide-react";
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
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { translations } from "@/lib/i18n/translations";

// Import Google Fonts
import { Montserrat } from "next/font/google";
import { Black_Han_Sans } from "next/font/google";
import kroomBanner from "@/assets/kroom-banner.png";

const montserrat = Montserrat({
  weight: ['700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Hero = () => {
  const router = useRouter();
  const [listingType, setListingType] = useState<string>("all");
  const { language } = useLanguage();
  const t = translations[language].hero;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // Restrict to English-speaking countries and set language to English
      componentRestrictions: { country: ["us", "ca", "gb", "au"] },
      language: "en",
      region: "us"
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
        backgroundImage: `url(${kroomBanner.src})`,
        backgroundPosition: "center 30%",
      }}
    >
      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />

              <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 flex flex-col justify-center h-full pt-16">
                  <h1 className={`text-6xl font-bold text-left text-white mb-4 ${language === 'ko' ? blackHanSans.className : montserrat.className} leading-tight drop-shadow-sm`}>
            <div>{t.heading1}</div>
            <div><span className="text-blue-400">Kroom</span></div>
          </h1>
          <div className="mt-2 relative w-[600px]">
          <div className="flex items-stretch h-16 shadow-lg rounded-lg overflow-hidden border border-gray-200" style={{ minHeight: '64px' }}>
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
                      {t.allListings}
                    </div>
                  </SelectItem>
                  <SelectItem value="rental">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      {t.rental}
                    </div>
                  </SelectItem>
                  <SelectItem value="sale">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      {t.sale}
                    </div>
                  </SelectItem>
                  <SelectItem value="roomshare">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t.findRoommate}
                    </div>
                  </SelectItem>
                  <SelectItem value="sublet">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      {t.sublet}
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
                placeholder={t.searchPlaceholder}
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