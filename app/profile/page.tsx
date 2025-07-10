"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
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
import { User, Mail, Phone, MapPin, GraduationCap, MessageSquare, Camera } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// University data structure
const universities = [
  // Korean Universities
  { id: "snu", name: "Seoul National University", category: "🇰🇷 Korean Universities" },
  { id: "yonsei", name: "Yonsei University", category: "🇰🇷 Korean Universities" },
  { id: "korea", name: "Korea University", category: "🇰🇷 Korean Universities" },
  { id: "skku", name: "Sungkyunkwan University", category: "🇰🇷 Korean Universities" },
  { id: "hanyang", name: "Hanyang University", category: "🇰🇷 Korean Universities" },
  { id: "ewha", name: "Ewha Womans University", category: "🇰🇷 Korean Universities" },
  { id: "hongik", name: "Hongik University", category: "🇰🇷 Korean Universities" },
  { id: "kaist", name: "KAIST", category: "🇰🇷 Korean Universities" },
  
  // US Universities
  { id: "harvard", name: "Harvard University", category: "🇺🇸 United States" },
  { id: "mit", name: "MIT", category: "🇺🇸 United States" },
  { id: "stanford", name: "Stanford University", category: "🇺🇸 United States" },
  { id: "ucla", name: "UCLA", category: "🇺🇸 United States" },
  { id: "usc", name: "USC", category: "🇺🇸 United States" },
  { id: "nyu", name: "New York University", category: "🇺🇸 United States" },
  { id: "columbia", name: "Columbia University", category: "🇺🇸 United States" },
  { id: "berkeley", name: "UC Berkeley", category: "🇺🇸 United States" },
  { id: "upenn", name: "University of Pennsylvania", category: "🇺🇸 United States" },
  
  // UK Universities
  { id: "oxford", name: "University of Oxford", category: "🇬🇧 United Kingdom" },
  { id: "cambridge", name: "University of Cambridge", category: "🇬🇧 United Kingdom" },
  { id: "imperial", name: "Imperial College London", category: "🇬🇧 United Kingdom" },
  { id: "ucl", name: "University College London", category: "🇬🇧 United Kingdom" },
  { id: "lse", name: "London School of Economics", category: "🇬🇧 United Kingdom" },
  { id: "edinburgh", name: "University of Edinburgh", category: "🇬🇧 United Kingdom" },
  
  // Canada Universities
  { id: "uoft", name: "University of Toronto", category: "🇨🇦 Canada" },
  { id: "ubc", name: "University of British Columbia", category: "🇨🇦 Canada" },
  { id: "mcgill", name: "McGill University", category: "🇨🇦 Canada" },
  { id: "waterloo", name: "University of Waterloo", category: "🇨🇦 Canada" },
  
  // Australia Universities
  { id: "melbourne", name: "University of Melbourne", category: "🇦🇺 Australia" },
  { id: "sydney", name: "University of Sydney", category: "🇦🇺 Australia" },
  { id: "anu", name: "Australian National University", category: "🇦🇺 Australia" },
  { id: "unsw", name: "UNSW Sydney", category: "🇦🇺 Australia" },
  
  // Germany Universities
  { id: "tum", name: "Technical University of Munich", category: "🇩🇪 Germany" },
  { id: "heidelberg", name: "Heidelberg University", category: "🇩🇪 Germany" },
  { id: "humboldt", name: "Humboldt University Berlin", category: "🇩🇪 Germany" },
  
  // Japan Universities
  { id: "tokyo", name: "University of Tokyo", category: "🇯🇵 Japan" },
  { id: "kyoto", name: "Kyoto University", category: "🇯🇵 Japan" },
  { id: "waseda", name: "Waseda University", category: "🇯🇵 Japan" },
  
  // Other Options
  { id: "other", name: "Other University", category: "Other" },
  { id: "not-student", name: "Not a student", category: "Other" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [universityInput, setUniversityInput] = useState("");
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const {
    ready,
    value: locationValue,
    suggestions: { status, data },
    setValue: setLocationValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // Remove country restriction to allow worldwide locations
      types: ["(cities)"], // Focus on cities and administrative areas worldwide
    },
    debounce: 300,
  });

  // Filter universities based on input
  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(universityInput.toLowerCase()) ||
    university.category.toLowerCase().includes(universityInput.toLowerCase())
  );

  // Group filtered universities by category
  const groupedUniversities = filteredUniversities.reduce((acc, university) => {
    if (!acc[university.category]) {
      acc[university.category] = [];
    }
    acc[university.category].push(university);
    return acc;
  }, {} as Record<string, typeof universities>);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push("/");
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationValue(e.target.value);
  };

  const handleLocationSelect = (description: string) => () => {
    setLocationValue(description, false);
    clearSuggestions();

    // Optional: Get coordinates for future use
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("Selected location coordinates:", { lat, lng, address: description });
    });
  };

  const handleUniversityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUniversityInput(value);
    setShowUniversityDropdown(value.length > 0);
  };

  const handleUniversitySelect = (university: typeof universities[0]) => {
    setUniversityInput(university.name);
    setSelectedUniversity(university.id);
    setShowUniversityDropdown(false);
  };

  const handleUniversityInputFocus = () => {
    if (universityInput.length > 0) {
      setShowUniversityDropdown(true);
    }
  };

  const handleUniversityInputBlur = () => {
    // Delay hiding to allow for click events
    setTimeout(() => setShowUniversityDropdown(false), 200);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your Kroom account information</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                <p className="text-sm text-gray-500">Upload a clear photo of yourself</p>
                <Button variant="outline" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  defaultValue={user.user_metadata?.full_name || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+82 10-0000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location/City</span>
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    value={locationValue}
                    onChange={handleLocationInput}
                    disabled={!ready}
                    placeholder="New York, London, Seoul, etc."
                  />
                  {status === "OK" && (
                    <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {data.map((suggestion) => {
                        const {
                          place_id,
                          structured_formatting: { main_text, secondary_text },
                        } = suggestion;

                        return (
                          <li
                            key={place_id}
                            onClick={handleLocationSelect(suggestion.description)}
                            className="cursor-pointer p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{main_text}</div>
                            {secondary_text && (
                              <div className="text-sm text-gray-500">{secondary_text}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* User Type & Korean Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="userType">I am a:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="landlord">Landlord</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="koreanLevel" className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Korean Language Level</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native</SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="university" className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>University (Optional)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="university"
                    value={universityInput}
                    onChange={handleUniversityInput}
                    onFocus={handleUniversityInputFocus}
                    onBlur={handleUniversityInputBlur}
                    placeholder="Search for your university..."
                    className="w-full"
                  />
                  {showUniversityDropdown && filteredUniversities.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10 max-h-[300px] overflow-y-auto">
                      {Object.entries(groupedUniversities).map(([category, universityList]) => (
                        <div key={category}>
                          <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-100">
                            {category}
                          </div>
                          {universityList.map((university) => (
                            <div
                              key={university.id}
                              onClick={() => handleUniversitySelect(university)}
                              className="cursor-pointer p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium text-gray-900">{university.name}</div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  
                </div>
              </div>
            </div>

            <Separator />

            {/* Bio Section */}
            <div className="space-y-2">
              <Label htmlFor="bio">About Me (Optional)</Label>
              <textarea
                id="bio"
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Tell others about yourself, your preferences, or what you're looking for..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500">Maximum 500 characters</p>
            </div>

            <Separator />

            {/* Verification Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Verification Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Email Verified</span>
                  </div>
                  <span className="text-green-600 text-sm">✓ Verified</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium">Phone Number</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Verify
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium">Student ID</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Verify
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 