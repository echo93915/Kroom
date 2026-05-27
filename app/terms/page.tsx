"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";

const content = {
  ko: {
    title: "이용약관",
    subtitle: "Terms of Service",
    effective: "시행일: 2026년 1월 1일",
    articles: [
      {
        heading: "제1조 (목적)",
        body: "이 약관은 크룸(이하 \"회사\")이 제공하는 부동산 정보 플랫폼 서비스(이하 \"서비스\")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.",
      },
      {
        heading: "제2조 (정의)",
        list: [
          '"서비스"란 회사가 제공하는 부동산 매물 검색, 등록, 연락 기능 일체를 의미합니다.',
          '"이용자"란 서비스에 접속하여 이용하는 모든 사람을 말합니다.',
          '"회원"이란 회사에 개인정보를 제공하고 회원 등록을 완료한 이용자를 말합니다.',
          '"매물"이란 회원이 서비스를 통해 등록한 임대·매매·전대 관련 부동산 정보를 말합니다.',
        ],
      },
      {
        heading: "제3조 (약관의 효력 및 변경)",
        list: [
          "이 약관은 서비스 화면에 게시하거나 기타 방법으로 공지함으로써 효력이 발생합니다.",
          "회사는 필요하다고 인정되는 경우 약관을 변경할 수 있으며, 변경된 약관은 공지 후 7일이 경과한 시점부터 효력이 발생합니다.",
          "이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.",
        ],
      },
      {
        heading: "제4조 (서비스의 제공)",
        list: [
          "회사는 부동산 매물 정보 제공, 검색, 저장, 문의 연결 서비스를 제공합니다.",
          "서비스는 연중무휴 24시간 제공을 원칙으로 하나, 시스템 점검·장애·운영상의 사유로 일시 중단될 수 있습니다.",
          "회사는 서비스의 내용을 변경하거나 중단할 수 있으며, 이 경우 사전에 공지합니다.",
        ],
      },
      {
        heading: "제5조 (회원가입 및 이용계약)",
        list: [
          "이용계약은 이용자가 약관에 동의하고 회원가입을 신청한 후, 회사가 이를 승낙함으로써 성립됩니다.",
          "회사는 다음 각 호의 경우 가입 신청을 거절하거나 이용을 제한할 수 있습니다: 타인의 정보를 도용한 경우, 허위 정보를 기재한 경우, 서비스의 정상 운영을 저해하는 경우.",
        ],
      },
      {
        heading: "제6조 (회원의 의무)",
        list: [
          "회원은 타인의 개인정보를 무단으로 수집·이용하여서는 안 됩니다.",
          "회원은 허위 매물 정보를 등록하거나 사기적 행위를 하여서는 안 됩니다.",
          "회원은 서비스를 통해 얻은 정보를 회사의 사전 동의 없이 상업적으로 이용할 수 없습니다.",
          "회원은 관련 법령 및 이 약관의 규정을 준수해야 합니다.",
        ],
      },
      {
        heading: "제7조 (면책조항)",
        list: [
          "회사는 이용자 간 또는 이용자와 제3자 간의 거래에 개입하지 않으며, 이로 인한 손해에 대해 책임을 지지 않습니다.",
          "회사는 서비스에 게재된 매물 정보의 정확성을 보장하지 않으며, 정보 이용으로 발생한 손해에 대해 책임을 지지 않습니다.",
          "회사는 천재지변, 서버 장애, 해킹 등 불가항력적 사유로 서비스가 중단된 경우 책임을 지지 않습니다.",
        ],
      },
      {
        heading: "제8조 (분쟁 해결)",
        body: "서비스 이용과 관련하여 분쟁이 발생한 경우, 회사와 이용자는 상호 협의를 통해 해결하는 것을 원칙으로 합니다. 협의가 이루어지지 않을 경우, 관련 법령에 따른 관할 법원에 소를 제기할 수 있습니다.",
      },
      {
        heading: "부칙",
        body: "이 약관은 2026년 1월 1일부터 시행합니다.",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    subtitle: "이용약관",
    effective: "Effective: January 1, 2026",
    articles: [
      {
        heading: "Article 1 (Purpose)",
        body: 'These Terms of Service govern the rights, obligations, and responsibilities between Kroom (the "Company") and users in connection with the real estate information platform service (the "Service") provided by the Company.',
      },
      {
        heading: "Article 2 (Definitions)",
        list: [
          '"Service" means the entirety of property listing search, registration, and contact features provided by the Company.',
          '"User" means any person who accesses and uses the Service.',
          '"Member" means a user who has provided personal information to the Company and completed member registration.',
          '"Listing" means real estate information related to rental, sale, or sublet registered by a member through the Service.',
        ],
      },
      {
        heading: "Article 3 (Effect and Amendment of Terms)",
        list: [
          "These Terms take effect upon being posted on the Service or announced through other means.",
          "The Company may amend these Terms when necessary. Amended Terms take effect 7 days after notice is given.",
          "If a user does not agree to the amended Terms, they may discontinue use of the Service and request account deletion.",
        ],
      },
      {
        heading: "Article 4 (Provision of Service)",
        list: [
          "The Company provides property listing information, search, save, and inquiry connection services.",
          "The Service is provided 24/7 in principle, but may be temporarily suspended for system maintenance, failures, or operational reasons.",
          "The Company may modify or discontinue the Service, in which case prior notice will be given.",
        ],
      },
      {
        heading: "Article 5 (Membership and Service Agreement)",
        list: [
          "The service agreement is formed when the user applies for membership after agreeing to the Terms and the Company approves the application.",
          "The Company may reject or restrict membership in cases such as: impersonating another person, providing false information, or disrupting normal service operations.",
        ],
      },
      {
        heading: "Article 6 (Member Obligations)",
        list: [
          "Members must not collect or use other individuals' personal information without authorization.",
          "Members must not register false listing information or engage in fraudulent activities.",
          "Members may not commercially use information obtained through the Service without the Company's prior consent.",
          "Members must comply with applicable laws and the provisions of these Terms.",
        ],
      },
      {
        heading: "Article 7 (Disclaimer)",
        list: [
          "The Company does not intervene in transactions between users or between users and third parties, and is not responsible for any damages arising therefrom.",
          "The Company does not guarantee the accuracy of listing information posted on the Service and is not responsible for damages resulting from use of such information.",
          "The Company is not responsible for service interruptions caused by force majeure events such as natural disasters, server failures, or hacking.",
        ],
      },
      {
        heading: "Article 8 (Dispute Resolution)",
        body: "In the event of a dispute arising from use of the Service, the Company and the user shall resolve it through mutual consultation. If no agreement is reached, either party may file a claim with the competent court pursuant to applicable law.",
      },
      {
        heading: "Addendum",
        body: "These Terms of Service are effective as of January 1, 2026.",
      },
    ],
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-sm text-gray-400 mb-1">{t.subtitle}</p>
        <p className="text-sm text-gray-400 mb-10">{t.effective}</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          {t.articles.map((article) => (
            <section key={article.heading}>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{article.heading}</h2>
              {"body" in article && article.body && <p>{article.body}</p>}
              {"list" in article && article.list && (
                <ol className="list-decimal list-inside space-y-1">
                  {article.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
