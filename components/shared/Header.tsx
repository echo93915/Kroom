"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthModal from "./AuthModal";
import { signOut } from "@/services/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, LogOut, Settings, Heart } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { Jua } from "next/font/google";

const jua = Jua({ weight: "400", subsets: ["latin"] });

export function Header() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].header;

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

  const handleAdvertiseClick = () => {
    if (user) {
      router.push("/advertise");
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleSavedClick = () => {
    if (user) {
      router.push("/saved");
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="flex h-20 items-center justify-between bg-background px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-bold">
            Kroom
          </Link>
          <span className={`${jua.className} text-sm leading-tight`}>
            <span className="text-orange-400">{t.tagline1}</span>
            <span className="text-yellow-500">{t.tagline2}</span>
            <span className="text-rose-500">{t.tagline3}</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-0.5 text-sm font-medium"
          >
            <span className={language === 'ko' ? 'text-black font-bold' : 'text-gray-400'}>KO</span>
            <span className="text-gray-300 mx-1">|</span>
            <span className={language === 'en' ? 'text-black font-bold' : 'text-gray-400'}>EN</span>
          </button>
          <Button variant="outline" onClick={() => router.push("/looking-for")}>
            {t.lookingFor}
          </Button>
          <Button variant="destructive" onClick={handleAdvertiseClick}>
            {t.advertise}
          </Button>
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" onClick={handleSavedClick}>
            <Heart className="w-4 h-4 mr-2 fill-red-500" />
            {t.saved}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-2">
                  <div className="relative">
                    <FaUserCircle className="h-8 w-8 text-green-600" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-32">
                      {user.email}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    {t.profile}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  {t.settings}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <FaUserCircle
              className="h-8 w-8 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
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