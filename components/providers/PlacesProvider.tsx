"use client";

import { useLoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";

interface PlacesProviderProps {
  children: ReactNode;
}

const PlacesProvider = ({ children }: PlacesProviderProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) return null;

  return <>{children}</>;
};

export default PlacesProvider; 