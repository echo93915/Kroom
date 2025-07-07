import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/auth";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Email: {user.email}</p>
      <form
        action={async () => {
          "use server";
          const supabase = createClient();
          await supabase.auth.signOut();
          redirect("/");
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
} 