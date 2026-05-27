"use client";

import { GoogleMap } from "@react-google-maps/api";

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
}

const Map = ({ lat, lng, zoom = 12, height = "calc(100vh - 120px)" }: MapProps) => {
  const mapContainerStyle = {
    width: "100%",
    height,
  };

  const center = { lat, lng };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
    />
  );
};

export default Map; 