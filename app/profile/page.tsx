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

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your university" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {/* Korean Universities */}
                    <SelectItem value="korea-separator" disabled className="font-semibold text-gray-900">🇰🇷 Korean Universities</SelectItem>
                    <SelectItem value="snu">Seoul National University</SelectItem>
                    <SelectItem value="yonsei">Yonsei University</SelectItem>
                    <SelectItem value="korea">Korea University</SelectItem>
                    <SelectItem value="skku">Sungkyunkwan University</SelectItem>
                    <SelectItem value="hanyang">Hanyang University</SelectItem>
                    <SelectItem value="ewha">Ewha Womans University</SelectItem>
                    <SelectItem value="hongik">Hongik University</SelectItem>
                    <SelectItem value="kaist">KAIST</SelectItem>
                    
                    {/* US Universities */}
                    <SelectItem value="us-separator" disabled className="font-semibold text-gray-900 mt-4">🇺🇸 United States</SelectItem>
                    <SelectItem value="harvard">Harvard University</SelectItem>
                    <SelectItem value="mit">MIT</SelectItem>
                    <SelectItem value="stanford">Stanford University</SelectItem>
                    <SelectItem value="ucla">UCLA</SelectItem>
                    <SelectItem value="usc">USC</SelectItem>
                    <SelectItem value="nyu">New York University</SelectItem>
                    <SelectItem value="columbia">Columbia University</SelectItem>
                    <SelectItem value="berkeley">UC Berkeley</SelectItem>
                    <SelectItem value="upenn">University of Pennsylvania</SelectItem>
                    
                    {/* UK Universities */}
                    <SelectItem value="uk-separator" disabled className="font-semibold text-gray-900 mt-4">🇬🇧 United Kingdom</SelectItem>
                    <SelectItem value="oxford">University of Oxford</SelectItem>
                    <SelectItem value="cambridge">University of Cambridge</SelectItem>
                    <SelectItem value="imperial">Imperial College London</SelectItem>
                    <SelectItem value="ucl">University College London</SelectItem>
                    <SelectItem value="lse">London School of Economics</SelectItem>
                    <SelectItem value="edinburgh">University of Edinburgh</SelectItem>
                    
                    {/* Canada Universities */}
                    <SelectItem value="canada-separator" disabled className="font-semibold text-gray-900 mt-4">🇨🇦 Canada</SelectItem>
                    <SelectItem value="uoft">University of Toronto</SelectItem>
                    <SelectItem value="ubc">University of British Columbia</SelectItem>
                    <SelectItem value="mcgill">McGill University</SelectItem>
                    <SelectItem value="waterloo">University of Waterloo</SelectItem>
                    
                    {/* Australia Universities */}
                    <SelectItem value="australia-separator" disabled className="font-semibold text-gray-900 mt-4">🇦🇺 Australia</SelectItem>
                    <SelectItem value="melbourne">University of Melbourne</SelectItem>
                    <SelectItem value="sydney">University of Sydney</SelectItem>
                    <SelectItem value="anu">Australian National University</SelectItem>
                    <SelectItem value="unsw">UNSW Sydney</SelectItem>
                    
                    {/* Germany Universities */}
                    <SelectItem value="germany-separator" disabled className="font-semibold text-gray-900 mt-4">🇩🇪 Germany</SelectItem>
                    <SelectItem value="tum">Technical University of Munich</SelectItem>
                    <SelectItem value="heidelberg">Heidelberg University</SelectItem>
                    <SelectItem value="humboldt">Humboldt University Berlin</SelectItem>
                    
                    {/* Japan Universities */}
                    <SelectItem value="japan-separator" disabled className="font-semibold text-gray-900 mt-4">🇯🇵 Japan</SelectItem>
                    <SelectItem value="tokyo">University of Tokyo</SelectItem>
                    <SelectItem value="kyoto">Kyoto University</SelectItem>
                    <SelectItem value="waseda">Waseda University</SelectItem>
                    
                    {/* Other Options */}
                    <SelectItem value="other-separator" disabled className="font-semibold text-gray-900 mt-4">Other</SelectItem>
                    <SelectItem value="other">Other University</SelectItem>
                    <SelectItem value="not-student">Not a student</SelectItem>
                  </SelectContent>
                </Select>
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