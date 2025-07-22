"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Home, 
  Camera, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Wifi, 
  Car, 
  Utensils,
  Tv,
  Snowflake,
  WashingMachine,
  Shield,
  Phone,
  Mail,
  MessageSquare,
  Upload,
  Plus,
  X,
  GraduationCap,
  Train,
  Clock,
  Users,
  Globe,
  Key
} from "lucide-react";

export default function AdvertisePage() {
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [propertyPhotos, setPropertyPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    propertyType: "",
    rooms: "",
    bathrooms: "",
    size: "",
    floor: "",
    totalFloors: "",
    monthlyRent: "",
    deposit: "",
    maintenanceFee: "",
    availableFrom: "",
    minimumStay: "",
    maximumOccupants: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    preferredContact: "",
    languageSupport: ""
  });

  const [amenities, setAmenities] = useState({
    wifi: false,
    parking: false,
    kitchen: false,
    tv: false,
    aircon: false,
    washing: false,
    security: false,
    furnished: false
  });

  const [studentFeatures, setStudentFeatures] = useState({
    nearUniversity: false,
    publicTransport: false,
    studyRoom: false,
    internationalFriendly: false,
    koreanSupport: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setAmenities(prev => ({ ...prev, [amenity]: checked }));
  };

  const handleStudentFeatureChange = (feature: string, checked: boolean) => {
    setStudentFeatures(prev => ({ ...prev, [feature]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", { formData, amenities, studentFeatures });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Listing</h1>
            <p className="text-gray-600">Connect with international students looking for housing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Listing Type Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Listing Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: "rental", label: "Rental", icon: Home },
                  { value: "sale", label: "Sale", icon: Home },
                  { value: "roomshare", label: "Find Roommates", icon: Users },
                  { value: "sublease", label: "Sublease", icon: Key }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setListingType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      listingType === type.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Property Photos */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Property Photos
              </h2>
              <p className="text-sm text-gray-600">Upload up to 8 high-quality photos of your property</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="relative">
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      {propertyPhotos[index] ? (
                        <>
                          <img
                            src={propertyPhotos[index]}
                            alt={`Property ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full">
                          <Plus className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Add Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Listing Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                                      placeholder="e.g., Cozy Studio Near UCLA Campus"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                                      placeholder="Describe your property, neighborhood, and what makes it special for international students in the US..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                                      placeholder="e.g., 123 Main St, Los Angeles, CA 90210"
                />
              </div>
            </div>

            <Separator />

            {/* Property Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio Apartment</SelectItem>
                      <SelectItem value="1br">1 Bedroom Apartment</SelectItem>
                      <SelectItem value="2br">2 Bedroom Apartment</SelectItem>
                      <SelectItem value="3br">3 Bedroom Apartment</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rooms">Rooms</Label>
                  <Select value={formData.rooms} onValueChange={(value) => handleInputChange("rooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Room</SelectItem>
                      <SelectItem value="2">2 Rooms</SelectItem>
                      <SelectItem value="3">3 Rooms</SelectItem>
                      <SelectItem value="4">4+ Rooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size (sq ft)</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    placeholder="e.g., 600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    value={formData.floor}
                    onChange={(e) => handleInputChange("floor", e.target.value)}
                    placeholder="e.g., 3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalFloors">Total Floors</Label>
                  <Input
                    id="totalFloors"
                    value={formData.totalFloors}
                    onChange={(e) => handleInputChange("totalFloors", e.target.value)}
                    placeholder="e.g., 5"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
                  <Input
                    id="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                    placeholder="e.g., 1,200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Deposit ($)</Label>
                  <Input
                    id="deposit"
                    value={formData.deposit}
                    onChange={(e) => handleInputChange("deposit", e.target.value)}
                    placeholder="e.g., 2,500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenanceFee">Maintenance Fee ($)</Label>
                  <Input
                    id="maintenanceFee"
                    value={formData.maintenanceFee}
                    onChange={(e) => handleInputChange("maintenanceFee", e.target.value)}
                    placeholder="e.g., 150"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Availability */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Availability
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumStay">Minimum Stay</Label>
                  <Select value={formData.minimumStay} onValueChange={(value) => handleInputChange("minimumStay", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum stay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="2-months">2 Months</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="2-years">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maximumOccupants">Maximum Occupants</Label>
                  <Select value={formData.maximumOccupants} onValueChange={(value) => handleInputChange("maximumOccupants", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select max occupants" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "wifi", label: "WiFi", icon: Wifi },
                  { key: "parking", label: "Parking", icon: Car },
                  { key: "kitchen", label: "Kitchen", icon: Utensils },
                  { key: "tv", label: "TV", icon: Tv },
                  { key: "aircon", label: "Air Conditioning", icon: Snowflake },
                  { key: "washing", label: "Washing Machine", icon: WashingMachine },
                  { key: "security", label: "Security", icon: Shield },
                  { key: "furnished", label: "Furnished", icon: Home }
                ].map((amenity) => (
                  <label key={amenity.key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities[amenity.key as keyof typeof amenities]}
                      onChange={(e) => handleAmenityChange(amenity.key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <amenity.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Student-Friendly Features */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Student-Friendly Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "nearUniversity", label: "Near University/College", icon: GraduationCap },
                  { key: "publicTransport", label: "Public Transit Access", icon: Train },
                  { key: "studyRoom", label: "Quiet Study Area", icon: Clock },
                  { key: "internationalFriendly", label: "International Student Friendly", icon: Globe },
                  { key: "koreanSupport", label: "Korean Speaking Landlord", icon: MessageSquare }
                ].map((feature) => (
                  <label key={feature.key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={studentFeatures[feature.key as keyof typeof studentFeatures]}
                      onChange={(e) => handleStudentFeatureChange(feature.key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <feature.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                  <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange("preferredContact", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="text">Text Message</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="kakao">KakaoTalk</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="languageSupport">Language Support</Label>
                <Select value={formData.languageSupport} onValueChange={(value) => handleInputChange("languageSupport", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select languages you can communicate in" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="korean-only">Korean Only</SelectItem>
                    <SelectItem value="korean-english">Korean & English</SelectItem>
                    <SelectItem value="korean-chinese">Korean & Chinese</SelectItem>
                    <SelectItem value="korean-japanese">Korean & Japanese</SelectItem>
                    <SelectItem value="multilingual">Multiple Languages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button type="submit" className="px-12 py-3 text-lg">
                Publish Listing
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 