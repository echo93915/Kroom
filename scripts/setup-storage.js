const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

async function setupStorage() {
  console.log("Setting up Supabase storage bucket...");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    // Create the profile-pictures bucket
    const { data: bucket, error: bucketError } =
      await supabase.storage.createBucket("profile-pictures", {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ],
      });

    if (bucketError) {
      if (bucketError.message.includes("already exists")) {
        console.log("✅ Storage bucket already exists");
      } else {
        console.error("❌ Error creating bucket:", bucketError);
        return;
      }
    } else {
      console.log("✅ Storage bucket created successfully");
    }

    // Test bucket access
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();
    if (listError) {
      console.error("❌ Error listing buckets:", listError);
      return;
    }

    const profileBucket = buckets.find((b) => b.name === "profile-pictures");
    if (profileBucket) {
      console.log("✅ Profile pictures bucket is accessible");
      console.log("Bucket details:", {
        name: profileBucket.name,
        public: profileBucket.public,
        file_size_limit: profileBucket.file_size_limit,
        allowed_mime_types: profileBucket.allowed_mime_types,
      });
    } else {
      console.log("❌ Profile pictures bucket not found in list");
    }
  } catch (error) {
    console.error("❌ Setup failed:", error);
  }
}

setupStorage();
