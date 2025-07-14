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
import { User, Mail, Phone, MapPin, GraduationCap, MessageSquare, Camera, Upload, X, Plus } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Image from "next/image";

const universities = [
  // US Ivy League
  { id: "harvard", name: "Harvard University", category: "🇺🇸 US - Ivy League" },
  { id: "yale", name: "Yale University", category: "🇺🇸 US - Ivy League" },
  { id: "princeton", name: "Princeton University", category: "🇺🇸 US - Ivy League" },
  { id: "columbia", name: "Columbia University", category: "🇺🇸 US - Ivy League" },
  { id: "upenn", name: "University of Pennsylvania", category: "🇺🇸 US - Ivy League" },
  { id: "dartmouth", name: "Dartmouth College", category: "🇺🇸 US - Ivy League" },
  { id: "brown", name: "Brown University", category: "🇺🇸 US - Ivy League" },
  { id: "cornell", name: "Cornell University", category: "🇺🇸 US - Ivy League" },
  
  // US Top Public Universities
  { id: "berkeley", name: "UC Berkeley", category: "🇺🇸 US - Top Public" },
  { id: "ucla", name: "UCLA", category: "🇺🇸 US - Top Public" },
  { id: "umich", name: "University of Michigan", category: "🇺🇸 US - Top Public" },
  { id: "uva", name: "University of Virginia", category: "🇺🇸 US - Top Public" },
  { id: "unc", name: "UNC Chapel Hill", category: "🇺🇸 US - Top Public" },
  { id: "gatech", name: "Georgia Institute of Technology", category: "🇺🇸 US - Top Public" },
  { id: "uiuc", name: "University of Illinois Urbana-Champaign", category: "🇺🇸 US - Top Public" },
  { id: "utexas", name: "University of Texas at Austin", category: "🇺🇸 US - Top Public" },
  { id: "wisconsin", name: "University of Wisconsin-Madison", category: "🇺🇸 US - Top Public" },
  { id: "washington", name: "University of Washington", category: "🇺🇸 US - Top Public" },
  
  // US Top Private Universities
  { id: "stanford", name: "Stanford University", category: "🇺🇸 US - Top Private" },
  { id: "mit", name: "MIT", category: "🇺🇸 US - Top Private" },
  { id: "caltech", name: "California Institute of Technology", category: "🇺🇸 US - Top Private" },
  { id: "chicago", name: "University of Chicago", category: "🇺🇸 US - Top Private" },
  { id: "northwestern", name: "Northwestern University", category: "🇺🇸 US - Top Private" },
  { id: "duke", name: "Duke University", category: "🇺🇸 US - Top Private" },
  { id: "vanderbilt", name: "Vanderbilt University", category: "🇺🇸 US - Top Private" },
  { id: "rice", name: "Rice University", category: "🇺🇸 US - Top Private" },
  { id: "emory", name: "Emory University", category: "🇺🇸 US - Top Private" },
  { id: "notre-dame", name: "University of Notre Dame", category: "🇺🇸 US - Top Private" },
  { id: "carnegie-mellon", name: "Carnegie Mellon University", category: "🇺🇸 US - Top Private" },
  { id: "johns-hopkins", name: "Johns Hopkins University", category: "🇺🇸 US - Top Private" },
  { id: "washington-university", name: "Washington University in St. Louis", category: "🇺🇸 US - Top Private" },
  
  // US Other Notable Universities
  { id: "nyu", name: "New York University", category: "🇺🇸 US - Other Notable" },
  { id: "usc", name: "University of Southern California", category: "🇺🇸 US - Other Notable" },
  { id: "boston-university", name: "Boston University", category: "🇺🇸 US - Other Notable" },
  { id: "georgetown", name: "Georgetown University", category: "🇺🇸 US - Other Notable" },
  { id: "tufts", name: "Tufts University", category: "🇺🇸 US - Other Notable" },
  { id: "wake-forest", name: "Wake Forest University", category: "🇺🇸 US - Other Notable" },
  { id: "tulane", name: "Tulane University", category: "🇺🇸 US - Other Notable" },
  { id: "northeastern", name: "Northeastern University", category: "🇺🇸 US - Other Notable" },
  { id: "case-western", name: "Case Western Reserve University", category: "🇺🇸 US - Other Notable" },
  { id: "rochester", name: "University of Rochester", category: "🇺🇸 US - Other Notable" },
  { id: "brandeis", name: "Brandeis University", category: "🇺🇸 US - Other Notable" },
  { id: "lehigh", name: "Lehigh University", category: "🇺🇸 US - Other Notable" },
  { id: "rensselaer", name: "Rensselaer Polytechnic Institute", category: "🇺🇸 US - Other Notable" },
  { id: "syracuse", name: "Syracuse University", category: "🇺🇸 US - Other Notable" },
  { id: "pepperdine", name: "Pepperdine University", category: "🇺🇸 US - Other Notable" },
  
  // Canada Universities
  { id: "toronto", name: "University of Toronto", category: "🇨🇦 Canada" },
  { id: "mcgill", name: "McGill University", category: "🇨🇦 Canada" },
  { id: "ubc", name: "University of British Columbia", category: "🇨🇦 Canada" },
  { id: "waterloo", name: "University of Waterloo", category: "🇨🇦 Canada" },
  { id: "queens", name: "Queen's University", category: "🇨🇦 Canada" },
  { id: "mcmaster", name: "McMaster University", category: "🇨🇦 Canada" },
  { id: "alberta", name: "University of Alberta", category: "🇨🇦 Canada" },
  
  // UK Universities
  { id: "oxford", name: "University of Oxford", category: "🇬🇧 UK" },
  { id: "cambridge", name: "University of Cambridge", category: "🇬🇧 UK" },
  { id: "imperial", name: "Imperial College London", category: "🇬🇧 UK" },
  { id: "lse", name: "London School of Economics", category: "🇬🇧 UK" },
  { id: "ucl", name: "University College London", category: "🇬🇧 UK" },
  { id: "edinburgh", name: "University of Edinburgh", category: "🇬🇧 UK" },
  { id: "kings", name: "King's College London", category: "🇬🇧 UK" },
  { id: "warwick", name: "University of Warwick", category: "🇬🇧 UK" },
  
  // Australia Universities
  { id: "melbourne", name: "University of Melbourne", category: "🇦🇺 Australia" },
  { id: "sydney", name: "University of Sydney", category: "🇦🇺 Australia" },
  { id: "anu", name: "Australian National University", category: "🇦🇺 Australia" },
  { id: "unsw", name: "University of New South Wales", category: "🇦🇺 Australia" },
  { id: "queensland", name: "University of Queensland", category: "🇦🇺 Australia" },
  { id: "monash", name: "Monash University", category: "🇦🇺 Australia" },
  
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
  const [saving, setSaving] = useState(false);
  const [universityInput, setUniversityInput] = useState("");
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  
  // Profile picture states (up to 4 pictures)
  const [profilePictures, setProfilePictures] = useState<string[]>(["", "", "", ""]);
  const [uploading, setUploading] = useState<boolean[]>([false, false, false, false]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([0, 0, 0, 0]);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    gender: "",
    birthYear: "",
    userType: "",
    koreanLevel: "",
    university: "",
    bio: ""
  });

  const {
    ready,
    value: locationValue,
    suggestions: { status, data },
    setValue: setLocationValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
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
      
      // Initialize form with existing user data
      setFormData({
        fullName: user.user_metadata?.full_name || "",
        phone: user.user_metadata?.phone || "",
        location: user.user_metadata?.location || "",
        gender: user.user_metadata?.gender || "",
        birthYear: user.user_metadata?.birth_year || "",
        userType: user.user_metadata?.user_type || "",
        koreanLevel: user.user_metadata?.korean_level || "",
        university: user.user_metadata?.university || "",
        bio: user.user_metadata?.bio || ""
      });
      
      // Set profile pictures if exist
      const existingPictures = user.user_metadata?.profile_pictures || [];
      const pictures = ["", "", "", ""];
      existingPictures.forEach((pic: string, index: number) => {
        if (index < 4) pictures[index] = pic;
      });
      setProfilePictures(pictures);
      
      // Set university input for the searchable field
      if (user.user_metadata?.university) {
        setUniversityInput(user.user_metadata.university);
      }
      
      // Set location input for Google Places
      if (user.user_metadata?.location) {
        setLocationValue(user.user_metadata.location, false);
      }
      
      setLoading(false);
    };

    getUser();
  }, [router]);

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, or WebP)';
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }
    
    return null;
  };

  const handleFileUpload = async (file: File, slotIndex: number) => {
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    // Set uploading state for this slot
    const newUploading = [...uploading];
    newUploading[slotIndex] = true;
    setUploading(newUploading);

    const newProgress = [...uploadProgress];
    newProgress[slotIndex] = 0;
    setUploadProgress(newProgress);

    try {
      const supabase = createClient();
      
      // Create unique filename with user ID folder structure
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${slotIndex}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newPrev = [...prev];
          if (newPrev[slotIndex] >= 90) {
            clearInterval(progressInterval);
            return newPrev;
          }
          newPrev[slotIndex] += 10;
          return newPrev;
        });
      }, 100);

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      clearInterval(progressInterval);
      setUploadProgress(prev => {
        const newPrev = [...prev];
        newPrev[slotIndex] = 100;
        return newPrev;
      });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      // Update profile pictures array
      const newPictures = [...profilePictures];
      newPictures[slotIndex] = publicUrl;
      setProfilePictures(newPictures);

      // Update user metadata with all profile pictures
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          profile_pictures: newPictures.filter(pic => pic !== "")
        }
      });

      if (updateError) {
        throw updateError;
      }

    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(prev => {
        const newPrev = [...prev];
        newPrev[slotIndex] = false;
        return newPrev;
      });
      setUploadProgress(prev => {
        const newPrev = [...prev];
        newPrev[slotIndex] = 0;
        return newPrev;
      });
    }
  };

  const handleRemoveProfilePicture = async (slotIndex: number) => {
    if (!profilePictures[slotIndex]) return;

    try {
      const supabase = createClient();
      
      // Update profile pictures array
      const newPictures = [...profilePictures];
      newPictures[slotIndex] = "";
      setProfilePictures(newPictures);

      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          profile_pictures: newPictures.filter(pic => pic !== "")
        }
      });

      if (error) {
        throw error;
      }

    } catch (error: any) {
      console.error('Error removing profile picture:', error);
      alert(`Error removing profile picture: ${error.message}`);
    }
  };

  const handleFileSelect = (slotIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], slotIndex);
    }
  };

  const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationValue(value);
    setFormData(prev => ({ ...prev, location: value }));
  };

  const handleLocationSelect = (description: string) => () => {
    setLocationValue(description, false);
    setFormData(prev => ({ ...prev, location: description }));
    clearSuggestions();

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("Selected location coordinates:", { lat, lng, address: description });
    });
  };

  const handleUniversityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUniversityInput(value);
    setFormData(prev => ({ ...prev, university: value }));
    setShowUniversityDropdown(value.length > 0);
  };

  const handleUniversitySelect = (university: typeof universities[0]) => {
    setUniversityInput(university.name);
    setSelectedUniversity(university.id);
    setFormData(prev => ({ ...prev, university: university.name }));
    setShowUniversityDropdown(false);
  };

  const handleUniversityInputFocus = () => {
    if (universityInput.length > 0) {
      setShowUniversityDropdown(true);
    }
  };

  const handleUniversityInputBlur = () => {
    setTimeout(() => setShowUniversityDropdown(false), 200);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const supabase = createClient();
      
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          location: formData.location || locationValue,
          gender: formData.gender,
          birth_year: formData.birthYear,
          user_type: formData.userType,
          korean_level: formData.koreanLevel,
          university: formData.university || universityInput,
          bio: formData.bio,
          profile_pictures: profilePictures.filter(pic => pic !== "")
        }
      });

      if (error) {
        console.error("Error updating profile:", error);
        alert("Failed to save changes. Please try again.");
      } else {
        alert("Profile updated successfully!");
        const { data: { user: updatedUser } } = await supabase.auth.getUser();
        if (updatedUser) {
          setUser(updatedUser);
        }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving. Please try again.");
    } finally {
      setSaving(false);
    }
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

  const currentYear = new Date().getFullYear();
  const birthYears = Array.from({ length: 50 }, (_, i) => currentYear - 18 - i);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-8">
            {/* Profile Pictures Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Profile Pictures
              </h2>
              <p className="text-sm text-gray-600">Upload up to 4 profile pictures</p>
              
              <div className="grid grid-cols-2 gap-4">
                {profilePictures.map((picture, index) => (
                  <div key={index} className="relative">
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                      {picture ? (
                        <>
                          <Image
                            src={picture}
                            alt={`Profile Picture ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProfilePicture(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <div className="text-center">
                          {uploading[index] ? (
                            <div className="space-y-2">
                              <Upload className="w-8 h-8 mx-auto text-gray-400" />
                              <div className="text-sm text-gray-500">
                                Uploading... {uploadProgress[index]}%
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress[index]}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center justify-center h-full w-full">
                              <Plus className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Add Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect(index)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Rest of the form remains the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number <span className="text-sm text-gray-500">(recommended)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    value={locationValue}
                    onChange={handleLocationInput}
                    placeholder="Enter your location"
                    disabled={!ready}
                  />
                  {status === "OK" && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                      {data.map((suggestion) => (
                        <button
                          key={suggestion.place_id}
                          type="button"
                          onClick={handleLocationSelect(suggestion.description)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
                        >
                          {suggestion.description}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthYear">Birth Year</Label>
                <Select value={formData.birthYear} onValueChange={(value) => handleInputChange("birthYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select birth year" />
                  </SelectTrigger>
                  <SelectContent>
                    {birthYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">I am a</Label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="working-professional">Working Professional</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="koreanLevel">Korean Language Level</Label>
                <Select value={formData.koreanLevel} onValueChange={(value) => handleInputChange("koreanLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Korean level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (초급)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (중급)</SelectItem>
                    <SelectItem value="advanced">Advanced (고급)</SelectItem>
                    <SelectItem value="native">Native (원어민)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                University
              </Label>
              <div className="relative">
                <Input
                  id="university"
                  value={universityInput}
                  onChange={handleUniversityInput}
                  onFocus={handleUniversityInputFocus}
                  onBlur={handleUniversityInputBlur}
                  placeholder="Search for your university"
                />
                {showUniversityDropdown && filteredUniversities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {Object.entries(groupedUniversities).map(([category, unis]) => (
                      <div key={category}>
                        <div className="px-4 py-2 bg-gray-50 border-b font-medium text-sm text-gray-700">
                          {category}
                        </div>
                        {unis.map((university) => (
                          <button
                            key={university.id}
                            type="button"
                            onClick={() => handleUniversitySelect(university)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
                          >
                            {university.name}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Bio
              </Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={saving} className="px-8">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
      </form>
        </div>
      </div>
    </div>
  );
} 