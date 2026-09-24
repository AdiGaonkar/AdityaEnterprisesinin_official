import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Collaborate from "@/components/Collaborate";
import {
  X,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type PortfolioCategory =
  | "web"
  | "graphic"
  | "color"
  | "machines";

type Machine = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  tag: string;
  image: string;
  gallery?: string[];
  applications?: string[];
  features?: string[];
  specifications?: {
    name: string;
    value: string;
  }[];
};

type WorkItem = {
  title: string;
  desc: string;
  img: string;
  href: string;
  category: PortfolioCategory;
  tag?: string;
  wip?: boolean;
  machine?: Machine;
};

/* ============================================================
   MACHINE DATA
============================================================ */

const machineData: Machine[] = [
  {
    id: "spectrophotometer",
    title: "Spectrophotometer",
    shortDescription:
      "Advanced instruments for accurate spectral measurement, color analysis, and professional quality control.",
    description:
      "Precision spectrophotometers designed for accurate color measurement and spectral analysis across various industrial and laboratory applications.",
    category: "Color Measurement",
    tag: "Color Analysis",
    image:
      "https://15126147.s21i.faiusr.com/4/7/ABUIABAEGAAghffItAYo0Lym_QQwpAk4ngc!800x800.png.webp",
    gallery: [
      "https://15126147.s21i.faiusr.com/4/7/ABUIABAEGAAghffItAYo0Lym_QQwpAk4ngc!800x800.png.webp",
    ],
    applications: [
      "Textiles",
      "Paints & Coatings",
      "Plastics",
      "Printing & Packaging",
      "Industrial Quality Control",
    ],
    features: [
      "High-precision color measurement",
      "Accurate spectral analysis",
      "Fast and consistent results",
      "Professional quality control",
      "Easy-to-use operation",
    ],
    specifications: [
      {
        name: "Measurement Type",
        value: "Spectral / Color Measurement",
      },
      {
        name: "Application",
        value: "Color Analysis",
      },
      {
        name: "Operation",
        value: "Digital",
      },
    ],
  },

  {
    id: "spectro-densitometer",
    title: "Spectro Densitometer",
    shortDescription:
      "Professional color and density measurement equipment for printing, inks, and packaging.",
    description:
      "Professional spectro densitometers designed to provide accurate color and density measurements for printing, inks, packaging, and related industries.",
    category: "Color Measurement",
    tag: "Color & Density",
    image:
      "https://15126147.s21i.faiusr.com/4/7/ABUIABAEGAAg8KTStAYoyJbciAcw6Ac40QY!800x800.png.webp",
    gallery: [
      "https://15126147.s21i.faiusr.com/4/7/ABUIABAEGAAg8KTStAYoyJbciAcw6Ac40QY!800x800.png.webp",
    ],
    applications: [
      "Printing",
      "Packaging",
      "Ink Manufacturing",
      "Color Quality Control",
    ],
    features: [
      "Color measurement",
      "Density measurement",
      "Consistent results",
      "Professional quality control",
    ],
    specifications: [
      {
        name: "Measurement",
        value: "Color & Density",
      },
      {
        name: "Application",
        value: "Printing & Packaging",
      },
      {
        name: "Operation",
        value: "Digital",
      },
    ],
  },

  {
    id: "colourimeter",
    title: "Colourimeters",
    shortDescription:
      "Professional color measurement instruments for fast and consistent color evaluation.",
    description:
      "Colorimeters provide quick and consistent color measurement for quality control and product evaluation across multiple industries.",
    category: "Color Measurement",
    tag: "Color Measurement",
    image:
      "https://i.pinimg.com/1200x/2f/25/df/2f25dfc77af149c868b5f62255601277.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/2f/25/df/2f25dfc77af149c868b5f62255601277.jpg",
    ],
    applications: [
      "Textiles",
      "Paints",
      "Plastics",
      "Printing",
      "Product Quality Control",
    ],
    features: [
      "Fast color measurement",
      "Consistent evaluation",
      "Compact design",
      "Easy operation",
    ],
    specifications: [
      {
        name: "Measurement",
        value: "Color",
      },
      {
        name: "Application",
        value: "Color Evaluation",
      },
    ],
  },

  {
    id: "color-assessment-light-box",
    title: "Color Assessment Light Box",
    shortDescription:
      "Standardized lighting environments for accurate visual color evaluation and comparison.",
    description:
      "Color assessment light boxes provide controlled and standardized lighting conditions for accurate visual color matching and comparison.",
    category: "Color Measurement",
    tag: "Color Assessment",
    image:
      "https://image.made-in-china.com/2f0j00BlaqtASsnUkW/Light-Box-for-Color-Matching-4-Four-Light-Source-Color-Viewing-Light.webp",
    gallery: [
      "https://image.made-in-china.com/2f0j00BlaqtASsnUkW/Light-Box-for-Color-Matching-4-Four-Light-Source-Color-Viewing-Light.webp",
    ],
    applications: [
      "Textiles",
      "Printing",
      "Paints",
      "Plastics",
      "Packaging",
    ],
    features: [
      "Standardized lighting",
      "Visual color comparison",
      "Multiple light sources",
      "Controlled viewing environment",
    ],
  },

  {
    id: "gloss-meter",
    title: "Gloss Meter",
    shortDescription:
      "Accurate measurement equipment for evaluating the specular reflection gloss of various materials.",
    description:
      "Gloss meters are designed to measure the specular reflection of surfaces and evaluate the gloss level of different materials.",
    category: "Color Measurement",
    tag: "Surface Testing",
    image:
      "https://15126147.s21i.faiusr.com/4/7/ABUIABAEGAAg5qm0xQYok4Gn7QMwmwo4wwY.png.webp",
    gallery: [
      "https://15126147.s21i.faiusr.com/4/7/ABUIABAEGAAg5qm0xQYok4Gn7QMwmwo4wwY.png.webp",
    ],
    applications: [
      "Paints & Coatings",
      "Plastics",
      "Automotive",
      "Printing",
      "Surface Finishing",
    ],
    features: [
      "Accurate gloss measurement",
      "Portable operation",
      "Fast testing",
      "Surface quality evaluation",
    ],
    specifications: [
      {
        name: "Measurement",
        value: "Surface Gloss",
      },
      {
        name: "Application",
        value: "Surface Quality Testing",
      },
    ],
  },

  {
    id: "tensile-testing-machine",
    title: "Tensile Testing Machine",
    shortDescription:
      "Precision equipment designed to measure the tensile strength, elongation, and deformation of various materials.",
    description:
      "Universal tensile testing equipment designed to evaluate tensile strength, elongation, deformation, and mechanical properties of materials.",
    category: "Material Testing",
    tag: "Material Testing",
    image:
      "https://www.iqctest.com./Uploads/pro/Universal-Strength-Tensile-Testing-Machine-Strength-Tester-Testing-Equipment.556.1.jpg?v=1769761710",
    gallery: [
      "https://www.iqctest.com./Uploads/pro/Universal-Strength-Tensile-Testing-Machine-Strength-Tester-Testing-Equipment.556.1.jpg?v=1769761710",
    ],
    applications: [
      "Metal",
      "Plastic",
      "Rubber",
      "Synthetic Materials",
      "Industrial Material Testing",
    ],
    features: [
      "Tensile strength testing",
      "Elongation measurement",
      "Deformation analysis",
      "Accurate force measurement",
      "Material quality control",
    ],
    specifications: [
      {
        name: "Testing Type",
        value: "Tensile Testing",
      },
      {
        name: "Measurement",
        value: "Strength & Elongation",
      },
      {
        name: "Application",
        value: "Material Testing",
      },
    ],
  },

  {
    id: "paint-thickness-gauge",
    title: "Paint Thickness Gauge",
    shortDescription:
      "Applications include coatings, powder spraying, plastics, rubber, metals, and surface treatments.",
    description:
      "Paint thickness gauges are designed to measure coating thickness accurately across a variety of coated metal and industrial surfaces.",
    category: "Material Testing",
    tag: "Coating Testing",
    image:
      "https://www.iqctest.com./Uploads/pro/Paint-Thickness-Gauge.60.1.jpg?v=1686022385",
    gallery: [
      "https://www.iqctest.com./Uploads/pro/Paint-Thickness-Gauge.60.1.jpg?v=1686022385",
    ],
    applications: [
      "Paint Coatings",
      "Anti-Corrosion Coatings",
      "Powder Coating",
      "Metal Surfaces",
      "Industrial Surface Treatment",
    ],
    features: [
      "Coating thickness measurement",
      "Fast inspection",
      "Non-destructive testing",
      "Suitable for industrial applications",
    ],
    specifications: [
      {
        name: "Measurement",
        value: "Coating Thickness",
      },
      {
        name: "Testing",
        value: "Non-Destructive",
      },
    ],
  },

  {
    id: "moisture-meter",
    title: "Moisture Meter",
    shortDescription:
      "Advanced instruments for precise moisture content analysis in various industrial materials.",
    description:
      "Moisture meters provide accurate moisture content analysis for materials used in industrial and laboratory environments.",
    category: "Laboratory Equipment",
    tag: "Moisture Testing",
    image:
      "https://www.iqctest.com./Uploads/pro/Infrared-Moisture-Analyzer-Balance.449.3-6.jpg?v=1764735646",
    gallery: [
      "https://www.iqctest.com./Uploads/pro/Infrared-Moisture-Analyzer-Balance.449.3-6.jpg?v=1764735646",
    ],
    applications: [
      "Industrial Materials",
      "Laboratory Testing",
      "Raw Material Analysis",
      "Quality Control",
    ],
    features: [
      "Precise moisture analysis",
      "Fast measurement",
      "Digital operation",
      "Quality control support",
    ],
    specifications: [
      {
        name: "Measurement",
        value: "Moisture Content",
      },
      {
        name: "Application",
        value: "Laboratory & Industrial",
      },
    ],
  },

  {
    id: "ph-meter",
    title: "pH Meter",
    shortDescription:
      "High-precision pH meter for accurate pH and mV measurement in laboratories, research, education, agriculture, and various scientific applications.",
    description:
      "High-precision pH measurement equipment designed for accurate pH and mV measurement across laboratory, scientific, agricultural, and educational applications.",
    category: "Laboratory Equipment",
    tag: "Laboratory Equipment",
    image:
      "https://www.iqctest.com./Uploads/pro/Desktop-Digital-Display-PH-Meter-1.164.3-1.jpg?v=1751895675",
    gallery: [
      "https://www.iqctest.com./Uploads/pro/Desktop-Digital-Display-PH-Meter-1.164.3-1.jpg?v=1751895675",
    ],
    applications: [
      "Scientific Research",
      "Laboratories",
      "Education",
      "Agriculture",
    ],
    features: [
      "High-precision pH measurement",
      "pH and mV measurement",
      "Digital display",
      "Laboratory applications",
    ],
    specifications: [
      {
        name: "Measurement",
        value: "pH & mV",
      },
      {
        name: "Application",
        value: "Laboratory & Research",
      },
    ],
  },
];

/* ============================================================
   PORTFOLIO DATA
============================================================ */

const works: WorkItem[] = [
  /* ================= IT PORTFOLIO ================= */

  {
    title: "Trendwise Pro — Trading Website",
    desc: "Premium, trust-focused trading agency website with strong CTAs and clean structure.",
    img: "Screenshot 2026-01-21 185505.png",
    href: "/Trendwise",
    category: "web",
    tag: "Website",
  },

  {
    title: "Gogas — Gas Agency Website",
    desc: "Modern, professional website designed to build trust and simplify customer inquiries.",
    img: "Screenshot 2026-01-21 193100.png",
    href: "/Gogas",
    category: "web",
    tag: "Website",
  },

  {
    title: "Food-Commerce",
    desc: "E-commerce website project currently under development.",
    img: "Screenshot 2026-01-21 204831.png",
    href: "/case-studies/seo-growth",
    category: "web",
    wip: true,
    tag: "Website",
  },

  {
    title: "Social Media Creatives",
    desc: "High-quality Instagram post and story creatives designed for digital marketing.",
    img: "you can do it. (1).png",
    href: "/GraphicDesign",
    category: "graphic",
    tag: "Social",
  },

  {
    title: "Poster / Banner Design",
    desc: "Bold posters and banners created for advertisements, events, and promotions.",
    img: "you can do it. (2).png",
    href: "/PosterBanner",
    category: "graphic",
    tag: "Poster",
  },

  /* ================= COLOR MEASUREMENT ================= */

  ...machineData
    .filter((machine) => machine.category === "Color Measurement")
    .map((machine) => ({
      title: machine.title,
      desc: machine.shortDescription,
      img: machine.image,
      href: "#",
      category: "color" as PortfolioCategory,
      tag: machine.tag,
      machine,
    })),

  /* ================= MACHINES ================= */

  ...machineData
    .filter((machine) => machine.category !== "Color Measurement")
    .map((machine) => ({
      title: machine.title,
      desc: machine.shortDescription,
      img: machine.image,
      href: "#",
      category: "machines" as PortfolioCategory,
      tag: machine.tag,
      machine,
    })),
];

/* ============================================================
   WORK GRID
============================================================ */

const WorkGrid = ({
  items,
  onMachineOpen,
}: {
  items: WorkItem[];
  onMachineOpen: (machine: Machine) => void;
}) => {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      {items.map((item, idx) => {
        const content = (
          <article className="group rounded-[22px] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.55)]">

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-[16px] bg-[#2b2b2b]">

              {/* CATEGORY */}
              <span
                className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold text-white backdrop-blur ${
                  item.category === "web"
                    ? "bg-black/75"
                    : item.category === "graphic"
                    ? "bg-pink-600/80"
                    : item.category === "color"
                    ? "bg-[#d6b500]/90"
                    : "bg-blue-700/80"
                }`}
              >
                {item.category === "web"
                  ? "Web"
                  : item.category === "graphic"
                  ? "Graphic"
                  : item.category === "color"
                  ? "Color Measurement"
                  : "Machine"}

                {item.tag ? ` • ${item.tag}` : ""}
              </span>

              {/* WIP */}
              {item.wip && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-orange-400 px-3 py-1 text-[11px] font-semibold text-white">
                  Work in progress
                </span>
              )}

              <img
                src={item.img}
                alt={item.title}
                className="h-52 w-full bg-white object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04] sm:h-56 md:h-64"
              />

              {/* MACHINE HOVER */}
              {(item.category === "machines" ||
                item.category === "color") && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/35">
                  <span className="translate-y-3 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View Details →
                  </span>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="px-1 pb-1 pt-4">

              <h3 className="text-lg font-semibold text-black sm:text-xl">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-black/70 sm:text-base">
                {item.desc}
              </p>

              <p className="mt-3 text-sm font-semibold text-black/80">
                {item.category === "machines" ||
                item.category === "color"
                  ? "View Details →"
                  : "View →"}
              </p>

            </div>
          </article>
        );

        /* MACHINE / COLOR */
        if (
          item.category === "machines" ||
          item.category === "color"
        ) {
          return (
            <button
              key={`${item.title}-${idx}`}
              type="button"
              onClick={() => {
                if (item.machine) {
                  onMachineOpen(item.machine);
                }
              }}
              className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
            >
              {content}
            </button>
          );
        }

        /* WEB / GRAPHIC */
        return (
          <Link
            key={`${item.title}-${idx}`}
            to={item.href}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
};

/* ============================================================
   SECTION HEADER
============================================================ */

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <div className="mb-10">

    <p className="text-[20px] uppercase tracking-[0.28em] text-white/60">
      {eyebrow}
    </p>

    <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
      {title}
    </h2>

    <p className="mt-2 max-w-3xl text-sm text-white/70 sm:text-base">
      {subtitle}
    </p>

  </div>
);

/* ============================================================
   DIVIDER
============================================================ */

const Divider = () => (
  <div className="my-20">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

/* ============================================================
   INDUSTRY CARD
============================================================ */

const IndustryCard = ({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F6C400]/40 hover:bg-white/[0.07]">

      <div className="flex items-start justify-between">

        <span className="text-xs font-semibold tracking-[0.2em] text-[#d0ff00]">
          {number}
        </span>

        <span className="text-xl text-white/30 transition-colors group-hover:text-[#d0ff00]">
          ↗
        </span>

      </div>

      <h3 className="mt-7 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-white/55">
        {desc}
      </p>

    </div>
  );
};

/* ============================================================
   MACHINE DETAILS MODAL
============================================================ */

const MachineDetailsModal = ({
  machine,
  onClose,
}: {
  machine: Machine;
  onClose: () => void;
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const gallery =
    machine.gallery && machine.gallery.length > 0
      ? machine.gallery
      : [machine.image];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  /* ============================================================
     WHATSAPP MESSAGE
  ============================================================ */

  const whatsappMessage = `Hello AE Techno Services, I am interested in the ${machine.title}. Please share the price, availability and technical details.`;

  const whatsappUrl = `https://wa.me/919321826572?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

      {/* MODAL */}
      <div
        className="relative z-10 max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#090909] shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur transition hover:bg-white hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative bg-white p-6 sm:p-10">

            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white">

              <img
                src={gallery[currentImage]}
                alt={machine.title}
                className="h-full w-full object-contain"
              />

            </div>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-8 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-8 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">

                {gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${
                      currentImage === index
                        ? "border-black"
                        : "border-black/10"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${machine.title} ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* INFO */}
          <div className="p-6 sm:p-10 lg:p-12">

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              {machine.category}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {machine.title}
            </h2>

            <div className="mt-4">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70">
                {machine.tag}
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/60">
              {machine.description}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
              >
                WhatsApp Us
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {/* CONTACT PAGE */}
              <Link
                to="/Contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" />
              </Link>

            </div>

            {/* APPLICATIONS */}
            {machine.applications &&
              machine.applications.length > 0 && (
                <div className="mt-10">

                  <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
                    Applications
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {machine.applications.map((application) => (
                      <span
                        key={application}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60"
                      >
                        {application}
                      </span>
                    ))}

                  </div>

                </div>
              )}

          </div>
        </div>

        {/* FEATURES + SPECS */}
        <div className="border-t border-white/10 p-6 sm:p-10 lg:p-12">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* FEATURES */}
            {machine.features &&
              machine.features.length > 0 && (
                <div>

                  <h3 className="text-xl font-semibold text-white">
                    Key Features
                  </h3>

                  <div className="mt-6 space-y-4">

                    {machine.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                          <Check className="h-3 w-3" />
                        </div>

                        <span className="text-sm text-white/60">
                          {feature}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              )}

            {/* SPECIFICATIONS */}
            {machine.specifications &&
              machine.specifications.length > 0 && (
                <div>

                  <h3 className="text-xl font-semibold text-white">
                    Technical Specifications
                  </h3>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">

                    {machine.specifications.map(
                      (spec, index) => (
                        <div
                          key={spec.name}
                          className={`grid grid-cols-2 gap-4 px-5 py-4 text-sm ${
                            index !==
                            machine.specifications!.length - 1
                              ? "border-b border-white/10"
                              : ""
                          }`}
                        >
                          <span className="text-white/40">
                            {spec.name}
                          </span>

                          <span className="text-right text-white/80">
                            {spec.value}
                          </span>
                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-white/10 bg-white/[0.03] p-6 sm:p-10">

          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Interested in this machine?
              </h3>

              <p className="mt-1 text-sm text-white/40">
                Contact us for pricing, availability and technical details.
              </p>

            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
            >
              WhatsApp Us
              <ArrowUpRight className="h-4 w-4" />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
};

/* ============================================================
   PORTFOLIO PAGE
============================================================ */

const PortfolioPage = () => {
  const [activeColor, setActiveColor] = useState<
    "all" | "color" | "machines"
  >("all");

  const [selectedMachine, setSelectedMachine] =
    useState<Machine | null>(null);

  const webWorks = useMemo(
    () => works.filter((w) => w.category === "web"),
    []
  );

  const graphicWorks = useMemo(
    () => works.filter((w) => w.category === "graphic"),
    []
  );

  const technologyWorks = useMemo(() => {
    if (activeColor === "all") {
      return works.filter(
        (w) =>
          w.category === "color" ||
          w.category === "machines"
      );
    }

    return works.filter(
      (w) => w.category === activeColor
    );
  }, [activeColor]);

  return (
    <>
      <div className="min-h-screen bg-black">

        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="relative min-h-screen bg-gradient-to-b from-[#7834c8] via-[#7834c8] to-black">

          <Navbar />

          <div className="mx-auto flex min-h-screen max-w-6xl -mt-28 flex-col items-center justify-center px-4 pt-24 pb-16 sm:pt-28">

            <h1 className="text-center text-8xl text-white sm:text-6xl md:text-9xl">
              Portfolio
            </h1>

            <div className="mx-auto mt-12 w-full max-w-xl text-center">

              <div className="h-px w-full bg-white/35" />

              <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-white/80">
                AE Techno Services
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Technology • Industrial • IT & Digital
              </p>

            </div>

          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-black/40 to-black" />

        </section>

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <section className="bg-black">

          <div className="mx-auto max-w-7xl px-6 py-20">

            {/* ==================================================
                SECTION 01
            ================================================== */}

            <SectionHeader
              eyebrow="SECTION 01"
              title="Technology & Industrial Portfolio"
              subtitle="Explore our range of color measurement equipment, industrial electronics, and professional technology solutions."
            />

            {/* FILTERS */}

            <div className="mb-10 flex flex-wrap gap-3">

              <button
                onClick={() => setActiveColor("all")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeColor === "all"
                    ? "bg-[#999998] text-white"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setActiveColor("color")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeColor === "color"
                    ? "bg-[#999998] text-white"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                Color Measurement
              </button>

              <button
                onClick={() => setActiveColor("machines")}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeColor === "machines"
                    ? "bg-[#999998] text-white"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                Machines
              </button>

            </div>

            <WorkGrid
              items={technologyWorks}
              onMachineOpen={setSelectedMachine}
            />

            <Divider />

            {/* ==================================================
                SECTION 02 - INDUSTRIES
            ================================================== */}

            <SectionHeader
              eyebrow="SECTION 02"
              title="Industries We Serve"
              subtitle="Technology and measurement solutions supporting quality, production, inspection, and workflow requirements across multiple industries."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <IndustryCard
                number="01"
                title="Printing & Packaging"
                desc="Color measurement, inspection, production, and technology solutions for printing and packaging applications."
              />

              <IndustryCard
                number="02"
                title="Plastics"
                desc="Color evaluation and quality-control solutions for plastic products, components, and materials."
              />

              <IndustryCard
                number="03"
                title="Paints & Coatings"
                desc="Color measurement and analysis solutions for maintaining consistency across paints and coating applications."
              />

              <IndustryCard
                number="04"
                title="Textile"
                desc="Color measurement and quality-control technology for textile and fabric applications."
              />

              <IndustryCard
                number="05"
                title="Inks"
                desc="Measurement and color-control solutions for ink development, production, and print consistency."
              />

            </div>

            <Divider />

            {/* ==================================================
                SECTION 03 - IT
            ================================================== */}

            <SectionHeader
              eyebrow="SECTION 03"
              title="IT & Digital Portfolio"
              subtitle="Websites, digital experiences, graphic design, and creative solutions built to help businesses establish and grow their digital presence."
            />

            {/* WEB */}

            <div className="mb-14">

              <div className="mb-7">

                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  Web Development
                </h3>

                <p className="mt-2 max-w-2xl text-sm text-white/60">
                  Modern websites and digital experiences designed around
                  business requirements and customer needs.
                </p>

              </div>

              <WorkGrid
                items={webWorks}
                onMachineOpen={setSelectedMachine}
              />

            </div>

            {/* GRAPHIC */}

            <div>

              <div className="mb-7">

                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  Graphic Design
                </h3>

                <p className="mt-2 max-w-2xl text-sm text-white/60">
                  Branding, social media creatives, posters, banners, and
                  visual communication for businesses and campaigns.
                </p>

              </div>

              <WorkGrid
                items={graphicWorks}
                onMachineOpen={setSelectedMachine}
              />

            </div>

          </div>

        </section>

      </div>

      {/* ========================================================
          CTA
      ======================================================== */}

      <section className="bg-black px-6 pb-20">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-8 md:p-10">

            <h3 className="text-2xl font-semibold text-black md:text-3xl">
              Looking for the Right Technology Solution?
            </h3>

            <p className="mt-3 max-w-2xl text-[#6b7280]">
              Whether you need color measurement equipment, industrial
              technology, a machine solution, or a complete digital product,
              AE Techno Services can help you find the right solution for your
              requirement.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                to="/Contact"
                className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/919321826572"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#e5e7eb] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#f3f4f6]"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <Collaborate />

      {/* ========================================================
          MACHINE DETAILS MODAL
      ======================================================== */}

      {selectedMachine && (
        <MachineDetailsModal
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
        />
      )}
    </>
  );
};

export default PortfolioPage;