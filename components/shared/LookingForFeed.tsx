"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, MoreHorizontal, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { LOOKING_FOR_POSTS } from "@/lib/data/looking-for";

const TRUNCATE_LENGTH = 180;

const PostCard = ({ post }: { post: typeof LOOKING_FOR_POSTS[number] }) => {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguage();
  const seeMore = language === "ko" ? "더 보기" : "See more";
  const seeLess = language === "ko" ? "접기" : "See less";

  const needsTruncation = post.body.length > TRUNCATE_LENGTH;
  const displayText =
    expanded || !needsTruncation
      ? post.body
      : post.body.slice(0, TRUNCATE_LENGTH).trimEnd() + "...";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <img
            src={post.avatar}
            alt={post.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">{post.name}</p>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <span>{post.timeAgo}</span>
              <span>·</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm font-bold text-gray-900 mb-1">{post.title}</p>
      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{displayText}</p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 hover:underline mt-1 flex items-center gap-0.5"
        >
          {expanded ? seeLess : seeMore}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
};

const LookingForFeed = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const preview = LOOKING_FOR_POSTS.slice(0, 4);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {language === "ko" ? "구하고 있어요" : "Looking For"}
        </h2>
        <button
          onClick={() => router.push("/looking-for")}
          className="text-sm text-blue-600 hover:underline"
        >
          {language === "ko" ? "전체 보기" : "See all"}
        </button>
      </div>
      {preview.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default LookingForFeed;
