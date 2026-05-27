"use client";

import { useState, useEffect } from "react";
import { nearestUniversity } from "@/lib/data/universities";

export function useNearestUniversity() {
  const [university, setUniversity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) { setLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const result = nearestUniversity(pos.coords.latitude, pos.coords.longitude);
        setUniversity(result?.name ?? null);
        setLoading(false);
      },
      () => setLoading(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { university, loading };
}
