"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
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
import Image from "next/image";

// Mock property data - in real app, this would come from API/database
const getPropertyById = (id: string) => {
  const properties = {
    "rental-ucla-studio-001": {
      id: "rental-ucla-studio-001",
      title: "Modern Studio Apartment",
      price: "$2,500/month",
      location: "Near USC Campus, Los Angeles, CA",
      fullAddress: "123 University Ave, Los Angeles, CA 90007",
      date: "Available December 2024",
      beds: 1,
      baths: 1,
      area: 550,
      listingType: "rental",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Beautiful modern studio apartment perfect for international students. Located just 2 blocks from USC campus with easy access to public transportation. The unit features high-end finishes, in-unit laundry, and a fully equipped kitchen. Building amenities include 24/7 security, fitness center, and study lounges.",
      amenities: ["wifi", "parking", "kitchen", "tv", "aircon", "washing", "security", "furnished"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly", "koreanSupport"],
      pricing: {
        monthlyRent: 2500,
        deposit: 2500,
        utilities: 150,
        parking: 100
      },
      availability: {
        availableFrom: "2024-12-01",
        minimumStay: "12 months",
        maximumOccupants: 1
      },
      contact: {
        name: "Sarah Kim",
        phone: "(323) 555-0123",
        email: "sarah.kim@example.com",
        languages: ["English", "Korean"],
        preferredContact: "Text/KakaoTalk"
      },
      university: {
        name: "USC",
        distance: "2 blocks",
        walkTime: "5 minutes",
        transitTime: "N/A"
      }
    },
    // Add more mock properties as needed
  };
  
  return properties[id as keyof typeof properties] || null;
};

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  kitchen: Utensils,
  tv: Tv,
  aircon: Snowflake,
  washing: WashingMachine,
  security: Shield,
  furnished: Home
};

const amenityLabels = {
  wifi: "WiFi Included",
  parking: "Parking Available",
  kitchen: "Full Kitchen",
  tv: "TV/Cable",
  aircon: "Air Conditioning",
  washing: "Laundry",
  security: "24/7 Security",
  furnished: "Fully Furnished"
};

const studentFeatureIcons = {
  nearUniversity: GraduationCap,
  publicTransport: Train,
  internationalFriendly: Globe,
  koreanSupport: MessageSquare
};

const studentFeatureLabels = {
  nearUniversity: "Near University",
  publicTransport: "Public Transit Access",
  internationalFriendly: "International Student Friendly",
  koreanSupport: "Korean Speaking Support"
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const propertyData = getPropertyById(params.id as string);
    if (propertyData) {
      setProperty(propertyData);
    }
  }, [params.id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/search")}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    // In real app, this would save to user's favorites
  };

  const handleShare = () => {
    // In real app, this would open share dialog
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.listingType} listing: ${property.title}`,
        url: window.location.href,
      });
    }
  };

  const handleContact = (method: string) => {
    switch (method) {
      case 'phone':
        window.open(`tel:${property.contact.phone}`);
        break;
      case 'email':
        window.open(`mailto:${property.contact.email}?subject=Inquiry about ${property.title}`);
        break;
      case 'message':
        // In real app, this would open messaging interface
        alert("Messaging feature coming soon!");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
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
              <div className="relative h-96">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {property.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {property.images.slice(0, 4).map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
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
                  <span>{property.beds} bed{property.beds !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-500" />
                  <span>{property.baths} bath{property.baths !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-gray-500" />
                  <span>{property.area} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>Max {property.availability.maximumOccupants} occupant{property.availability.maximumOccupants !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.amenities.map((amenity: string) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm">{amenityLabels[amenity as keyof typeof amenityLabels]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Features */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Student-Friendly Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.studentFeatures.map((feature: string) => {
                  const Icon = studentFeatureIcons[feature as keyof typeof studentFeatureIcons];
                  return (
                    <div key={feature} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="text-sm">{studentFeatureLabels[feature as keyof typeof studentFeatureLabels]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{property.price}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-medium">${property.pricing.monthlyRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit</span>
                  <span className="font-medium">${property.pricing.deposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Utilities (avg)</span>
                  <span className="font-medium">${property.pricing.utilities}</span>
                </div>
                {property.pricing.parking && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parking</span>
                    <span className="font-medium">${property.pricing.parking}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Monthly</span>
                  <span>${(property.pricing.monthlyRent + property.pricing.utilities + (property.pricing.parking || 0)).toLocaleString()}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Availability</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{property.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Stay</span>
                    <span>{property.availability.minimumStay}</span>
                  </div>
                </div>
              </div>

              {/* University Info */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">University</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>{property.university.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Walking Distance</span>
                    <span>{property.university.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Walk Time</span>
                    <span>{property.university.walkTime}</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <h3 className="font-semibold">Contact {property.contact.name}</h3>
                <p className="text-sm text-gray-600">
                  Languages: {property.contact.languages.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Preferred: {property.contact.preferredContact}
                </p>
                
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => handleContact('message')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleContact('phone')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleContact('email')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 