export type LookingForCategory = "all" | "rental" | "roommate" | "sublet" | "sale";

export interface LookingForPost {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  avatar: string;
  timeAgo: string;
  title: string;
  body: string;
  category: Exclude<LookingForCategory, "all">;
  budget: string;
  location: string;
  moveIn: string;
  university: string | null;
}

export const LOOKING_FOR_POSTS: LookingForPost[] = [
  {
    id: 1,
    name: "Zoey Johnson",
    initials: "ZJ",
    avatarColor: "bg-purple-500",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    timeAgo: "11h",
    title: "August Housing",
    body: "Hi everyone! I'm looking for a studio or preferably 1 bedroom apartment in/around Atlanta for an August 2026 move-in. I'm a Georgia Tech/Spelman dual-degree engineering student returning to Atlanta after a summer internship, and I'm trying to plan ahead early.\n\nMy ideal budget is around $1000–$1200 base rent, but I'm flexible up to around $1300 for the right fit. In-unit laundry and pet-friendly are a plus. Please reach out if you have anything available!",
    category: "rental",
    budget: "$1,000–$1,300/mo",
    location: "Atlanta, GA",
    moveIn: "Aug 2026",
    university: "Georgia Institute of Technology",
  },
  {
    id: 2,
    name: "Kevin Park",
    initials: "KP",
    avatarColor: "bg-blue-500",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    timeAgo: "3h",
    title: "UCLA Area — Looking for Roommate",
    body: "Hi! I'm a 2nd-year UCLA grad student looking for a roommate to split a 2BR in Westwood or Palms starting September. Budget is up to $1,400/month for my share. I'm quiet, clean, and mostly home to study. Korean and English speaker. DM me!",
    category: "roommate",
    budget: "Up to $1,400/mo",
    location: "Westwood / Palms, LA",
    moveIn: "Sep 2025",
    university: "University of California, Los Angeles",
  },
  {
    id: 3,
    name: "Emily Chen",
    initials: "EC",
    avatarColor: "bg-rose-500",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    timeAgo: "1d",
    title: "Sublet Needed — NYC June–August",
    body: "Looking for a furnished sublet in NYC (Manhattan or Brooklyn) for June through August 2025. I'll be doing a summer internship at a firm in Midtown. Budget up to $2,200/month all-in. Reliable tenant, references available. Please message if you have something!",
    category: "sublet",
    budget: "Up to $2,200/mo",
    location: "Manhattan / Brooklyn, NY",
    moveIn: "Jun 2025",
    university: "New York University",
  },
  {
    id: 4,
    name: "Jason Lee",
    initials: "JL",
    avatarColor: "bg-green-500",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    timeAgo: "2d",
    title: "Boston — Fall 2025 Housing",
    body: "Incoming Harvard Kennedy School student looking for a 1BR or shared housing near Cambridge/Somerville starting August 2025. Budget around $1,500–$1,800/month. Prefer furnished but flexible. Happy to connect with other incoming students too!",
    category: "rental",
    budget: "$1,500–$1,800/mo",
    location: "Cambridge / Somerville, MA",
    moveIn: "Aug 2025",
    university: "Harvard University",
  },
  {
    id: 5,
    name: "Mia Tanaka",
    initials: "MT",
    avatarColor: "bg-amber-500",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    timeAgo: "4h",
    title: "Roommate Wanted — Seattle UW Area",
    body: "Hi, I'm a UW grad student starting this fall. Looking for a roommate to share a 2BR or 3BR apartment near the U-District or Capitol Hill. My budget for my share is around $900–$1,100/month. I'm clean, respectful of quiet hours, and love cooking. Let's connect!",
    category: "roommate",
    budget: "$900–$1,100/mo",
    location: "U-District / Capitol Hill, Seattle",
    moveIn: "Sep 2025",
    university: "University of Washington",
  },
  {
    id: 6,
    name: "Daniel Kim",
    initials: "DK",
    avatarColor: "bg-indigo-500",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    timeAgo: "5h",
    title: "Looking to Buy — Condo Near NYU",
    body: "International student looking to purchase a 1BR condo near NYU or lower Manhattan. Budget up to $600K. Prefer a building with amenities and low HOA. Cash buyer — looking to close quickly. Any recommendations or listings are welcome!",
    category: "sale",
    budget: "Up to $600K",
    location: "Lower Manhattan / Village, NY",
    moveIn: "Flexible",
    university: "New York University",
  },
  {
    id: 7,
    name: "Rachel Yoon",
    initials: "RY",
    avatarColor: "bg-teal-500",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    timeAgo: "6h",
    title: "Short Sublet in Chicago — 2 Months",
    body: "Looking for a short-term furnished sublet in Chicago near Northwestern's downtown campus for September and October. Doing a 2-month clinical rotation. Budget around $1,400–$1,600/month. Very clean and quiet — I'll treat your place with care!",
    category: "sublet",
    budget: "$1,400–$1,600/mo",
    location: "Streeterville / River North, Chicago",
    moveIn: "Sep 2025",
    university: "Northwestern University",
  },
  {
    id: 8,
    name: "Chris Nguyen",
    initials: "CN",
    avatarColor: "bg-orange-500",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    timeAgo: "1d",
    title: "1BR Rental — San Francisco",
    body: "Software engineer starting a new job in SF in July. Looking for a 1BR apartment in the Mission, SOMA, or Hayes Valley area. Budget is $2,500–$3,000/month. Would consider a studio for the right location. Good references and stable income — message me!",
    category: "rental",
    budget: "$2,500–$3,000/mo",
    location: "Mission / SOMA / Hayes Valley, SF",
    moveIn: "Jul 2025",
    university: null,
  },
];
