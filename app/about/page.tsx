"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";

const content = {
  ko: {
    title: "소개",
    subtitle: "About Kroom",
    what: {
      heading: "크룸(Kroom)이란?",
      body: "크룸은 미국 내 한인 커뮤니티를 위한 부동산 플랫폼입니다. 영어가 익숙하지 않은 유학생, 주재원, 이민자분들이 믿을 수 있는 한국어 환경에서 임대·매매 매물을 쉽게 찾고 연락할 수 있도록 만들어졌습니다.",
    },
    mission: {
      heading: "우리의 미션",
      body: "미국에 새롭게 정착하는 한인들에게 언어 장벽 없는 주거 탐색 경험을 제공하는 것입니다. 아틀란타를 시작으로 전미 주요 도시의 유학생 하우징 정보를 한 곳에서 제공하겠습니다.",
    },
    services: {
      heading: "제공 서비스",
      items: [
        ["임대 (Rental)", "월세·연세 아파트, 하우스, 스튜디오 매물 검색"],
        ["매매 (For Sale)", "콘도, 타운홈, 단독주택 구매 매물 탐색"],
        ["룸메이트 찾기", "같은 공간을 나눌 룸메이트를 안전하게 구인·구직"],
        ["전대 (Sublet)", "단기 또는 임시 거주를 위한 전대 매물"],
        ["광고 게재", "집주인·에이전트 누구나 무료로 매물 등록 가능"],
      ],
    },
    region: {
      heading: "서비스 지역",
      body: "현재 조지아주 아틀란타 및 인근 지역(Gwinnett, Duluth, Johns Creek, Norcross 등) 중심으로 서비스를 운영하고 있으며, 순차적으로 뉴욕, LA, 시카고 등 주요 도시로 확장할 예정입니다.",
    },
    contact: {
      heading: "문의",
      before: "서비스 이용 관련 문의사항은 이메일 ",
      after: "으로 연락 주시기 바랍니다.",
    },
  },
  en: {
    title: "About",
    subtitle: "About Kroom",
    what: {
      heading: "What is Kroom?",
      body: "Kroom is a real estate platform built for the Korean-American community in the United States. It was designed to help international students, expats, and immigrants find rental and sale properties in a trusted Korean-language environment.",
    },
    mission: {
      heading: "Our Mission",
      body: "To provide a language-barrier-free housing search experience for Koreans settling in the United States. Starting from Atlanta, we aim to bring Korean housing listings from all major U.S. cities into one place.",
    },
    services: {
      heading: "Services",
      items: [
        ["Rental", "Search monthly-rent apartments, houses, and studios"],
        ["For Sale", "Browse condos, townhomes, and single-family homes for purchase"],
        ["Find Roommate", "Safely find or list a roommate to share your space"],
        ["Sublet", "Short-term or temporary sublet listings"],
        ["Advertise", "Any landlord or agent can list a property for free"],
      ],
    },
    region: {
      heading: "Service Area",
      body: "Currently serving Atlanta, Georgia and surrounding areas (Gwinnett, Duluth, Johns Creek, Norcross, etc.), with plans to expand to New York, Los Angeles, Chicago, and other major U.S. cities.",
    },
    contact: {
      heading: "Contact",
      before: "For any questions about our service, please email us at ",
      after: ".",
    },
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-sm text-gray-400 mb-10">{t.subtitle}</p>

        <div className="space-y-12 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t.what.heading}</h2>
            <p>{t.what.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t.mission.heading}</h2>
            <p>{t.mission.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.services.heading}</h2>
            <ul className="space-y-3">
              {t.services.items.map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <span>
                    <span className="font-medium text-gray-800">{title}</span> — {desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t.region.heading}</h2>
            <p>{t.region.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t.contact.heading}</h2>
            <p>
              {t.contact.before}
              <a href="mailto:support@kroom.com" className="text-blue-600 hover:underline">
                support@kroom.com
              </a>
              {t.contact.after}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
