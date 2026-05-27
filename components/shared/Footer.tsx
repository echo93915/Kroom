"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-auto">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">
              {t.about}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t.terms}
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t.privacy}
            </Link>
            <Link href="/app" className="hover:text-white transition-colors">
              {t.appInstall}
            </Link>
          </div>
          <p className="text-sm text-gray-600">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
