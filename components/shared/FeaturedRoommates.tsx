"use client";

import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { propertyNearSelectedUnis } from "@/lib/data/universities";
import type { UniFilterProps } from "./FeaturedSections";

const FeaturedRoommates = ({ city, uniFilter }: { city?: string | null; uniFilter?: UniFilterProps }) => {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language].featuredRoommates;
  const title = city
    ? language === "ko" ? `${city} 근처 룸메이트 찾기` : `Find Roommates near ${city}`
    : t.title;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("properties")
          .select(`*, images:property_images(id, image_url, alt_text, display_order, is_primary)`)
          .eq("status", "active")
          .eq("listing_type", "roomshare")
          .order("created_at", { ascending: false })
          .limit(8);

        if (error) throw error;

        setProperties((data || []).map((row: any) => {
          const primary = row.images?.find((img: any) => img.is_primary);
          const first = row.images?.[0];
          return {
            id: row.id,
            lat: row.latitude ? parseFloat(row.latitude) : null,
            lng: row.longitude ? parseFloat(row.longitude) : null,
            image: primary?.image_url || first?.image_url || "/placeholder-property.jpg",
            price: row.monthly_rent_cents
              ? `$${(row.monthly_rent_cents / 100).toLocaleString()}/month`
              : "Contact for price",
            title: row.title,
            location: `${row.address}, ${row.city}, ${row.state}`,
            date: row.available_from
              ? `Available ${new Date(row.available_from).toLocaleDateString()}`
              : "Available Now",
            beds: row.beds || 0,
            baths: row.baths || 0,
            area: row.area_sqft || 0,
            tag: row.tag_label,
          };
        }));
      } catch (err) {
        console.error("Failed to fetch featured roommates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const visible = uniFilter
    ? properties.filter((p) =>
        propertyNearSelectedUnis(p.lat, p.lng, uniFilter.selectedUniversities, uniFilter.nearbyList)
      )
    : properties;

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Button variant="outline" onClick={() => router.push("/search?type=roomshare")}>{t.viewAll}</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (visible.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button variant="outline" onClick={() => router.push("/search?type=roomshare")}>{t.viewAll}</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visible.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.image}
              price={property.price}
              title={property.title}
              location={property.location}
              date={property.date}
              beds={property.beds}
              baths={property.baths}
              area={property.area}
              tag={property.tag}
              onClick={(id) => router.push(`/property/${id}`)}
              onHeartClick={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoommates;
