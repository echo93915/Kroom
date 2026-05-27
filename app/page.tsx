import Hero from "@/components/shared/Hero";
import FeaturedSections from "@/components/shared/FeaturedSections";
import LookingForFeed from "@/components/shared/LookingForFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col xl:flex-row items-start">
        <div className="flex-1 min-w-0 w-full">
          <FeaturedSections />
        </div>
        <aside className="w-full xl:w-[360px] xl:flex-shrink-0 xl:sticky xl:top-20 xl:max-h-[calc(100vh-80px)] xl:overflow-y-auto py-12 px-4 border-t xl:border-t-0 xl:border-l border-gray-100">
          <LookingForFeed />
        </aside>
      </div>
    </>
  );
}
