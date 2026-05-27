export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    header: {
      lookingFor: '구하고 있어요',
      advertise: '매물 등록',
      saved: '저장됨',
      profile: '프로필',
      settings: '설정',
      signOut: '로그아웃',
      tagline1: '유학생',
      tagline2: ' 하우징은 ',
      tagline3: '크룸!',
    },
    hero: {
      heading1: '유학생 하우징은',
      allListings: '전체',
      rental: '임대',
      sale: '매매',
      findRoommate: '룸메이트 찾기',
      sublet: '전대',
      searchPlaceholder: '위치 또는 대학교 검색',
    },
    featuredRentals: {
      title: '추천 임대',
      viewAll: '전체 보기',
    },
    featuredSales: {
      title: '추천 매매',
      viewAll: '전체 보기',
    },
    featuredSubleases: {
      title: '추천 전대차',
      viewAll: '전체 보기',
    },
    featuredRoommates: {
      title: '룸메이트 찾기',
      viewAll: '전체 보기',
    },
    footer: {
      about: '소개',
      terms: '이용약관',
      privacy: '개인정보처리방침',
      appInstall: '앱 설치',
      copyright: '© 2026 Kroom. All rights reserved.',
    },
  },
  en: {
    header: {
      lookingFor: 'Looking For',
      advertise: 'Post a Listing',
      saved: 'Saved',
      profile: 'Profile',
      settings: 'Settings',
      signOut: 'Sign Out',
      tagline1: 'Student',
      tagline2: ' Housing — ',
      tagline3: 'Kroom!',
    },
    hero: {
      heading1: 'Student Housing',
      allListings: 'All Listings',
      rental: 'Rental',
      sale: 'Sale',
      findRoommate: 'Find Roommate',
      sublet: 'Sublet',
      searchPlaceholder: 'Search location or University',
    },
    featuredRentals: {
      title: 'Featured Rental',
      viewAll: 'All',
    },
    featuredSales: {
      title: 'Featured Sales',
      viewAll: 'All',
    },
    featuredSubleases: {
      title: 'Featured Subleases',
      viewAll: 'All',
    },
    featuredRoommates: {
      title: 'Find Roommates',
      viewAll: 'All',
    },
    footer: {
      about: 'About',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      appInstall: 'Get the App',
      copyright: '© 2026 Kroom. All rights reserved.',
    },
  },
} as const;
