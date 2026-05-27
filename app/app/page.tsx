"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";

const content = {
  ko: {
    emoji: "📱",
    title: "앱 출시 준비 중",
    body: "크룸 모바일 앱을 준비 중에 있습니다.\nApp Store 및 Google Play에서 곧 만나보실 수 있습니다.",
    appStore: "App Store — 준비중",
    playStore: "Google Play — 준비중",
    note: "웹 서비스는 지금 바로 이용하실 수 있습니다.",
  },
  en: {
    emoji: "📱",
    title: "App Coming Soon",
    body: "The Kroom mobile app is on its way.\nAvailable soon on the App Store and Google Play.",
    appStore: "App Store — Coming Soon",
    playStore: "Google Play — Coming Soon",
    note: "The web service is available right now.",
  },
};

export default function AppInstallPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6 py-16 max-w-md">
        <div className="text-6xl mb-6">{t.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{t.title}</h1>
        <p className="text-gray-500 leading-relaxed mb-8 whitespace-pre-line">{t.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 text-gray-400 text-sm cursor-not-allowed select-none">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {t.appStore}
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 text-gray-400 text-sm cursor-not-allowed select-none">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.18 23.76c.3.17.64.22.98.15l12.43-12.43-2.9-2.9-10.51 15.18zm17.63-9.9L17.7 12l3.11-1.86c.9-.54.9-1.8 0-2.34L5.64.36A1.5 1.5 0 0 0 4.2.22L15.35 11.37l5.46-5.46-3.57 2.13 3.57 2.13-5.46 5.46L4.2 23.78a1.5 1.5 0 0 0 1.44-.14l15.17-9.08c.9-.54.9-1.8 0-2.7z" />
            </svg>
            {t.playStore}
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-400">{t.note}</p>
      </div>
    </div>
  );
}
