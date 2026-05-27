"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";

const collectTable = {
  ko: {
    col1: "수집 시점",
    col2: "수집 항목",
    rows: [
      ["회원가입 시", "이메일 주소, 비밀번호, 이름(닉네임)"],
      ["소셜 로그인 시", "이메일 주소, 프로필 사진, 이름 (OAuth 제공 항목)"],
      ["매물 등록 시", "연락처(전화번호 또는 이메일), 매물 상세 정보"],
      ["서비스 이용 시", "접속 IP, 브라우저 정보, 방문 일시, 서비스 이용 기록"],
    ],
  },
  en: {
    col1: "When Collected",
    col2: "Data Collected",
    rows: [
      ["Member registration", "Email address, password, name (nickname)"],
      ["Social login", "Email address, profile photo, name (from OAuth provider)"],
      ["Listing registration", "Contact info (phone or email), property details"],
      ["Service usage", "IP address, browser info, visit timestamp, usage logs"],
    ],
  },
};

const vendorTable = {
  ko: {
    col1: "수탁업체",
    col2: "위탁 업무",
    rows: [
      ["Supabase Inc.", "회원 인증 및 데이터베이스 관리"],
      ["Vercel Inc.", "서비스 호스팅 및 배포"],
      ["Google LLC", "지도 서비스 및 장소 검색"],
    ],
  },
  en: {
    col1: "Vendor",
    col2: "Delegated Task",
    rows: [
      ["Supabase Inc.", "Member authentication and database management"],
      ["Vercel Inc.", "Service hosting and deployment"],
      ["Google LLC", "Maps and location search"],
    ],
  },
};

const content = {
  ko: {
    title: "개인정보처리방침",
    subtitle: "Privacy Policy",
    effective: "시행일: 2026년 1월 1일",
    intro: "크룸(이하 \"회사\")은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.",
    articles: [
      {
        heading: "제1조 (수집하는 개인정보 항목)",
        intro: "회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.",
        table: "collect",
      },
      {
        heading: "제2조 (개인정보의 수집·이용 목적)",
        list: [
          "회원 가입 및 본인 식별·인증",
          "서비스 제공: 매물 검색, 저장, 연락처 제공, 광고 게재",
          "고객 문의 및 불만 처리",
          "서비스 개선 및 신규 서비스 개발을 위한 통계·분석",
          "법령상 의무 이행",
        ],
      },
      {
        heading: "제3조 (개인정보의 보유 및 이용 기간)",
        list: [
          "회원 탈퇴 시 즉시 파기. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보존합니다.",
          "전자상거래 관련 기록: 5년 (전자상거래법)",
          "소비자 불만 및 분쟁 처리 기록: 3년 (전자상거래법)",
          "서비스 이용 로그: 3개월",
        ],
      },
      {
        heading: "제4조 (개인정보의 제3자 제공)",
        body: "회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우 또는 법령의 규정에 의하거나 수사기관의 요청이 있는 경우에는 예외로 합니다.",
      },
      {
        heading: "제5조 (개인정보 처리의 위탁)",
        intro: "회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁합니다.",
        table: "vendor",
      },
      {
        heading: "제6조 (정보주체의 권리)",
        body: "이용자는 언제든지 개인정보 열람, 정정·삭제, 처리 정지 요청, 회원 탈퇴를 통한 삭제 권리를 행사할 수 있습니다.",
        contact: { before: "위 권리 행사는 ", email: "privacy@kroom.com", after: "으로 요청하시면 지체 없이 조치하겠습니다." },
      },
      {
        heading: "제7조 (쿠키 사용)",
        body: "회사는 서비스 개선 및 사용자 경험 향상을 위해 쿠키(Cookie)를 사용합니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 일부 서비스 이용이 제한될 수 있습니다.",
      },
      {
        heading: "제8조 (개인정보 보호책임자)",
        officer: { label1: "책임자:", val1: "크룸 개인정보 보호팀", label2: "이메일:", email: "privacy@kroom.com" },
      },
      {
        heading: "부칙",
        body: "이 개인정보처리방침은 2026년 1월 1일부터 시행합니다.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    subtitle: "개인정보처리방침",
    effective: "Effective: January 1, 2026",
    intro: "Kroom (the \"Company\") establishes and discloses this Privacy Policy in accordance with Article 30 of the Personal Information Protection Act to protect users' personal information and handle related complaints promptly.",
    articles: [
      {
        heading: "Article 1 (Personal Information Collected)",
        intro: "The Company collects the following personal information to provide the Service.",
        table: "collect",
      },
      {
        heading: "Article 2 (Purpose of Collection and Use)",
        list: [
          "Member registration and identity verification",
          "Service provision: property search, saving, contact display, listing ads",
          "Customer inquiry and complaint handling",
          "Statistics and analysis for service improvement and new feature development",
          "Compliance with legal obligations",
        ],
      },
      {
        heading: "Article 3 (Retention and Use Period)",
        list: [
          "Deleted immediately upon account deletion. However, data required by law will be retained for the legally specified period.",
          "E-commerce records: 5 years (E-Commerce Act)",
          "Consumer complaint and dispute records: 3 years (E-Commerce Act)",
          "Service usage logs: 3 months",
        ],
      },
      {
        heading: "Article 4 (Third-Party Disclosure)",
        body: "The Company does not provide users' personal information to third parties in principle. Exceptions apply when the user has given prior consent, or when required by law or requested by investigative agencies.",
      },
      {
        heading: "Article 5 (Outsourcing of Personal Information Processing)",
        intro: "The Company outsources personal information processing as follows to provide the Service.",
        table: "vendor",
      },
      {
        heading: "Article 6 (Rights of Data Subjects)",
        body: "Users may at any time request to access, correct, delete, or suspend processing of their personal information, or delete it via account deletion.",
        contact: { before: "To exercise these rights, please email ", email: "privacy@kroom.com", after: "." },
      },
      {
        heading: "Article 7 (Use of Cookies)",
        body: "The Company uses cookies to improve the Service and enhance user experience. Users may refuse cookie storage via browser settings, but some features may be restricted as a result.",
      },
      {
        heading: "Article 8 (Privacy Officer)",
        officer: { label1: "Officer:", val1: "Kroom Privacy Team", label2: "Email:", email: "privacy@kroom.com" },
      },
      {
        heading: "Addendum",
        body: "This Privacy Policy is effective as of January 1, 2026.",
      },
    ],
  },
};

function Table({ data }: { data: { col1: string; col2: string; rows: string[][] } }) {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-4 py-2 font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap">{data.col1}</th>
            <th className="text-left px-4 py-2 font-medium text-gray-700 border-b border-gray-200">{data.col2}</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(([a, b]) => (
            <tr key={a} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-2 text-gray-700 font-medium whitespace-nowrap">{a}</td>
              <td className="px-4 py-2 text-gray-600">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-sm text-gray-400 mb-1">{t.subtitle}</p>
        <p className="text-sm text-gray-400 mb-8">{t.effective}</p>
        <p className="text-gray-600 leading-relaxed mb-10">{t.intro}</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          {t.articles.map((article) => (
            <section key={article.heading}>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{article.heading}</h2>
              {"intro" in article && article.intro && <p className="mb-2">{article.intro}</p>}
              {"table" in article && article.table === "collect" && <Table data={collectTable[language]} />}
              {"table" in article && article.table === "vendor" && <Table data={vendorTable[language]} />}
              {"body" in article && article.body && <p>{article.body}</p>}
              {"list" in article && article.list && (
                <ol className="list-decimal list-inside space-y-1">
                  {article.list.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
              )}
              {"contact" in article && article.contact && (
                <p className="mt-2">
                  {article.contact.before}
                  <a href={`mailto:${article.contact.email}`} className="text-blue-600 hover:underline">
                    {article.contact.email}
                  </a>
                  {article.contact.after}
                </p>
              )}
              {"officer" in article && article.officer && (
                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
                  <p><span className="font-medium text-gray-700">{article.officer.label1}</span> {article.officer.val1}</p>
                  <p>
                    <span className="font-medium text-gray-700">{article.officer.label2}</span>{" "}
                    <a href={`mailto:${article.officer.email}`} className="text-blue-600 hover:underline">
                      {article.officer.email}
                    </a>
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
