import { useMemo, useState } from "react";
import { Compass, Search } from "lucide-react";

import { FaroLogo } from "@/components/brand/FaroLogo";
import { FaroCover } from "@/features/editorial/components/FaroCover";
import {
  StoryCard,
  type StoryVariant,
} from "@/features/editorial/components/StoryCard";
import {
  ThisWeek,
  Tonight,
} from "@/features/editorial/components/DiscoveryLayers";
import {
  EnterTheCity,
  PutItOnFaro,
} from "@/features/editorial/components/EditorialCTA";
import { getEditorialFeed } from "@/features/editorial/services/editorialService";

import type { EditorialLens } from "@/features/editorial/types/editorial";

const lenses: EditorialLens[] = [
  "culture",
  "city",
  "people",
  "style",
];

const lensLabels: Record<EditorialLens, string> = {
  culture: "Culture",
  city: "City",
  people: "People",
  style: "Style",
};

function EditorialPage() {
  const [showCover, setShowCover] = useState(true);
  const [activeLens, setActiveLens] =
    useState<EditorialLens | null>(null);

  const { posts, thisWeek, tonight } = useMemo(
    () => getEditorialFeed(),
    [],
  );

  const featuredPost = posts.find((post) => post.featured);

  const remainingPosts = posts.filter(
    (post) => !post.featured,
  );

  const filteredPosts = activeLens
    ? remainingPosts.filter(
        (post) => post.lens === activeLens,
      )
    : remainingPosts;

  const quickReads = filteredPosts.slice(0, 4);
  const restPosts = filteredPosts.slice(4);

  const variantFor = (index: number): StoryVariant => {
    const cycle: StoryVariant[] = [
      "standard",
      "horizontal",
      "image-led",
      "compact",
    ];

    return cycle[index % cycle.length];
  };

  return (
    <div className="min-h-screen bg-cloud">
      {showCover && (
        <FaroCover onEnter={() => setShowCover(false)} />
      )}

      {!showCover && (
        <>
          <header className="sticky top-0 z-20 border-b border-cloud-dark bg-cloud/90 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-4 lg:px-10">
              <div className="flex items-center gap-3">
                <FaroLogo compact />

                <span className="hidden font-display text-lg font-medium tracking-[-0.04em] text-harbor lg:inline">
                  editorial
                </span>
              </div>

              <div className="relative hidden sm:block">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate"
                  strokeWidth={1.8}
                />

                <input
                  type="text"
                  placeholder="Search stories, places, people…"
                  className="w-64 rounded-full border border-cloud-dark bg-white/60 py-2.5 pl-10 pr-4 text-sm text-harbor placeholder:text-slate transition-all focus:border-beacon focus:bg-white focus:outline-none focus:ring-2 focus:ring-beacon/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto px-6 pb-3 scrollbar-hide lg:px-10">
              <button
                onClick={() => setActiveLens(null)}
                className={`rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all ${
                  activeLens === null
                    ? "border-harbor bg-harbor text-white"
                    : "border-cloud-dark bg-white/50 text-slate hover:border-beacon hover:text-harbor"
                }`}
              >
                All
              </button>

              {lenses.map((lens) => (
                <button
                  key={lens}
                  onClick={() =>
                    setActiveLens(
                      activeLens === lens ? null : lens,
                    )
                  }
                  className={`rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all ${
                    activeLens === lens
                      ? "border-harbor bg-harbor text-white"
                      : "border-cloud-dark bg-white/50 text-slate hover:border-beacon hover:text-harbor"
                  }`}
                >
                  {lensLabels[lens]}
                </button>
              ))}
            </div>
          </header>

          <main className="mx-auto max-w-4xl px-6 pb-24 pt-8 lg:px-10 lg:pt-12">
            {featuredPost && (
              <section className="mb-14">
                <div className="mb-5 flex items-center gap-2">
                  <Compass
                    size={16}
                    className="text-amber"
                    strokeWidth={2}
                  />

                  <p className="text-[10px] font-bold uppercase tracking-editorial text-slate">
                    Faro Editorial · Santo Domingo
                  </p>
                </div>

                <StoryCard
                  post={featuredPost}
                  variant="feature"
                />
              </section>
            )}

            <section
              className="mb-14"
              aria-labelledby="quick-reads-heading"
            >
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2
                    id="quick-reads-heading"
                    className="font-display text-3xl font-medium tracking-[-0.02em] text-harbor"
                  >
                    Quick Reads
                  </h2>

                  <p className="mt-1 text-sm text-slate">
                    Short stories worth your attention.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {quickReads.map((post, index) => (
                  <StoryCard
                    key={post.id}
                    post={post}
                    variant={variantFor(index)}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <div className="mb-14">
              <ThisWeek events={thisWeek} />
            </div>

            <div className="mb-14">
              <Tonight items={tonight} />
            </div>

            {restPosts.length > 0 && (
              <section
                className="mb-14"
                aria-labelledby="more-heading"
              >
                <h2
                  id="more-heading"
                  className="mb-6 font-display text-2xl font-medium tracking-[-0.02em] text-harbor"
                >
                  More from Faro
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  {restPosts.map((post, index) => (
                    <StoryCard
                      key={post.id}
                      post={post}
                      variant={
                        index % 2 === 0
                          ? "entity-led"
                          : "horizontal"
                      }
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            <div className="mb-14">
              <PutItOnFaro />
            </div>

            <div className="mb-14">
              <EnterTheCity />
            </div>

            <footer className="border-t border-cloud-dark pt-8 text-center">
              <FaroLogo compact />

              <p className="mt-4 text-xs text-slate">
                Faro · La guía cultural de Santo Domingo
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-editorial text-slate">
                Sigue la luz · Prende la luz
              </p>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}

export default EditorialPage;