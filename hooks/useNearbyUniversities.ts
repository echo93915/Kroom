"use client";

import { useState, useEffect } from "react";
import { nearbyUniversities, type UniversityPin } from "@/lib/data/universities";

export function useNearbyUniversities() {
  const [universities, setUniversities] = useState<UniversityPin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) { setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUniversities(nearbyUniversities(pos.coords.latitude, pos.coords.longitude));
        setLoading(false);
      },
      () => setLoading(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { universities, loading };
}
