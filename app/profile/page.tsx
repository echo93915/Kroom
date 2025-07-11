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
import { User, Mail, Phone, MapPin, GraduationCap, MessageSquare, Camera, Upload, X } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Image from "next/image";

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
  
  // US Universities (Top 100)
  { id: "princeton", name: "Princeton University", category: "🇺🇸 United States" },
  { id: "mit", name: "Massachusetts Institute of Technology", category: "🇺🇸 United States" },
  { id: "harvard", name: "Harvard University", category: "🇺🇸 United States" },
  { id: "caltech", name: "California Institute of Technology", category: "🇺🇸 United States" },
  { id: "stanford", name: "Stanford University", category: "🇺🇸 United States" },
  { id: "duke", name: "Duke University", category: "🇺🇸 United States" },
  { id: "johns-hopkins", name: "Johns Hopkins University", category: "🇺🇸 United States" },
  { id: "northwestern", name: "Northwestern University", category: "🇺🇸 United States" },
  { id: "upenn", name: "University of Pennsylvania", category: "🇺🇸 United States" },
  { id: "dartmouth", name: "Dartmouth College", category: "🇺🇸 United States" },
  { id: "brown", name: "Brown University", category: "🇺🇸 United States" },
  { id: "vanderbilt", name: "Vanderbilt University", category: "🇺🇸 United States" },
  { id: "columbia", name: "Columbia University", category: "🇺🇸 United States" },
  { id: "cornell", name: "Cornell University", category: "🇺🇸 United States" },
  { id: "uchicago", name: "University of Chicago", category: "🇺🇸 United States" },
  { id: "rice", name: "Rice University", category: "🇺🇸 United States" },
  { id: "yale", name: "Yale University", category: "🇺🇸 United States" },
  { id: "washu", name: "Washington University in St. Louis", category: "🇺🇸 United States" },
  { id: "notre-dame", name: "University of Notre Dame", category: "🇺🇸 United States" },
  { id: "carnegie-mellon", name: "Carnegie Mellon University", category: "🇺🇸 United States" },
  { id: "emory", name: "Emory University", category: "🇺🇸 United States" },
  { id: "georgetown", name: "Georgetown University", category: "🇺🇸 United States" },
  { id: "ucla", name: "University of California, Los Angeles", category: "🇺🇸 United States" },
  { id: "uc-berkeley", name: "University of California, Berkeley", category: "🇺🇸 United States" },
  { id: "usc", name: "University of Southern California", category: "🇺🇸 United States" },
  { id: "nyu", name: "New York University", category: "🇺🇸 United States" },
  { id: "tufts", name: "Tufts University", category: "🇺🇸 United States" },
  { id: "wake-forest", name: "Wake Forest University", category: "🇺🇸 United States" },
  { id: "umich", name: "University of Michigan", category: "🇺🇸 United States" },
  { id: "unc", name: "University of North Carolina at Chapel Hill", category: "🇺🇸 United States" },
  { id: "bc", name: "Boston College", category: "🇺🇸 United States" },
  { id: "william-mary", name: "College of William & Mary", category: "🇺🇸 United States" },
  { id: "uva", name: "University of Virginia", category: "🇺🇸 United States" },
  { id: "case-western", name: "Case Western Reserve University", category: "🇺🇸 United States" },
  { id: "northeastern", name: "Northeastern University", category: "🇺🇸 United States" },
  { id: "georgia-tech", name: "Georgia Institute of Technology", category: "🇺🇸 United States" },
  { id: "tulane", name: "Tulane University", category: "🇺🇸 United States" },
  { id: "rochester", name: "University of Rochester", category: "🇺🇸 United States" },
  { id: "boston-university", name: "Boston University", category: "🇺🇸 United States" },
  { id: "brandeis", name: "Brandeis University", category: "🇺🇸 United States" },
  { id: "ut-austin", name: "University of Texas at Austin", category: "🇺🇸 United States" },
  { id: "ucsb", name: "University of California, Santa Barbara", category: "🇺🇸 United States" },
  { id: "villanova", name: "Villanova University", category: "🇺🇸 United States" },
  { id: "lehigh", name: "Lehigh University", category: "🇺🇸 United States" },
  { id: "uci", name: "University of California, Irvine", category: "🇺🇸 United States" },
  { id: "ucsd", name: "University of California, San Diego", category: "🇺🇸 United States" },
  { id: "ucd", name: "University of California, Davis", category: "🇺🇸 United States" },
  { id: "rensselaer", name: "Rensselaer Polytechnic Institute", category: "🇺🇸 United States" },
  { id: "pepperdine", name: "Pepperdine University", category: "🇺🇸 United States" },
  { id: "university-miami", name: "University of Miami", category: "🇺🇸 United States" },
  { id: "illinois", name: "University of Illinois Urbana-Champaign", category: "🇺🇸 United States" },
  { id: "wisconsin", name: "University of Wisconsin-Madison", category: "🇺🇸 United States" },
  { id: "penn-state", name: "Pennsylvania State University", category: "🇺🇸 United States" },
  { id: "ohio-state", name: "The Ohio State University", category: "🇺🇸 United States" },
  { id: "purdue", name: "Purdue University", category: "🇺🇸 United States" },
  { id: "rutgers", name: "Rutgers University", category: "🇺🇸 United States" },
  { id: "university-washington", name: "University of Washington", category: "🇺🇸 United States" },
  { id: "georgia", name: "University of Georgia", category: "🇺🇸 United States" },
  { id: "clemson", name: "Clemson University", category: "🇺🇸 United States" },
  { id: "smu", name: "Southern Methodist University", category: "🇺🇸 United States" },
  { id: "texas-am", name: "Texas A&M University", category: "🇺🇸 United States" },
  { id: "byu", name: "Brigham Young University", category: "🇺🇸 United States" },
  { id: "vt", name: "Virginia Tech", category: "🇺🇸 United States" },
  { id: "american", name: "American University", category: "🇺🇸 United States" },
  { id: "indiana", name: "Indiana University Bloomington", category: "🇺🇸 United States" },
  { id: "miami-ohio", name: "Miami University", category: "🇺🇸 United States" },
  { id: "michigan-state", name: "Michigan State University", category: "🇺🇸 United States" },
  { id: "colorado", name: "University of Colorado Boulder", category: "🇺🇸 United States" },
  { id: "minnesota", name: "University of Minnesota", category: "🇺🇸 United States" },
  { id: "nc-state", name: "North Carolina State University", category: "🇺🇸 United States" },
  { id: "iowa", name: "University of Iowa", category: "🇺🇸 United States" },
  { id: "udel", name: "University of Delaware", category: "🇺🇸 United States" },
  { id: "florida", name: "University of Florida", category: "🇺🇸 United States" },
  { id: "arizona", name: "University of Arizona", category: "🇺🇸 United States" },
  { id: "asu", name: "Arizona State University", category: "🇺🇸 United States" },
  { id: "fsu", name: "Florida State University", category: "🇺🇸 United States" },
  { id: "south-carolina", name: "University of South Carolina", category: "🇺🇸 United States" },
  { id: "alabama", name: "University of Alabama", category: "🇺🇸 United States" },
  { id: "auburn", name: "Auburn University", category: "🇺🇸 United States" },
  { id: "tennessee", name: "University of Tennessee", category: "🇺🇸 United States" },
  { id: "kentucky", name: "University of Kentucky", category: "🇺🇸 United States" },
  { id: "oregon", name: "University of Oregon", category: "🇺🇸 United States" },
  { id: "washington-state", name: "Washington State University", category: "🇺🇸 United States" },
  { id: "utah", name: "University of Utah", category: "🇺🇸 United States" },
  { id: "colorado-state", name: "Colorado State University", category: "🇺🇸 United States" },
  { id: "kansas", name: "University of Kansas", category: "🇺🇸 United States" },
  { id: "nebraska", name: "University of Nebraska", category: "🇺🇸 United States" },
  { id: "missouri", name: "University of Missouri", category: "🇺🇸 United States" },
  { id: "oklahoma", name: "University of Oklahoma", category: "🇺🇸 United States" },
  { id: "marquette", name: "Marquette University", category: "🇺🇸 United States" },
  { id: "drexel", name: "Drexel University", category: "🇺🇸 United States" },
  { id: "depaul", name: "DePaul University", category: "🇺🇸 United States" },
  { id: "stevens", name: "Stevens Institute of Technology", category: "🇺🇸 United States" },
  { id: "syracuse", name: "Syracuse University", category: "🇺🇸 United States" },
  { id: "fordham", name: "Fordham University", category: "🇺🇸 United States" },
  { id: "loyola-chicago", name: "Loyola University Chicago", category: "🇺🇸 United States" },
  { id: "temple", name: "Temple University", category: "🇺🇸 United States" },
  { id: "george-washington", name: "George Washington University", category: "🇺🇸 United States" },
  { id: "howard", name: "Howard University", category: "🇺🇸 United States" },
  { id: "baylor", name: "Baylor University", category: "🇺🇸 United States" },
  { id: "tcu", name: "Texas Christian University", category: "🇺🇸 United States" },
  
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
  const [saving, setSaving] = useState(false);
  const [universityInput, setUniversityInput] = useState("");
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  
  // Profile picture states
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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
      
      // Set profile picture if exists
      if (user.user_metadata?.profile_picture) {
        setProfilePicture(user.user_metadata.profile_picture);
      }
      
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

  // Profile picture upload functions
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, or WebP)';
    }
    
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }
    
    return null;
  };

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const supabase = createClient();
      
      // Create unique filename with user ID folder structure
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Simulate progress (since Supabase doesn't provide real progress)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
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
      setUploadProgress(100);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      // Update user metadata with profile picture URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          profile_picture: publicUrl
        }
      });

      if (updateError) {
        throw updateError;
      }

      setProfilePicture(publicUrl);
      alert('Profile picture uploaded successfully!');

    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveProfilePicture = async () => {
    if (!profilePicture) return;

    try {
      const supabase = createClient();
      
      // Remove from user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          profile_picture: null
        }
      });

      if (error) {
        throw error;
      }

      setProfilePicture("");
      alert('Profile picture removed successfully!');

    } catch (error: any) {
      console.error('Error removing profile picture:', error);
      alert(`Error removing profile picture: ${error.message}`);
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

    // Optional: Get coordinates for future use
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
    // Delay hiding to allow for click events
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
      
      // Update user metadata
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
          // Keep existing profile picture if it exists
          profile_picture: profilePicture || user.user_metadata?.profile_picture
        }
      });

      if (error) {
        console.error("Error updating profile:", error);
        alert("Failed to save changes. Please try again.");
      } else {
        alert("Profile updated successfully!");
        // Refresh user data
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
          <form onSubmit={handleSaveChanges} className="space-y-6">
            {/* Profile Photo Upload Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {/* Profile Picture Display */}
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {profilePicture ? (
                    <Image
                      src={profilePicture}
                      alt="Profile Picture"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                
                {/* Remove button for existing profile picture */}
                {profilePicture && (
                  <button
                    type="button"
                    onClick={handleRemoveProfilePicture}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Upload Area */}
              <div className="w-full max-w-md">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                  
                  {uploading ? (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-blue-500 mx-auto animate-pulse" />
                      <p className="text-sm text-gray-600">Uploading...</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">{uploadProgress}%</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">
                        Drag and drop your photo here, or{' '}
                        <span className="text-blue-500 font-medium">browse</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WebP up to 5MB
                      </p>
                    </div>
                  )}
                </div>
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
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
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
                  <span>Phone Number (Recommended)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+82 10-0000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
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
                    <SelectValue placeholder="Select your birth year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = new Date().getFullYear() - 15 - i; // Start from 15 years ago
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* User Type & Korean Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="userType">I am a:</Label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
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
                <Select value={formData.koreanLevel} onValueChange={(value) => handleInputChange("koreanLevel", value)}>
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
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
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
              <Button type="submit" className="flex-1" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
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