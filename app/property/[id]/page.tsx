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
    // Featured Rentals
    "featured-rental-ucla-001": {
      id: "featured-rental-ucla-001",
      title: "Modern Studio Near UCLA",
      price: "$1,850/month",
      location: "Westwood, Los Angeles, CA",
      fullAddress: "456 Westwood Blvd, Los Angeles, CA 90024",
      date: "Available January 2025",
      beds: 1,
      baths: 1,
      area: 450,
      listingType: "rental",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Stunning modern studio apartment in the heart of Westwood, just steps from UCLA campus. This bright and airy unit features floor-to-ceiling windows, hardwood floors, and a modern kitchen with stainless steel appliances. Perfect for international students with easy access to campus, Westwood Village shopping, and public transportation.",
      amenities: ["wifi", "parking", "kitchen", "tv", "aircon", "washing", "security", "furnished"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly", "koreanSupport"],
      pricing: {
        monthlyRent: 1850,
        deposit: 1850,
        utilities: 120,
        parking: 80
      },
      availability: {
        availableFrom: "2025-01-01",
        minimumStay: "12 months",
        maximumOccupants: 1
      },
      contact: {
        name: "Jennifer Park",
        phone: "(310) 555-0124",
        email: "jennifer.park@example.com",
        languages: ["English", "Korean"],
        preferredContact: "Text/KakaoTalk"
      },
      university: {
        name: "UCLA",
        distance: "0.3 miles",
        walkTime: "6 minutes",
        transitTime: "N/A"
      }
    },

    "featured-rental-harvard-002": {
      id: "featured-rental-harvard-002",
      title: "Shared 2BR Apartment",
      price: "$2,400/month",
      location: "Cambridge, MA (Near Harvard)",
      fullAddress: "89 Brattle Street, Cambridge, MA 02138",
      date: "Available February 2025",
      beds: 2,
      baths: 1,
      area: 750,
      listingType: "rental",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Charming 2-bedroom apartment in historic Cambridge, perfect for sharing between international students. Located in a beautiful Victorian building with original details and modern amenities. Walking distance to Harvard Square, with excellent public transportation access to both Harvard and MIT.",
      amenities: ["wifi", "kitchen", "tv", "washing", "security", "furnished"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly"],
      pricing: {
        monthlyRent: 2400,
        deposit: 2400,
        utilities: 180,
        parking: 150
      },
      availability: {
        availableFrom: "2025-02-01",
        minimumStay: "12 months",
        maximumOccupants: 2
      },
      contact: {
        name: "Michael Chen",
        phone: "(617) 555-0198",
        email: "michael.chen@example.com",
        languages: ["English", "Chinese"],
        preferredContact: "Email"
      },
      university: {
        name: "Harvard University",
        distance: "0.5 miles",
        walkTime: "8 minutes",
        transitTime: "N/A"
      }
    },

    "featured-rental-usc-003": {
      id: "featured-rental-usc-003",
      title: "Cozy Studio Near USC",
      price: "$1,200/month",
      location: "University Park, Los Angeles, CA",
      fullAddress: "789 University Ave, Los Angeles, CA 90007",
      date: "Available Now",
      beds: 1,
      baths: 1,
      area: 380,
      listingType: "rental",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Affordable and cozy studio apartment perfect for USC students. Located in a secure building just 2 blocks from campus. Features include a Murphy bed to maximize space, modern kitchenette, and access to building amenities including study room and laundry facilities.",
      amenities: ["wifi", "kitchen", "tv", "aircon", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly", "koreanSupport"],
      pricing: {
        monthlyRent: 1200,
        deposit: 1200,
        utilities: 100,
        parking: 75
      },
      availability: {
        availableFrom: "2024-12-15",
        minimumStay: "9 months",
        maximumOccupants: 1
      },
      contact: {
        name: "Maria Rodriguez",
        phone: "(323) 555-0167",
        email: "maria.rodriguez@example.com",
        languages: ["English", "Spanish"],
        preferredContact: "Phone"
      },
      university: {
        name: "USC",
        distance: "2 blocks",
        walkTime: "4 minutes",
        transitTime: "N/A"
      }
    },

    "featured-rental-umich-004": {
      id: "featured-rental-umich-004",
      title: "Student Housing Complex",
      price: "$980/month",
      location: "Ann Arbor, MI (Near U of M)",
      fullAddress: "234 State Street, Ann Arbor, MI 48104",
      date: "Available August 2025",
      beds: 1,
      baths: 1,
      area: 520,
      listingType: "rental",
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Purpose-built student housing with all the amenities you need for successful university life. Features include study lounges, fitness center, community kitchen, and 24/7 support staff. Perfect for international students who want a complete college experience with built-in community.",
      amenities: ["wifi", "parking", "kitchen", "tv", "washing", "security", "furnished"],
      studentFeatures: ["nearUniversity", "publicTransport", "studyRoom", "internationalFriendly"],
      pricing: {
        monthlyRent: 980,
        deposit: 980,
        utilities: 80,
        parking: 60
      },
      availability: {
        availableFrom: "2025-08-15",
        minimumStay: "12 months",
        maximumOccupants: 1
      },
      contact: {
        name: "David Kim",
        phone: "(734) 555-0145",
        email: "david.kim@example.com",
        languages: ["English", "Korean"],
        preferredContact: "Text/Email"
      },
      university: {
        name: "University of Michigan",
        distance: "0.4 miles",
        walkTime: "7 minutes",
        transitTime: "3 minutes by bus"
      }
    },

    // Featured Sales
    "featured-sale-nyu-001": {
      id: "featured-sale-nyu-001",
      title: "Modern Condo Near NYU",
      price: "$425,000",
      location: "Greenwich Village, New York, NY",
      fullAddress: "123 MacDougal Street, New York, NY 10012",
      date: "Listed December 2024",
      beds: 1,
      baths: 1,
      area: 650,
      listingType: "sale",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Rare opportunity to own a modern 1-bedroom condo in the heart of Greenwich Village, just blocks from NYU campus. This recently renovated unit features an open-concept layout, modern kitchen with granite countertops, and a spa-like bathroom. Perfect investment property for students or young professionals.",
      amenities: ["wifi", "kitchen", "tv", "aircon", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly"],
      pricing: {
        monthlyRent: 0,
        deposit: 0,
        utilities: 200,
        parking: 0,
        hoa: 450,
        propertyTax: 650
      },
      availability: {
        availableFrom: "2024-12-01",
        minimumStay: "N/A",
        maximumOccupants: 2
      },
      contact: {
        name: "Rebecca Wang",
        phone: "(212) 555-0189",
        email: "rebecca.wang@example.com",
        languages: ["English", "Chinese"],
        preferredContact: "Email/Phone"
      },
      university: {
        name: "NYU",
        distance: "0.2 miles",
        walkTime: "3 minutes",
        transitTime: "N/A"
      }
    },

    "featured-sale-stanford-002": {
      id: "featured-sale-stanford-002",
      title: "2BR Townhouse",
      price: "$675,000",
      location: "Palo Alto, CA (Near Stanford)",
      fullAddress: "567 Forest Avenue, Palo Alto, CA 94301",
      date: "Listed November 2024",
      beds: 2,
      baths: 2,
      area: 1100,
      listingType: "sale",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Beautiful 2-bedroom townhouse in prestigious Palo Alto, perfect for Stanford students or tech professionals. Features include a private garden, updated kitchen, hardwood floors throughout, and a 2-car garage. Located in a quiet residential neighborhood with easy bike access to Stanford campus.",
      amenities: ["wifi", "parking", "kitchen", "tv", "aircon", "washing"],
      studentFeatures: ["nearUniversity", "publicTransport"],
      pricing: {
        monthlyRent: 0,
        deposit: 0,
        utilities: 250,
        parking: 0,
        hoa: 320,
        propertyTax: 850
      },
      availability: {
        availableFrom: "2024-11-01",
        minimumStay: "N/A",
        maximumOccupants: 4
      },
      contact: {
        name: "James Patterson",
        phone: "(650) 555-0176",
        email: "james.patterson@example.com",
        languages: ["English"],
        preferredContact: "Email"
      },
      university: {
        name: "Stanford University",
        distance: "1.2 miles",
        walkTime: "15 minutes",
        transitTime: "8 minutes by bike"
      }
    },

    "featured-sale-berkeley-003": {
      id: "featured-sale-berkeley-003",
      title: "Studio Loft Investment",
      price: "$380,000",
      location: "Berkeley, CA (Near UC Berkeley)",
      fullAddress: "890 Telegraph Avenue, Berkeley, CA 94705",
      date: "Listed October 2024",
      beds: 1,
      baths: 1,
      area: 480,
      listingType: "sale",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Unique studio loft in a converted warehouse building near UC Berkeley campus. High ceilings, exposed brick walls, and large windows create an inspiring living space. Perfect investment opportunity with strong rental demand from Berkeley students and young professionals.",
      amenities: ["wifi", "kitchen", "tv", "aircon", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly"],
      pricing: {
        monthlyRent: 0,
        deposit: 0,
        utilities: 150,
        parking: 0,
        hoa: 280,
        propertyTax: 420
      },
      availability: {
        availableFrom: "2024-10-01",
        minimumStay: "N/A",
        maximumOccupants: 2
      },
      contact: {
        name: "Lisa Chang",
        phone: "(510) 555-0134",
        email: "lisa.chang@example.com",
        languages: ["English", "Chinese", "Korean"],
        preferredContact: "Text/Email"
      },
      university: {
        name: "UC Berkeley",
        distance: "0.6 miles",
        walkTime: "12 minutes",
        transitTime: "5 minutes by bus"
      }
    },

    "featured-sale-seattle-004": {
      id: "featured-sale-seattle-004",
      title: "Modern 2BR Apartment",
      price: "$525,000",
      location: "Seattle, WA (Near UW)",
      fullAddress: "456 15th Avenue NE, Seattle, WA 98105",
      date: "Listed September 2024",
      beds: 2,
      baths: 1,
      area: 850,
      listingType: "sale",
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Contemporary 2-bedroom apartment in the vibrant University District of Seattle. Recently updated with modern finishes, in-unit laundry, and a private balcony with city views. Walking distance to University of Washington campus and surrounded by cafes, restaurants, and shops.",
      amenities: ["wifi", "kitchen", "tv", "aircon", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly"],
      pricing: {
        monthlyRent: 0,
        deposit: 0,
        utilities: 180,
        parking: 100,
        hoa: 380,
        propertyTax: 520
      },
      availability: {
        availableFrom: "2024-09-01",
        minimumStay: "N/A",
        maximumOccupants: 3
      },
      contact: {
        name: "Steven Kim",
        phone: "(206) 555-0156",
        email: "steven.kim@example.com",
        languages: ["English", "Korean"],
        preferredContact: "Phone/Text"
      },
      university: {
        name: "University of Washington",
        distance: "0.7 miles",
        walkTime: "14 minutes",
        transitTime: "6 minutes by bus"
      }
    },

    // Search Page Properties
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

    "rental-westwood-2br-002": {
      id: "rental-westwood-2br-002",
      title: "2BR Apartment Near University",
      price: "$3,200/month",
      location: "Westwood, Los Angeles, CA",
      fullAddress: "987 Westwood Blvd, Los Angeles, CA 90024",
      date: "Available January 2025",
      beds: 2,
      baths: 1,
      area: 800,
      listingType: "rental",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Spacious 2-bedroom apartment in prestigious Westwood, perfect for sharing. Walking distance to UCLA campus and Westwood Village. Features include hardwood floors, updated kitchen with granite countertops, and in-unit laundry. Building offers rooftop deck and study room.",
      amenities: ["wifi", "parking", "kitchen", "tv", "aircon", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "studyRoom", "internationalFriendly"],
      pricing: {
        monthlyRent: 3200,
        deposit: 3200,
        utilities: 200,
        parking: 150
      },
      availability: {
        availableFrom: "2025-01-01",
        minimumStay: "12 months",
        maximumOccupants: 2
      },
      contact: {
        name: "Amanda Lee",
        phone: "(310) 555-0145",
        email: "amanda.lee@example.com",
        languages: ["English", "Korean"],
        preferredContact: "Email"
      },
      university: {
        name: "UCLA",
        distance: "0.4 miles",
        walkTime: "8 minutes",
        transitTime: "N/A"
      }
    },

    "roommate-berkeley-house-003": {
      id: "roommate-berkeley-house-003",
      title: "Roommate Wanted - Shared House",
      price: "$800/month",
      location: "Berkeley, CA",
      fullAddress: "234 Channing Way, Berkeley, CA 94704",
      date: "Available Now",
      beds: 1,
      baths: 1,
      area: 300,
      listingType: "roomshare",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Looking for a friendly roommate to share a beautiful 3-bedroom house near UC Berkeley campus. Your private room comes furnished with a bed, desk, and closet. Shared spaces include a full kitchen, living room, and backyard. Current housemates are graduate students who value a quiet, study-friendly environment.",
      amenities: ["wifi", "kitchen", "tv", "washing", "furnished"],
      studentFeatures: ["nearUniversity", "publicTransport", "studyRoom", "internationalFriendly"],
      pricing: {
        monthlyRent: 800,
        deposit: 800,
        utilities: 80,
        parking: 0
      },
      availability: {
        availableFrom: "2024-12-01",
        minimumStay: "6 months",
        maximumOccupants: 1
      },
      contact: {
        name: "Alex Chen",
        phone: "(510) 555-0167",
        email: "alex.chen@example.com",
        languages: ["English", "Chinese"],
        preferredContact: "Text/Email"
      },
      university: {
        name: "UC Berkeley",
        distance: "0.5 miles",
        walkTime: "10 minutes",
        transitTime: "4 minutes by bike"
      }
    },

    "roommate-harvard-female-004": {
      id: "roommate-harvard-female-004",
      title: "Female Roommate Needed",
      price: "$1,100/month",
      location: "Harvard Square, Cambridge, MA",
      fullAddress: "56 Kirkland Street, Cambridge, MA 02138",
      date: "Available February 2025",
      beds: 1,
      baths: 1,
      area: 400,
      listingType: "roomshare",
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Seeking a female roommate for a charming 2-bedroom apartment in Harvard Square. Perfect for Harvard or MIT students. Your room is spacious with good natural light and comes partially furnished. The apartment features original hardwood floors, modern kitchen, and is steps away from Harvard campus and T-station.",
      amenities: ["wifi", "kitchen", "tv", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly"],
      pricing: {
        monthlyRent: 1100,
        deposit: 1100,
        utilities: 120,
        parking: 0
      },
      availability: {
        availableFrom: "2025-02-01",
        minimumStay: "8 months",
        maximumOccupants: 1
      },
      contact: {
        name: "Emily Parker",
        phone: "(617) 555-0189",
        email: "emily.parker@example.com",
        languages: ["English"],
        preferredContact: "Email/Phone"
      },
      university: {
        name: "Harvard University",
        distance: "0.3 miles",
        walkTime: "6 minutes",
        transitTime: "N/A"
      }
    },

    "sublet-stanford-summer-005": {
      id: "sublet-stanford-summer-005",
      title: "Summer Sublet - Furnished Studio",
      price: "$1,800/month",
      location: "Stanford Area, Palo Alto, CA",
      fullAddress: "345 Campus Drive, Palo Alto, CA 94305",
      date: "May - August 2025",
      beds: 1,
      baths: 1,
      area: 450,
      listingType: "sublet",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Perfect summer sublet for Stanford students or interns. Fully furnished studio apartment on campus with everything you need for a comfortable stay. Includes bed, desk, kitchenette, and high-speed internet. Building amenities include gym, study rooms, and bike storage. Ideal for summer research or internships.",
      amenities: ["wifi", "kitchen", "tv", "aircon", "washing", "security", "furnished"],
      studentFeatures: ["nearUniversity", "publicTransport", "studyRoom", "internationalFriendly"],
      pricing: {
        monthlyRent: 1800,
        deposit: 900,
        utilities: 100,
        parking: 80
      },
      availability: {
        availableFrom: "2025-05-01",
        minimumStay: "3 months",
        maximumOccupants: 1
      },
      contact: {
        name: "Kevin Zhang",
        phone: "(650) 555-0123",
        email: "kevin.zhang@example.com",
        languages: ["English", "Chinese"],
        preferredContact: "Text/Email"
      },
      university: {
        name: "Stanford University",
        distance: "On campus",
        walkTime: "5 minutes",
        transitTime: "N/A"
      }
    },

    "sublet-umich-spring-006": {
      id: "sublet-umich-spring-006",
      title: "Spring Semester Sublet",
      price: "$1,500/month",
      location: "Ann Arbor, MI",
      fullAddress: "678 South State Street, Ann Arbor, MI 48104",
      date: "January - May 2025",
      beds: 1,
      baths: 1,
      area: 600,
      listingType: "sublet",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Spring semester sublet in a popular student building near University of Michigan campus. The 1-bedroom apartment comes fully furnished and includes all utilities. Building features include fitness center, study lounges, and community events. Perfect for exchange students or those needing temporary housing.",
      amenities: ["wifi", "parking", "kitchen", "tv", "washing", "security", "furnished"],
      studentFeatures: ["nearUniversity", "publicTransport", "studyRoom", "internationalFriendly"],
      pricing: {
        monthlyRent: 1500,
        deposit: 750,
        utilities: 100,
        parking: 75
      },
      availability: {
        availableFrom: "2025-01-01",
        minimumStay: "4 months",
        maximumOccupants: 1
      },
      contact: {
        name: "Rachel Johnson",
        phone: "(734) 555-0198",
        email: "rachel.johnson@example.com",
        languages: ["English"],
        preferredContact: "Text/Email"
      },
      university: {
        name: "University of Michigan",
        distance: "0.6 miles",
        walkTime: "12 minutes",
        transitTime: "5 minutes by bus"
      }
    },

    "sale-seattle-condo-007": {
      id: "sale-seattle-condo-007",
      title: "2BR Condo for Sale",
      price: "$989,000",
      location: "Seattle, WA",
      fullAddress: "123 15th Avenue NE, Seattle, WA 98105",
      date: "Listed November 2024",
      beds: 2,
      baths: 2,
      area: 1100,
      listingType: "sale",
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Stunning 2-bedroom, 2-bathroom condo in the heart of the University District. Features floor-to-ceiling windows, modern kitchen with quartz countertops, and a private balcony with mountain views. Building amenities include concierge, fitness center, and rooftop terrace. Excellent investment opportunity near UW campus.",
      amenities: ["wifi", "parking", "kitchen", "tv", "aircon", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly"],
      pricing: {
        monthlyRent: 0,
        deposit: 0,
        utilities: 220,
        parking: 150,
        hoa: 520,
        propertyTax: 890
      },
      availability: {
        availableFrom: "2024-11-01",
        minimumStay: "N/A",
        maximumOccupants: 3
      },
      contact: {
        name: "Thomas Lee",
        phone: "(206) 555-0167",
        email: "thomas.lee@example.com",
        languages: ["English", "Korean"],
        preferredContact: "Email/Phone"
      },
      university: {
        name: "University of Washington",
        distance: "0.8 miles",
        walkTime: "16 minutes",
        transitTime: "7 minutes by bus"
      }
    },

    "sale-boston-townhouse-008": {
      id: "sale-boston-townhouse-008",
      title: "3BR Townhouse",
      price: "$1,250,000",
      location: "Boston, MA",
      fullAddress: "789 Commonwealth Avenue, Boston, MA 02215",
      date: "Listed October 2024",
      beds: 3,
      baths: 2,
      area: 1500,
      listingType: "sale",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Historic Victorian townhouse beautifully renovated while preserving original character. Features include 3 spacious bedrooms, 2 full bathrooms, modern kitchen, and private garden. Located on prestigious Commonwealth Avenue with easy access to Boston University, Emerson College, and public transportation.",
      amenities: ["wifi", "kitchen", "tv", "washing", "security"],
      studentFeatures: ["nearUniversity", "publicTransport", "internationalFriendly"],
      pricing: {
        monthlyRent: 0,
        deposit: 0,
        utilities: 300,
        parking: 0,
        hoa: 0,
        propertyTax: 1250
      },
      availability: {
        availableFrom: "2024-10-01",
        minimumStay: "N/A",
        maximumOccupants: 6
      },
      contact: {
        name: "Patricia Murphy",
        phone: "(617) 555-0134",
        email: "patricia.murphy@example.com",
        languages: ["English"],
        preferredContact: "Phone/Email"
      },
      university: {
        name: "Boston University",
        distance: "0.9 miles",
        walkTime: "18 minutes",
        transitTime: "8 minutes by T"
      }
    }
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
                {property.listingType === "sale" ? (
                  <>
                    {property.pricing.hoa && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">HOA Fees</span>
                        <span className="font-medium">${property.pricing.hoa}/month</span>
                      </div>
                    )}
                    {property.pricing.propertyTax && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Tax</span>
                        <span className="font-medium">${property.pricing.propertyTax}/month</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Utilities (avg)</span>
                      <span className="font-medium">${property.pricing.utilities}/month</span>
                    </div>
                    {property.pricing.parking && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Parking</span>
                        <span className="font-medium">${property.pricing.parking}/month</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Monthly Costs</span>
                      <span>${((property.pricing.hoa || 0) + (property.pricing.propertyTax || 0) + property.pricing.utilities + (property.pricing.parking || 0)).toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">{property.listingType === "sale" ? "Listing Info" : "Availability"}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{property.date}</span>
                  </div>
                  {property.listingType !== "sale" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Stay</span>
                      <span>{property.availability.minimumStay}</span>
                    </div>
                  )}
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
                <h3 className="font-semibold">
                  {property.listingType === "sale" ? "Contact Agent" : "Contact"} {property.contact.name}
                </h3>
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
                    {property.listingType === "sale" ? "Request Info" : "Send Message"}
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