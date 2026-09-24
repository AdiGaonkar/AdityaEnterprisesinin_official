import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Collaborate from "@/components/Collaborate";

type CreativeCategory = "all" | "posts" | "stories" | "ads" | "thumbnails";

type CreativeItem = {
  title: string;
  category: Exclude<CreativeCategory, "all">;
  img: string;
  tags?: string[];
};

const creatives: CreativeItem[] = [
  // POSTS
  { title: "Instagram Post — Promo", category: "posts", img: "BREATH LONGER (8).png", tags: ["IG Post", "Promo"] },
  { title: "Instagram Post — Branding", category: "posts", img: "BREATH LONGER (12).png", tags: ["Branding"] },
  { title: "Instagram Post — Branding", category: "posts", img: "Screenshot 2025-12-13 203903.png", tags: ["Branding"] },

  // STORIES (replace images)
  // ADS
  { title: "Ad Creative — Sale", category: "ads", img: "BREATH LONGER (4).png", tags: ["Ad", "Conversion"] },
  { title: "Ad Creative — Lead Gen", category: "ads", img: "BREATH LONGER (5).png", tags: ["Ad", "Lead"] },
  { title: "Ad Creative — Lead Gen", category: "ads", img: "BREATH LONGER (6).png", tags: ["Ad", "Lead"] },


  // THUMBNAILS
  { title: "YouTube Thumbnail", category: "thumbnails", img: "yt thumbnails.jpeg", tags: ["YouTube"] },
  { title: "Thumbnail — Bold", category: "thumbnails", img: "84696e0d-85bc-41ac-8953-77fcb6921de6-md.jpeg", tags: ["Thumbnail"] },
  { title: "Thumbnail — Bold", category: "thumbnails", img: "https://i.pinimg.com/736x/ba/21/54/ba21549628913b76c40b3d5febb01e25.jpg", tags: ["Thumbnail"] },
];

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-4">
      <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
      <div className="h-px flex-1 bg-white/10" />
    </div>
    {subtitle && <p className="mt-2 text-sm text-white/60">{subtitle}</p>}
  </div>
);

const Divider = () => (
  <div className="my-16">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </div>
);

const CardGrid = ({
  items,
  onOpen,
}: {
  items: CreativeItem[];
  onOpen: (item: CreativeItem) => void;
}) => {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
        No designs added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => onOpen(item)}
          className="mb-5 w-full text-left break-inside-avoid group"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition group-hover:-translate-y-1">
            <div className="relative">
              <img src={item.img} alt={item.title} className="w-full object-cover" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/35" />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{item.title}</p>
                <span className="text-xs text-white/70">View ↗</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80">
                  {item.category.toUpperCase()}
                </span>
                {item.tags?.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const SocialMediaCreatives = () => {
  const [active, setActive] = useState<CreativeCategory>("all");
  const [open, setOpen] = useState<CreativeItem | null>(null);

  const grouped = useMemo(() => {
    const posts = creatives.filter((c) => c.category === "posts");
    const stories = creatives.filter((c) => c.category === "stories");
    const ads = creatives.filter((c) => c.category === "ads");
    const thumbnails = creatives.filter((c) => c.category === "thumbnails");

    return { posts, stories, ads, thumbnails };
  }, []);

  const Tab = ({ id, label }: { id: CreativeCategory; label: string }) => (
    <button
      onClick={() => setActive(id)}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition
        ${active === id ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15"}`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* HERO */}
        <section className="relative bg-gradient-to-b from-[#F6C400] via-[#F6C400] to-black">
          <Navbar />

          <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-32">
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/70">
              Graphic Design
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold text-black">
              Social Media Creatives
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-base text-black/80">
              Posts, stories, ad creatives & thumbnails — organized into clean sections like a portfolio.
            </p>

            {/* FILTERS */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Tab id="all" label="All" />
              <Tab id="posts" label="Instagram Posts" />
              <Tab id="stories" label="Stories" />
              <Tab id="ads" label="Ads" />
              <Tab id="thumbnails" label="Thumbnails" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black" />
        </section>

        {/* SECTIONS */}
        <section className="bg-black">
          <div className="mx-auto max-w-7xl px-6 py-16">
            {(active === "all" || active === "posts") && (
              <>
                <SectionHeader
                  title="Instagram Posts"
                  subtitle="Feed designs, carousel creatives, promo posts."
                />
                <CardGrid items={grouped.posts} onOpen={setOpen} />
              </>
            )}

            {active === "all" && <Divider />}

            {(active === "all" || active === "stories") && (
              <>
                <SectionHeader
                  title="Stories"
                  subtitle="Story templates, offer screens, swipe-up style designs."
                />
                <CardGrid items={grouped.stories} onOpen={setOpen} />
              </>
            )}

            {active === "all" && <Divider />}

            {(active === "all" || active === "ads") && (
              <>
                <SectionHeader
                  title="Ad Creatives"
                  subtitle="High-conversion creatives for Meta/Google ads."
                />
                <CardGrid items={grouped.ads} onOpen={setOpen} />
              </>
            )}

            {active === "all" && <Divider />}

            {(active === "all" || active === "thumbnails") && (
              <>
                <SectionHeader
                  title="Thumbnails"
                  subtitle="YouTube thumbnails and attention-grabbing covers."
                />
                <CardGrid items={grouped.thumbnails} onOpen={setOpen} />
              </>
            )}

            {/* CTA */}
            <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Want creatives like this for your brand?
              </h2>
              <p className="mt-2 text-white/70 max-w-2xl">
                I can design a full content pack: posts, stories, ad creatives and thumbnails — aligned with your brand.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="rounded-xl bg-white text-black px-6 py-3 font-semibold text-center hover:opacity-90 transition"
                >
                  Book a Call
                </a>
                <a
                  href="/portfolio"
                  className="rounded-xl border border-white/15 bg-transparent px-6 py-3 font-semibold text-center hover:bg-white/10 transition"
                >
                  Back to Portfolio
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MODAL PREVIEW */}
        {open && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            onClick={() => setOpen(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
              className="relative z-[61] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10">
                <div>
                  <p className="font-semibold">{open.title}</p>
                  <p className="text-xs text-white/60">
                    {open.category.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
                >
                  Close ✕
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <img
                  src={open.img}
                  alt={open.title}
                  className="w-full rounded-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Collaborate />
    </>
  );
};

export default SocialMediaCreatives;
