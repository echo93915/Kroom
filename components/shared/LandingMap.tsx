"use client";

import { useEffect, useState } from "react";
import { LocateFixed } from "lucide-react";
import Map from "./Map";

const LandingMap = () => {
  const [location, setLocation] = useState({ lat: 39.8283, lng: -98.5795, zoom: 4 });
  const [locating, setLocating] = useState(false);

  const geoOptions = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 13 }),
      () => {},
      geoOptions
    );
  }, []);

  const goToCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 15 });
        setLocating(false);
      },
      () => setLocating(false),
      geoOptions
    );
  };

  return (
    <div className="relative w-[500px] h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <Map lat={location.lat} lng={location.lng} zoom={location.zoom} height="500px" />
      <button
        onClick={goToCurrentLocation}
        className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white text-sm font-medium text-gray-700 px-3 py-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <LocateFixed className={`w-4 h-4 ${locating ? "animate-pulse text-blue-500" : "text-gray-600"}`} />
        Current location
      </button>
    </div>
  );
};

export default LandingMap;
