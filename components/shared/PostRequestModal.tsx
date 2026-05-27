"use client";

import { useState, useRef, useEffect } from "react";
import { X, MapPin, DollarSign, Calendar, Loader2, ImagePlus, XCircle, GraduationCap, ChevronDown, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import type { LookingForCategory } from "@/lib/data/looking-for";
import { ICONIC_UNIVERSITIES } from "@/lib/data/universities";

const CATEGORIES: { value: Exclude<LookingForCategory, "all">; en: string; ko: string }[] = [
  { value: "rental",   en: "Rental",   ko: "임대" },
  { value: "roommate", en: "Roommate", ko: "룸메이트" },
  { value: "sublet",   en: "Sublet",   ko: "전대차" },
  { value: "sale",     en: "Sale",     ko: "매매" },
];

const ALL_UNIVERSITY_NAMES = ICONIC_UNIVERSITIES.map((u) => u.name);

function UniversityCombobox({
  value,
  onChange,
  language,
}: {
  value: string;
  onChange: (v: string) => void;
  language: string;
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external value changes (e.g. pre-fill from user profile)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = inputValue.toLowerCase().trim();
  const suggestions = q.length === 0
    ? ALL_UNIVERSITY_NAMES.slice(0, 8)
    : ALL_UNIVERSITY_NAMES.filter((name) => {
        const u = ICONIC_UNIVERSITIES.find((u) => u.name === name)!;
        const terms = [u.name, ...(u.matchTerms ?? [])].map((t) => t.toLowerCase());
        return terms.some((t) => t.includes(q));
      }).slice(0, 8);

  const isCustom = q.length > 0 && !ALL_UNIVERSITY_NAMES.some(
    (n) => n.toLowerCase() === q
  );

  const select = (name: string) => {
    setInputValue(name);
    onChange(name);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={language === "ko" ? "학교 이름 검색..." : "Search university name..."}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen((o) => !o)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <ul className="max-h-52 overflow-y-auto py-1">
            {suggestions.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); select(name); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                    inputValue === name ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
            {suggestions.length === 0 && !isCustom && (
              <li className="px-4 py-3 text-sm text-gray-400">
                {language === "ko" ? "결과 없음" : "No results"}
              </li>
            )}
            {isCustom && (
              <li>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); select(inputValue.trim()); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2 border-t border-gray-100"
                >
                  <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                  {language === "ko"
                    ? `"${inputValue.trim()}" 직접 추가`
                    : `Add "${inputValue.trim()}"`}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PostRequestModal({ onClose, onSuccess }: Props) {
  const { language } = useLanguage();
  const [category, setCategory] = useState<Exclude<LookingForCategory, "all">>("rental");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [moveIn, setMoveIn] = useState("");
  const [university, setUniversity] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserUniversity = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.user_metadata?.university) {
          setUniversity(user.user_metadata.university);
        }
      } catch {}
    };
    loadUserUniversity();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !university.trim() || !moveIn.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError(language === "ko" ? "로그인이 필요합니다." : "You must be logged in to post.");
        setSubmitting(false);
        return;
      }

      let photoUrl: string | null = null;
      if (photoFile) {
        const ext = photoFile.name.split(".").pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("looking-for-photos")
          .upload(path, photoFile, { upsert: true });
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from("looking-for-photos")
            .getPublicUrl(path);
          photoUrl = publicUrl;
        }
      }

      const name =
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Anonymous";

      const { error: insertError } = await supabase
        .from("looking_for_posts")
        .insert({
          user_id: user.id,
          name,
          avatar_url: user.user_metadata?.avatar_url ?? null,
          title: title.trim(),
          body: body.trim(),
          category,
          budget: budget.trim() || null,
          location: location.trim() || null,
          move_in: moveIn.trim() || null,
          photo_url: photoUrl,
          university: university.trim() || null,
        });

      if (insertError) throw insertError;
      onSuccess();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {language === "ko" ? "구하는 글 올리기" : "Post a Request"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === "ko" ? "유형" : "Category"}
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat.value} type="button" onClick={() => setCategory(cat.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    category === cat.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}>
                  {language === "ko" ? cat.ko : cat.en}
                </button>
              ))}
            </div>
          </div>

          {/* University */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <GraduationCap className="w-4 h-4" />
              {language === "ko" ? "학교" : "University"} <span className="text-red-500">*</span>
            </label>
            <UniversityCombobox value={university} onChange={setUniversity} language={language} />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "ko" ? "제목" : "Title"} <span className="text-red-500">*</span>
            </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              placeholder={language === "ko" ? "예: 9월 UCLA 근처 1BR 구합니다" : "e.g. Looking for 1BR near UCLA for September"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "ko" ? "내용" : "Details"} <span className="text-red-500">*</span>
            </label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={5}
              placeholder={language === "ko" ? "원하는 조건, 예산, 본인 소개 등을 자유롭게 작성해 주세요." : "Describe what you're looking for — budget, preferences, about yourself, etc."}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "ko" ? "사진 (선택)" : "Photo (optional)"}
            </label>
            {photoPreview ? (
              <div className="relative w-32 h-32">
                <img src={photoPreview} alt="preview" className="w-full h-full object-cover rounded-2xl border border-gray-200" />
                <button type="button" onClick={removePhoto}
                  className="absolute -top-2 -right-2 text-gray-400 hover:text-red-500 bg-white rounded-full shadow">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
                <ImagePlus className="w-4 h-4" />
                {language === "ko" ? "사진 추가" : "Add photo"}
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-1.5">
                <MapPin className="w-3 h-3" />{language === "ko" ? "위치" : "Location"}
              </label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder={language === "ko" ? "예: 로스앤젤레스" : "e.g. Los Angeles"}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-1.5">
                <DollarSign className="w-3 h-3" />{language === "ko" ? "예산" : "Budget"}
              </label>
              <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)}
                placeholder={language === "ko" ? "예: $1,200/월" : "e.g. $1,200/mo"}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-1.5">
                <Calendar className="w-3 h-3" />
                {language === "ko" ? "입주 희망일" : "Move-in"} <span className="text-red-500">*</span>
              </label>
              <input type="text" value={moveIn} onChange={(e) => setMoveIn(e.target.value)} required
                placeholder={language === "ko" ? "예: 2025년 9월" : "e.g. Sep 2025"}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              {language === "ko" ? "취소" : "Cancel"}
            </button>
            <button type="submit" disabled={submitting || !title.trim() || !body.trim() || !university.trim() || !moveIn.trim()}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {language === "ko" ? "올리기" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
