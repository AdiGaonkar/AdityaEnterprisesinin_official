import React from "react";
import Navbar from "../components/Navbar";
import Collaborate from "@/components/Collaborate";

type MetaItem = { label: string; value: string };
type FeatureCard = { title: string; desc: string; img: string };
type Metric = { value: string; label: string };

const CaseStudyDetail = () => {
  // ====== EDIT THIS DATA ======
  const data = {
  heroBg: "Screenshot 2026-01-21 185505.png",
  title: "Trendwise Pro — Trading Agency Website",
  intro:
    "A premium, conversion-focused website for a trading agency to build trust, explain services clearly, and generate more leads through strong CTAs.",

  mockups: {
    desktop: "Screenshot 2026-01-21 185505.png",
    tablet: "Screenshot 2026-01-21 185528.png",
    phone: "Screenshot 2026-01-21 185439.png",
  },

  meta: [
    { label: "Our Role", value: "UI/UX Design, Fullstack Development" },
    { label: "Duration", value: "1 months" },
    { label: "Tools", value: "React, Tailwind CSS, AOS, Canva" },
    { label: "Year", value: "2026" },
    { label: "Client", value: "Trendwise Pro" },
  ] as MetaItem[],

  clientLogo: "Screenshot 2026-01-21 184903.png",
  projectUrl: "https://www.trendvisepro.in/",

  goalsTitle:
    "Trendwise Pro needed a professional platform that feels credible, highlights services and programs clearly, and drives inquiries from serious clients.",
  goals: [
    "Design a high-trust, premium UI aligned with the trading niche.",
    "Present services and programs in a clean, easy-to-scan layout.",
    "Increase inquiries with strong CTAs and an accessible contact flow.",
  ],

  typography: {
    headingFont: "Poppins",
    bodyFont: "Montserrat",
  },

  colors: ["#008080", "#4B0082", "#FFFFFF"],

  beforeAfter: {
    afterImg: "/portfolio/after.png",
    beforeImg: "/portfolio/before.png",
    caption:
      "Improved layout hierarchy for clarity, trust, and stronger conversion flow.",
  },

  challenges:
    "Trading websites need to look premium and trustworthy instantly, otherwise users bounce. The challenge was balancing a bold, modern look with clear readability and clean content hierarchy. We structured services, policies, and terms so users could find key info quickly, while keeping the site fast and smooth even with animations. Mobile spacing and CTA placement were optimized to keep inquiry actions effortless.",

  featuresImplemented: [
    "Fully responsive design for desktop, tablet, and mobile",
    "Premium landing experience with strong visual hierarchy",
    "Optimized performance with lightweight animations (AOS)",
    "Clear inquiry / contact flow with strong CTAs",
    "Trust-building sections (Terms, Policies, transparency pages)",
  ],

  featureCards: [
    {
      title: "About Trendwise Pro",
      desc: "Introduces the brand clearly with a professional tone to build trust from the first scroll.",
      img: "Screenshot 2026-01-21 190336.png",
    },
    {
      title: "Terms & Conditions",
      desc: "Well-structured terms page to improve transparency and reduce user confusion.",
      img: "Screenshot 2026-01-21 190927.png",
    },
    {
      title: "Policies",
      desc: "Dedicated policy sections designed for credibility, clarity, and easy scanning.",
      img: "Screenshot 2026-01-21 190746.png",
    },
  ] as FeatureCard[],

  metrics: [
    { value: "50%", label: "Increase in Lead Inquiries" },
    { value: "70%", label: "Improved Mobile Engagement" },
  ] as Metric[],

  outcomes: [
    "A premium, modern UI that matches the trading niche and builds trust",
    "Clear structure for programs/services to improve discoverability",
    "Better CTA placement leading to more inquiries",
    "Smooth, responsive performance across all screen sizes",
  ],

  testimonial: {
    quote:
      "Aditya delivered a clean, premium website that represents our brand perfectly. The structure is clear, the UI looks professional, and it helped us get more quality inquiries.",
    author: "— Client, Trendwise Pro",
  },
};


  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        {/* HERO */}
        <section className="relative">
          <div
            className="relative min-h-[72vh] w-full overflow-hidden"
            style={{
              backgroundImage: `url(${data.heroBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/65" />

            <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-14 sm:pt-32">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                {data.title}
              </h1>
              <p className="mt-4 max-w-3xl text-white/75 leading-relaxed">
                {data.intro}
              </p>

              {/* mockups top */}
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <img
                  src={data.mockups.desktop}
                  alt="Desktop mockup"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                />
                
              </div>
            </div>
          </div>
        </section>

        {/* META ROW */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
              {data.meta.map((m) => (
                <div key={m.label} className="md:col-span-1">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                    {m.label}
                  </p>
                  <p className="mt-2 text-sm text-white/85">{m.value}</p>
                </div>
              ))}

              {/* client logo + button */}
              <div className="md:col-span-5 mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={data.clientLogo}
                    alt="Client logo"
                    className="h-10 w-10 rounded-full bg-white/10 object-contain p-2"
                  />
                  <p className="text-white/70 text-sm">Client Logo</p>
                </div>

                <a
                  href={data.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GOALS */}
        <section className="bg-black">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <p className="text-white/85 leading-relaxed">{data.goalsTitle}</p>
            <ul className="mt-4 list-disc pl-6 text-white/70 space-y-2">
              {data.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* TYPOGRAPHY + COLORS */}
        <section className="border-y border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                  Heading Font
                </p>
                <p className="mt-3 text-2xl font-semibold">{data.typography.headingFont}</p>
                <p className="mt-4 text-white/70">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                </p>

                <p className="mt-8 text-xs uppercase tracking-[0.22em] text-white/50">
                  Body Font
                </p>
                <p className="mt-3 text-2xl font-semibold">{data.typography.bodyFont}</p>
                <p className="mt-4 text-white/70">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                  Brand Colors
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  {data.colors.map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-xl border border-white/15"
                        style={{ backgroundColor: c }}
                      />
                      <p className="text-sm text-white/75">{c}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-2 gap-6">
                  <img
                    src={data.mockups.tablet}
                    alt="Tablet view"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 object-cover"
                  />
                  <img
                    src={data.mockups.phone}
                    alt="Phone view"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        

        {/* CHALLENGES + FEATURES */}
        <section className="border-y border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-semibold">Challenges</h2>
            <p className="mt-4 text-white/70 leading-relaxed">{data.challenges}</p>

            <h2 className="mt-10 text-2xl font-semibold">Features Implemented</h2>
            <ul className="mt-4 space-y-2 text-white/70">
              {data.featuresImplemented.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* feature cards */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {data.featureCards.map((fc) => (
                <div
                  key={fc.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <img
                    src={fc.img}
                    alt={fc.title}
                    className="h-[40rem] w-full rounded-xl object-cover"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{fc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{fc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS + OUTCOMES */}
        <section className="bg-black">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="grid grid-cols-2 gap-6">
                {data.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <p className="text-4xl font-semibold">{m.value}</p>
                    <p className="mt-2 text-sm text-white/70">{m.label}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Outcomes</h2>
                <ul className="mt-4 space-y-2 text-white/70">
                  {data.outcomes.map((o) => (
                    <li key={o} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* testimonial */}
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-white/80 leading-relaxed">“{data.testimonial.quote}”</p>
              <p className="mt-4 text-sm text-white/70">{data.testimonial.author}</p>

              <div className="mt-8 flex items-center justify-end">
                <a
                  href={data.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Collaborate />
    </>
  );
};

export default CaseStudyDetail;
