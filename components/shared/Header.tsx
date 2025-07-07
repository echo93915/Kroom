"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthModal from "./AuthModal";
import { signOut } from "@/services/auth";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch initial user data
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <header className="flex h-20 items-center justify-between bg-background px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold">
          Kroom
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="destructive">Advertise</Button>
          {user ? (
            <>
              <Button onClick={signOut}>Sign Out</Button>
            </>
          ) : (
            <FaUserCircle
              className="h-8 w-8 cursor-pointer"
              onClick={() => setAuthModalOpen(true)}
            />
          )}
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
} 