"use client";

import PropertyCard from "./PropertyCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const FeaturedSales = ({ city }: { city?: string | null }) => {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language].featuredSales;
  const title = city
    ? language === "ko" ? `${city} 근처 매매` : `Sales near ${city}`
    : t.title;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            images:property_images(image_url, display_order, is_primary)
          `)
          .eq('status', 'active')
          .eq('listing_type', 'sale')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;

        const transformed = (data || []).map((row: any) => {
          const primary = row.images?.find((img: any) => img.is_primary);
          const first = row.images?.[0];
          return {
            id: row.id,
            image: primary?.image_url || first?.image_url || '/placeholder-property.jpg',
            price: row.sale_price_cents
              ? `$${(row.sale_price_cents / 100).toLocaleString()}`
              : 'Price on request',
            title: row.title,
            location: `${row.city}, ${row.state}`,
            date: row.available_from
              ? `Available ${new Date(row.available_from).toLocaleDateString()}`
              : 'Available Now',
            beds: row.beds || 0,
            baths: row.baths || 0,
            area: row.area_sqft || 0,
            tag: row.tag_label,
          };
        });
        setProperties(transformed);
      } catch (err) {
        console.error('Failed to fetch featured sales:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Button variant="outline" onClick={() => router.push("/search")}>{t.viewAll}</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Button variant="outline" onClick={() => router.push("/search")}>{t.viewAll}</Button>
          </div>
          <p className="text-gray-400 text-sm py-8 text-center">
            {language === 'ko' ? '등록된 매매 매물이 없습니다.' : 'No sale listings yet.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button variant="outline" onClick={() => router.push("/search")}>{t.viewAll}</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
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

export default FeaturedSales;
