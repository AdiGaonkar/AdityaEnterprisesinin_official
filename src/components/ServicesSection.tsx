import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Collaborate from "@/components/Collaborate";
import Navbar from "./Navbar";

type ElectronicsTab = "color" | "industrial";
type ITTab = "web" | "app" | "design" | "hosting" | "marketing";

type ServiceCard = {
  title: string;
  desc: string;
  icon: string;
};

const electronicsTabs: {
  key: ElectronicsTab;
  label: string;
}[] = [
  {
    key: "color",
    label: "Color Measurement Solutions",
  },
  {
    key: "industrial",
    label: "Industrial & Electronic Solutions",
  },
];

const itTabs: {
  key: ITTab;
  label: string;
}[] = [
  {
    key: "web",
    label: "Web Development",
  },
  {
    key: "app",
    label: "App Development",
  },
  {
    key: "design",
    label: "UI/UX & Graphic Design",
  },
  {
    key: "hosting",
    label: "Hosting & Technical Support",
  },
  {
    key: "marketing",
    label: "Digital Marketing",
  },
];

const electronicsData: Record<
  ElectronicsTab,
  {
    heading: string;
    description: string;
    cards: ServiceCard[];
  }
> = {
  color: {
    heading: "Color Measurement Solutions",
    description:
      "Advanced color measurement and analysis solutions designed for accurate, consistent, and reliable quality control across professional and industrial applications.",
    cards: [
      {
        icon: "◉",
        title: "Spectrophotometers",
        desc: "Professional instruments for precise spectral measurement and objective color evaluation across industrial applications.",
      },
      {
        icon: "◉",
        title: "Spectrodensitometers",
        desc: "Advanced color and density measurement solutions for printing, inks, packaging, and production quality control.",
      },
      {
        icon: "◉",
        title: "Colorimeters",
        desc: "Reliable instruments for fast and consistent color measurement, comparison, and quality inspection.",
      },
      {
        icon: "◉",
        title: "Color Analysis",
        desc: "Color analysis solutions helping businesses maintain consistency and improve quality control throughout production.",
      },
    ],
  },

  industrial: {
    heading: "Industrial & Electronic Solutions",
    description:
      "Reliable electronic and industrial technology solutions for professional, commercial, manufacturing, printing, packaging, and business requirements.",
    cards: [
      {
        icon: "▣",
        title: "Industrial Electronics",
        desc: "Electronic equipment and technology solutions designed for industrial and professional applications.",
      },
      {
        icon: "▣",
        title: "Printing & Packaging Technology",
        desc: "Technology solutions supporting printing, packaging, production, inspection, and quality-control requirements.",
      },
      {
        icon: "▣",
        title: "Computers & Peripherals",
        desc: "Laptops, desktop computers, CPUs, monitors, peripherals, and other electronics for professional and business use.",
      },
      {
        icon: "▣",
        title: "Technology Sourcing",
        desc: "Helping customers identify and source suitable electronic and industrial products according to their requirements.",
      },
    ],
  },
};

const itData: Record<
  ITTab,
  {
    heading: string;
    description: string;
    cards: ServiceCard[];
  }
> = {
  web: {
    heading: "Web Development",
    description:
      "Modern, responsive, and high-performance websites designed around your business, brand, and customer requirements.",
    cards: [
      {
        icon: "⌘",
        title: "Business Websites",
        desc: "Professional websites that showcase your company, products, services, and brand with a strong digital presence.",
      },
      {
        icon: "⌘",
        title: "E-Commerce Websites",
        desc: "Complete online stores with product management, payment integration, orders, and smooth customer experiences.",
      },
      {
        icon: "⌘",
        title: "Custom Web Applications",
        desc: "Custom web platforms and applications developed around your specific business processes and requirements.",
      },
      {
        icon: "⌘",
        title: "WordPress & Shopify",
        desc: "Flexible and easy-to-manage websites and online stores built using powerful platforms.",
      },
    ],
  },

  app: {
    heading: "App Development",
    description:
      "Powerful and user-friendly mobile applications designed to turn ideas and business requirements into digital products.",
    cards: [
      {
        icon: "▱",
        title: "Android & iOS Apps",
        desc: "Modern mobile applications with intuitive interfaces, smooth performance, and scalable architecture.",
      },
      {
        icon: "▱",
        title: "Custom Mobile Apps",
        desc: "Applications developed around your business model, workflow, customers, and unique requirements.",
      },
      {
        icon: "▱",
        title: "API Integration",
        desc: "Integration with databases, payment gateways, authentication, maps, notifications, and other services.",
      },
      {
        icon: "▱",
        title: "App Deployment & Support",
        desc: "Application deployment, maintenance, updates, troubleshooting, and ongoing technical support.",
      },
    ],
  },

  design: {
    heading: "UI/UX & Graphic Design",
    description:
      "Creative digital and visual design solutions that make your products easier to use and your brand easier to recognize.",
    cards: [
      {
        icon: "✦",
        title: "Website UI/UX",
        desc: "Modern and intuitive website interfaces designed around your brand, users, and business objectives.",
      },
      {
        icon: "✦",
        title: "App UI/UX",
        desc: "Clean and user-friendly mobile app interfaces focused on usability, consistency, and smooth interactions.",
      },
      {
        icon: "✦",
        title: "Logo & Brand Identity",
        desc: "Professional logos, typography, colors, and visual identity solutions for your business.",
      },
      {
        icon: "✦",
        title: "Marketing Creatives",
        desc: "Creative social media posts, advertisements, brochures, banners, presentations, and marketing designs.",
      },
    ],
  },

  hosting: {
    heading: "Hosting & Technical Support",
    description:
      "Reliable hosting, deployment, maintenance, and technical support to keep your websites and applications secure and accessible.",
    cards: [
      {
        icon: "▤",
        title: "Website Hosting",
        desc: "Reliable hosting solutions for business websites, portfolios, landing pages, blogs, and online stores.",
      },
      {
        icon: "▤",
        title: "App & Web Hosting",
        desc: "Hosting and deployment solutions for web applications, APIs, and mobile application backends.",
      },
      {
        icon: "▤",
        title: "Domain & SSL",
        desc: "Domain setup, DNS configuration, SSL installation, and essential services for a secure online presence.",
      },
      {
        icon: "▤",
        title: "Maintenance & Support",
        desc: "Updates, monitoring, backups, troubleshooting, optimization, and ongoing technical assistance.",
      },
    ],
  },

  marketing: {
    heading: "Digital Marketing",
    description:
      "Performance-focused digital marketing solutions designed to increase visibility, reach the right audience, and generate business growth.",
    cards: [
      {
        icon: "↗",
        title: "Google Ads",
        desc: "Targeted Google advertising campaigns designed to generate relevant traffic, leads, enquiries, and conversions.",
      },
      {
        icon: "↗",
        title: "Meta Ads",
        desc: "Performance-driven advertising campaigns across Facebook and Instagram to reach your target audience.",
      },
      {
        icon: "↗",
        title: "SEO",
        desc: "Search engine optimization strategies designed to improve website visibility, rankings, and organic traffic.",
      },
      {
        icon: "↗",
        title: "Social Media Marketing",
        desc: "Social media strategy, content support, profile optimization, and campaign management.",
      },
    ],
  },
};

function ServiceIcon({ icon }: { icon: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-2xl text-black">
      {icon}
    </div>
  );
}

export default function ServicesSection() {
  const [electronicsActive, setElectronicsActive] =
    useState<ElectronicsTab>("color");

  const [itActive, setItActive] = useState<ITTab>("web");

  const activeElectronics = electronicsData[electronicsActive];
  const activeIT = itData[itActive];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#7834c8] via-[#7834c8] to-black">
        <Navbar />

        <div className="mx-auto flex min-h-screen max-w-6xl -mt-28 flex-col items-center justify-center px-4 pt-24 pb-16 sm:pt-28">
          <h1 className="text-center text-7xl text-white sm:text-6xl md:text-9xl">
            Our Services
          </h1>

          <div className="mx-auto mt-12 w-full max-w-xl text-center">
            <div className="h-px w-full bg-white/35" />

            <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-white/80">
              Technology • Industrial • Digital
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              Complete technology solutions for every requirement
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </section>

      <div className="bg-black text-white">

        {/* INTRO */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#b6b6b6]" />
            AE Techno Services
          </div>

          <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Technology Solutions Built Around Your Needs.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
            From advanced color measurement and industrial electronics to
            professional IT and digital services, we provide reliable
            technology solutions tailored to businesses and professionals.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 01 - ELECTRONICS & INDUSTRIAL TECHNOLOGY                  */}
        {/* ========================================================= */}

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">

          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b6b6b6]">
              01
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              Electronics & Industrial Technology
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">
              Professional electronic, industrial, and color measurement
              solutions for quality control, production, business, and
              industry-specific applications.
            </p>
          </div>

          {/* ELECTRONICS TABS */}
          <div className="flex flex-wrap gap-3">
            {electronicsTabs.map((tab) => {
              const isActive = electronicsActive === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setElectronicsActive(tab.key)}
                  className={[
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "border-[#646464] bg-[#646464] text-white"
                      : "border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f3f4f6]",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ELECTRONICS CONTENT */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={electronicsActive}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-2xl font-semibold md:text-4xl">
                  {activeElectronics.heading}
                </h3>

                <p className="mt-3 max-w-3xl leading-relaxed text-white/60">
                  {activeElectronics.description}
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {activeElectronics.cards.map((card) => (
                    <motion.div
                      key={card.title}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl bg-gray-300 p-7 shadow-sm"
                    >
                      <ServiceIcon icon={card.icon} />

                      <h4 className="mt-6 text-xl font-semibold text-black">
                        {card.title}
                      </h4>

                      <p className="mt-3 leading-relaxed text-[#6b7280]">
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* SEPARATOR */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px bg-white/10" />
        </div>

        {/* ========================================================= */}
        {/* 02 - IT & DIGITAL SERVICES                               */}
        {/* ========================================================= */}

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">

          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b6b6b6]">
              02
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              IT & Digital Services
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">
              Modern digital solutions that help businesses establish a
              stronger online presence, build digital products, and reach
              their customers effectively.
            </p>
          </div>

          {/* IT TABS */}
          <div className="flex flex-wrap gap-3">
            {itTabs.map((tab) => {
              const isActive = itActive === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setItActive(tab.key)}
                  className={[
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "border-[#646464] bg-[#646464] text-white"
                      : "border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f3f4f6]",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* IT CONTENT */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={itActive}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-2xl font-semibold md:text-4xl">
                  {activeIT.heading}
                </h3>

                <p className="mt-3 max-w-3xl leading-relaxed text-white/60">
                  {activeIT.description}
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {activeIT.cards.map((card) => (
                    <motion.div
                      key={card.title}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl bg-gray-300 p-7 shadow-sm"
                    >
                      <ServiceIcon icon={card.icon} />

                      <h4 className="mt-6 text-xl font-semibold text-black">
                        {card.title}
                      </h4>

                      <p className="mt-3 leading-relaxed text-[#6b7280]">
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-black md:text-3xl">
              Looking for the Right Solution?
            </h3>

            <p className="mt-3 max-w-2xl text-[#6b7280]">
              Tell us about your requirement. Whether you need color
              measurement equipment, industrial electronics, or a complete
              IT and digital solution, our team can help.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/Contact"
                className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Contact Us
              </a>

              <a
                href="https://wa.me/918779394211"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#e5e7eb] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#f3f4f6]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>

      <Collaborate />
    </>
  );
}