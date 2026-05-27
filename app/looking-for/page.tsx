"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, MoreHorizontal, Search, Plus, MapPin, DollarSign, Calendar, GraduationCap, Check } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { LOOKING_FOR_POSTS, type LookingForCategory } from "@/lib/data/looking-for";
import { createClient } from "@/lib/supabase/client";
import PostRequestModal from "@/components/shared/PostRequestModal";
import { useNearbyUniversities } from "@/hooks/useNearbyUniversities";
import type { UniversityPin } from "@/lib/data/universities";

const CATEGORY_LABELS: Record<LookingForCategory, { en: string; ko: string; color: string }> = {
  all:      { en: "All",       ko: "전체",        color: "bg-gray-900 text-white" },
  rental:   { en: "Rental",    ko: "임대",        color: "bg-blue-100 text-blue-700" },
  roommate: { en: "Roommate",  ko: "룸메이트",    color: "bg-purple-100 text-purple-700" },
  sublet:   { en: "Sublet",    ko: "전대차",      color: "bg-amber-100 text-amber-700" },
  sale:     { en: "Sale",      ko: "매매",        color: "bg-green-100 text-green-700" },
};

const INACTIVE_COLOR = "bg-gray-100 text-gray-600 hover:bg-gray-200";

const categoryBadgeColor: Record<string, string> = {
  rental:   "bg-blue-100 text-blue-700",
  roommate: "bg-purple-100 text-purple-700",
  sublet:   "bg-amber-100 text-amber-700",
  sale:     "bg-green-100 text-green-700",
};

interface DisplayPost {
  id: string | number;
  name: string;
  avatar: string | null;
  photoUrl: string | null;
  initials: string;
  avatarColor: string;
  timeAgo: string;
  title: string;
  body: string;
  category: Exclude<LookingForCategory, "all">;
  budget: string | null;
  location: string | null;
  moveIn: string | null;
  university: string | null;
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

const AVATAR_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-rose-500", "bg-green-500",
  "bg-amber-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500",
];

const PostCard = ({ post, language }: { post: DisplayPost; language: string }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        {post.avatar ? (
          <img src={post.avatar} alt={post.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${post.avatarColor}`}>
            {post.initials}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{post.name}</p>
          <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
            <span>{post.timeAgo}</span>
            <span>·</span>
            <Globe className="w-3 h-3" />
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${categoryBadgeColor[post.category]}`}>
              {language === "ko" ? CATEGORY_LABELS[post.category].ko : CATEGORY_LABELS[post.category].en}
            </span>
          </div>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>

    <div>
      <h3 className="font-bold text-gray-900 text-base mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{post.body}</p>
    </div>

    <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
      {post.location && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1.5">
          <MapPin className="w-3 h-3" />{post.location}
        </div>
      )}
      {post.budget && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1.5">
          <DollarSign className="w-3 h-3" />{post.budget}
        </div>
      )}
      {post.moveIn && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1.5">
          <Calendar className="w-3 h-3" />{post.moveIn}
        </div>
      )}
      {post.university && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1.5">
          <GraduationCap className="w-3 h-3" />{post.university}
        </div>
      )}
    </div>

    <button className="w-full mt-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-colors">
      {language === "ko" ? "메시지 보내기" : "Send Message"}
    </button>
  </div>
);

export default function LookingForPage() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<LookingForCategory>("all");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dbPosts, setDbPosts] = useState<DisplayPost[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<Set<string>>(new Set());

  const { universities: nearbyList, loading: locationLoading } = useNearbyUniversities();

  // Select all by default once the list is loaded
  useEffect(() => {
    if (nearbyList.length > 0) {
      setSelectedUniversities(new Set(nearbyList.map((u) => u.name)));
    }
  }, [nearbyList]);

  const toggleUniversity = (name: string) => {
    setSelectedUniversities((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const allSelected = nearbyList.length > 0 && selectedUniversities.size === nearbyList.length;

  const uniMatchesSelection = (postUniversity: string | null): boolean => {
    if (selectedUniversities.size === 0 || nearbyList.length === 0) return true;
    const postU = (postUniversity ?? "").toLowerCase();
    if (!postU) return false;
    return nearbyList
      .filter((u) => selectedUniversities.has(u.name))
      .some((u) => {
        const terms = [u.name, ...(u.matchTerms ?? [])].map((t) => t.toLowerCase());
        return terms.some((t) => postU.includes(t) || t.includes(postU));
      });
  };

  const fetchDbPosts = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("looking_for_posts")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (data) {
        setDbPosts(
          data.map((row, i) => ({
            id: row.id,
            name: row.name,
            avatar: row.avatar_url ?? null,
            photoUrl: row.photo_url ?? null,
            initials: getInitials(row.name),
            avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
            timeAgo: timeAgo(row.created_at),
            title: row.title,
            body: row.body,
            category: row.category,
            budget: row.budget ?? null,
            location: row.location ?? null,
            moveIn: row.move_in ?? null,
            university: row.university ?? null,
          }))
        );
      }
    } catch {
      // table may not exist yet — silently fall back to demo data
    }
  }, []);

  useEffect(() => { fetchDbPosts(); }, [fetchDbPosts]);

  const demoPosts: DisplayPost[] = LOOKING_FOR_POSTS.map((p) => ({
    id: p.id,
    name: p.name,
    avatar: p.avatar,
    photoUrl: null,
    initials: p.initials,
    avatarColor: p.avatarColor,
    timeAgo: p.timeAgo,
    title: p.title,
    body: p.body,
    category: p.category,
    budget: p.budget,
    location: p.location,
    moveIn: p.moveIn,
    university: p.university,
  }));

  const allPosts = [...dbPosts, ...demoPosts];

  const filtered = allPosts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      (p.location ?? "").toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q);

    const matchesUniversity = uniMatchesSelection(p.university);

    return matchesCategory && matchesQuery && matchesUniversity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === "ko" ? "구하고 있어요" : "Looking For"}
              </h1>
              <p className="text-gray-500 mt-1.5 text-sm">
                {language === "ko"
                  ? "학생들이 직접 올린 하우징 요청을 확인하세요."
                  : "Browse housing requests posted by students looking for their next home."}
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              {language === "ko" ? "글 올리기" : "Post Request"}
            </button>
          </div>

          <div className="relative mt-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === "ko" ? "위치, 이름, 내용 검색..." : "Search by location, name, or keyword..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {(Object.keys(CATEGORY_LABELS) as LookingForCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? CATEGORY_LABELS[cat].color : INACTIVE_COLOR
                }`}
              >
                {language === "ko" ? CATEGORY_LABELS[cat].ko : CATEGORY_LABELS[cat].en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* University toggles */}
        {(locationLoading || nearbyList.length > 0) && (
          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">
                {language === "ko" ? "검색 결과" : "Search Results for"}
              </h2>
              {!locationLoading && nearbyList.length > 0 && (
                <button
                  onClick={() =>
                    allSelected
                      ? setSelectedUniversities(new Set())
                      : setSelectedUniversities(new Set(nearbyList.map((u) => u.name)))
                  }
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {allSelected
                    ? (language === "ko" ? "전체 해제" : "Deselect all")
                    : (language === "ko" ? "전체 선택" : "Select all")}
                </button>
              )}
            </div>

            {locationLoading ? (
              <div className="flex gap-3 flex-wrap">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-36 rounded-2xl bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                {nearbyList.map((uni) => {
                  const active = selectedUniversities.has(uni.name);
                  return (
                    <button
                      key={uni.name}
                      onClick={() => toggleUniversity(uni.name)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-150 border-2 ${
                        active
                          ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                          : "bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {active && <Check className="w-4 h-4 flex-shrink-0" />}
                      {uni.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            {language === "ko" ? "해당하는 게시물이 없습니다." : "No posts match your search."}
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-5">
              {filtered.length} {language === "ko" ? "개의 게시물" : "posts"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} language={language} />
              ))}
            </div>
          </>
        )}
      </div>

      {modalOpen && (
        <PostRequestModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchDbPosts();
          }}
        />
      )}
    </div>
  );
}
