"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Calendar,
  Users,
  Bed,
  Bath,
  Square,
  Wifi,
  Car,
  Utensils,
  Tv,
  Snowflake,
  WashingMachine,
  Shield,
  Home,
  GraduationCap,
  Train,
  Globe
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

const ui = {
  ko: {
    loading: "매물 정보를 불러오는 중...",
    notFound: "매물을 찾을 수 없습니다",
    notFoundDesc: "요청하신 매물이 존재하지 않습니다.",
    backToSearch: "검색으로 돌아가기",
    amenities: "편의시설",
    studentFeatures: "유학생 편의 특징",
    hoaFees: "HOA 비용",
    propertyTax: "재산세",
    utilitiesAvg: "공과금 (평균)",
    parking: "주차",
    monthlyCosts: "월 예상 비용",
    monthlyRent: "월세",
    securityDeposit: "보증금",
    totalMonthly: "월 총 비용",
    listingInfo: "매물 정보",
    availability: "입주 가능일",
    minimumStay: "최소 거주 기간",
    university: "대학교",
    walkingDistance: "도보 거리",
    walkTime: "도보 시간",
    contactAgent: "에이전트 연락하기",
    contact: "연락하기",
    languages: "언어:",
    preferred: "선호 연락방법:",
    requestInfo: "정보 요청",
    sendMessage: "메시지 보내기",
    call: "전화",
    email: "이메일",
    contactInfo: "연락처 정보",
    noContactInfo: "이 매물의 연락처 정보가 없습니다.",
    bed: "침실",
    bath: "욕실",
    sqft: "sq ft",
    maxOccupants: (n: number) => `최대 ${n}명`,
    amenityLabels: {
      wifiincluded: "와이파이 포함",
      parkingavailable: "주차 가능",
      fullkitchen: "주방 완비",
      "tv/cable": "TV/케이블",
      airconditioning: "에어컨",
      laundry: "세탁기",
      "24/7security": "24시간 보안",
      fullyfurnished: "풀 옵션",
      wifi: "와이파이 포함",
      parking: "주차 가능",
      kitchen: "주방 완비",
      tv: "TV/케이블",
      aircon: "에어컨",
      washing: "세탁기",
      security: "24시간 보안",
      furnished: "풀 옵션",
    },
    studentFeatureLabels: {
      nearuniversity: "대학교 근처",
      publictransitaccess: "대중교통 이용 가능",
      internationalstudentfriendly: "외국인 학생 친화적",
      koreanspeakingsupport: "한국어 지원",
      quietstudyarea: "조용한 학습 공간",
      nearUniversity: "대학교 근처",
      publicTransport: "대중교통 이용 가능",
      internationalFriendly: "외국인 학생 친화적",
      koreanSupport: "한국어 지원",
      studyRoom: "학습 공간",
    },
  },
  en: {
    loading: "Loading property details...",
    notFound: "Property Not Found",
    notFoundDesc: "The property you're looking for doesn't exist.",
    backToSearch: "Back to Search",
    amenities: "Amenities",
    studentFeatures: "Student-Friendly Features",
    hoaFees: "HOA Fees",
    propertyTax: "Property Tax",
    utilitiesAvg: "Utilities (avg)",
    parking: "Parking",
    monthlyCosts: "Monthly Costs",
    monthlyRent: "Monthly Rent",
    securityDeposit: "Security Deposit",
    totalMonthly: "Total Monthly",
    listingInfo: "Listing Info",
    availability: "Availability",
    minimumStay: "Minimum Stay",
    university: "University",
    walkingDistance: "Walking Distance",
    walkTime: "Walk Time",
    contactAgent: "Contact Agent",
    contact: "Contact",
    languages: "Languages:",
    preferred: "Preferred:",
    requestInfo: "Request Info",
    sendMessage: "Send Message",
    call: "Call",
    email: "Email",
    contactInfo: "Contact Information",
    noContactInfo: "Contact information not available for this property.",
    bed: "bed",
    bath: "bath",
    sqft: "sqft",
    maxOccupants: (n: number) => `Max ${n} occupant${n !== 1 ? "s" : ""}`,
    amenityLabels: {
      wifiincluded: "WiFi Included",
      parkingavailable: "Parking Available",
      fullkitchen: "Full Kitchen",
      "tv/cable": "TV/Cable",
      airconditioning: "Air Conditioning",
      laundry: "Laundry",
      "24/7security": "24/7 Security",
      fullyfurnished: "Fully Furnished",
      wifi: "WiFi Included",
      parking: "Parking Available",
      kitchen: "Full Kitchen",
      tv: "TV/Cable",
      aircon: "Air Conditioning",
      washing: "Laundry",
      security: "24/7 Security",
      furnished: "Fully Furnished",
    },
    studentFeatureLabels: {
      nearuniversity: "Near University",
      publictransitaccess: "Public Transit Access",
      internationalstudentfriendly: "International Student Friendly",
      koreanspeakingsupport: "Korean Speaking Support",
      quietstudyarea: "Quiet Study Area",
      nearUniversity: "Near University",
      publicTransport: "Public Transit Access",
      internationalFriendly: "International Student Friendly",
      koreanSupport: "Korean Speaking Support",
      studyRoom: "Study Room",
    },
  },
};

const amenityIcons = {
  wifiincluded: Wifi,
  parkingavailable: Car,
  fullkitchen: Utensils,
  "tv/cable": Tv,
  airconditioning: Snowflake,
  laundry: WashingMachine,
  "24/7security": Shield,
  fullyfurnished: Home,
  wifi: Wifi,
  parking: Car,
  kitchen: Utensils,
  tv: Tv,
  aircon: Snowflake,
  washing: WashingMachine,
  security: Shield,
  furnished: Home,
};

const studentFeatureIcons = {
  nearuniversity: GraduationCap,
  publictransitaccess: Train,
  internationalstudentfriendly: Globe,
  koreanspeakingsupport: MessageSquare,
  quietstudyarea: Home,
  nearUniversity: GraduationCap,
  publicTransport: Train,
  internationalFriendly: Globe,
  koreanSupport: MessageSquare,
  studyRoom: Home,
};

// Fetch property data from database
const fetchPropertyById = async (id: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("properties")
      .select(`
        *,
        images:property_images(id, image_url, alt_text, display_order, is_primary),
        amenities:property_amenities(amenity:amenities(id, name, icon, category)),
        contacts:property_contacts(id, name, phone, email, languages, preferred_contact_method, is_primary),
        universities:property_universities(
          id, distance_miles, walk_time_minutes, transit_time_minutes, transportation_methods,
          university:universities(id, name, short_name, city, state)
        )
      `)
      .eq("id", id)
      .eq("status", "active")
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      price:
        data.listing_type === "sale"
          ? `$${(data.sale_price_cents ? data.sale_price_cents / 100 : 0).toLocaleString()}`
          : `$${(data.monthly_rent_cents ? data.monthly_rent_cents / 100 : 0).toLocaleString()}/month`,
      location: `${data.city}, ${data.state}`,
      fullAddress: data.address,
      date: data.available_from
        ? `Available ${new Date(data.available_from).toLocaleDateString()}`
        : "Available Now",
      beds: data.beds || 0,
      baths: data.baths || 0,
      area: data.area_sqft || 0,
      listingType: data.listing_type,
      images: (data.images || [])
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((img: any) => img.image_url),
      description: data.description,
      amenities: (data.amenities || [])
        .filter((a: any) => a.amenity && a.amenity.name && a.amenity.category !== "student-specific")
        .map((a: any) => a.amenity.name.toLowerCase().replace(/\s+/g, "")),
      studentFeatures: (data.amenities || [])
        .filter((a: any) => a.amenity && a.amenity.name && a.amenity.category === "student-specific")
        .map((a: any) => a.amenity.name.toLowerCase().replace(/\s+/g, "")),
      pricing: {
        monthlyRent: data.monthly_rent_cents ? data.monthly_rent_cents / 100 : 0,
        deposit: data.deposit_cents ? data.deposit_cents / 100 : 0,
        utilities: data.utilities_cents ? data.utilities_cents / 100 : 0,
        parking: data.parking_cents ? data.parking_cents / 100 : 0,
      },
      availability: {
        availableFrom: data.available_from,
        minimumStay: `${data.minimum_stay_months || 12} months`,
        maximumOccupants: data.maximum_occupants || 1,
      },
      contact:
        data.contacts && data.contacts.length > 0
          ? {
              name: data.contacts[0].name,
              phone: data.contacts[0].phone,
              email: data.contacts[0].email,
              languages: data.contacts[0].languages || [],
              preferredContact: data.contacts[0].preferred_contact_method,
            }
          : null,
      university:
        data.universities && data.universities.length > 0 && data.universities[0].university
          ? {
              name: data.universities[0].university.name,
              distance: `${data.universities[0].distance_miles} miles`,
              walkTime: `${data.universities[0].walk_time_minutes} minutes`,
              transitTime: `${data.universities[0].transit_time_minutes} minutes`,
            }
          : null,
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const t = ui[language];

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPropertyById(params.id as string);
        if (data) {
          setProperty(data);
        } else {
          setError("Property not found");
        }
      } catch {
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.notFound}</h1>
          <p className="text-gray-600 mb-6">{error || t.notFoundDesc}</p>
          <Button onClick={() => router.push("/search")}>{t.backToSearch}</Button>
        </div>
      </div>
    );
  }

  const handleSaveToggle = () => setIsSaved(!isSaved);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: property.title, text: property.title, url: window.location.href });
    }
  };

  const handleContact = (method: string) => {
    if (method === "phone") window.open(`tel:${property.contact.phone}`);
    else if (method === "email") window.open(`mailto:${property.contact.email}?subject=Inquiry about ${property.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.backToSearch}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveToggle}
              className={isSaved ? "text-red-500" : "text-gray-500"}
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative aspect-square group">
                <img src={property.images[currentImageIndex]} alt={property.title} className="w-full h-full object-cover" />
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {property.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto p-4">
                <div className="flex gap-2 min-w-max">
                  {property.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                        index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                {property.fullAddress}
              </div>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-500" />
                  <span>{property.beds} {t.bed}{language === "en" && property.beds !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-500" />
                  <span>{property.baths} {t.bath}{language === "en" && property.baths !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-gray-500" />
                  <span>{property.area} {t.sqft}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{t.maxOccupants(property.availability.maximumOccupants)}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{t.amenities}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.amenities.map((amenity: string) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                  const label = t.amenityLabels[amenity as keyof typeof t.amenityLabels] || amenity;
                  if (!Icon) return null;
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Features */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{t.studentFeatures}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.studentFeatures.map((feature: string) => {
                  const Icon = studentFeatureIcons[feature as keyof typeof studentFeatureIcons];
                  const label = t.studentFeatureLabels[feature as keyof typeof t.studentFeatureLabels] || feature;
                  if (!Icon) return null;
                  return (
                    <div key={feature} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="text-sm">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{property.price}</h2>

              <div className="space-y-3 mb-6">
                {property.listingType === "sale" ? (
                  <>
                    {property.pricing.hoa && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.hoaFees}</span>
                        <span className="font-medium">${property.pricing.hoa}/month</span>
                      </div>
                    )}
                    {property.pricing.propertyTax && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.propertyTax}</span>
                        <span className="font-medium">${property.pricing.propertyTax}/month</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.utilitiesAvg}</span>
                      <span className="font-medium">${property.pricing.utilities}/month</span>
                    </div>
                    {property.pricing.parking > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.parking}</span>
                        <span className="font-medium">${property.pricing.parking}/month</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>{t.monthlyCosts}</span>
                      <span>
                        ${((property.pricing.hoa || 0) + (property.pricing.propertyTax || 0) + property.pricing.utilities + (property.pricing.parking || 0)).toLocaleString()}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.monthlyRent}</span>
                      <span className="font-medium">${property.pricing.monthlyRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.securityDeposit}</span>
                      <span className="font-medium">${property.pricing.deposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.utilitiesAvg}</span>
                      <span className="font-medium">${property.pricing.utilities}</span>
                    </div>
                    {property.pricing.parking > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.parking}</span>
                        <span className="font-medium">${property.pricing.parking}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>{t.totalMonthly}</span>
                      <span>
                        ${(property.pricing.monthlyRent + property.pricing.utilities + (property.pricing.parking || 0)).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">
                  {property.listingType === "sale" ? t.listingInfo : t.availability}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{property.date}</span>
                  </div>
                  {property.listingType !== "sale" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.minimumStay}</span>
                      <span>{property.availability.minimumStay}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* University Info */}
              {property.university && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">{t.university}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>{property.university.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.walkingDistance}</span>
                      <span>{property.university.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.walkTime}</span>
                      <span>{property.university.walkTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact */}
              {property.contact ? (
                <div className="space-y-3">
                  <h3 className="font-semibold">
                    {property.listingType === "sale" ? t.contactAgent : t.contact} â€” {property.contact.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t.languages} {property.contact.languages.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t.preferred} {property.contact.preferredContact}
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => handleContact("message")}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {property.listingType === "sale" ? t.requestInfo : t.sendMessage}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" onClick={() => handleContact("phone")}>
                        <Phone className="w-4 h-4 mr-2" />
                        {t.call}
                      </Button>
                      <Button variant="outline" onClick={() => handleContact("email")}>
                        <Mail className="w-4 h-4 mr-2" />
                        {t.email}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold">{t.contactInfo}</h3>
                  <p className="text-sm text-gray-600">{t.noContactInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}