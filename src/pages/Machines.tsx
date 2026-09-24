import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Collaborate from "@/components/Collaborate";
import {
  Search,
  X,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

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

/* ============================================================
   MACHINE DATA
============================================================ */

const machines: Machine[] = [
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
    title: "Colourimeter",

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
    id: "light-box",
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
   SECTION HEADER
============================================================ */

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-10">
    <div className="flex items-center gap-4">
      <h2 className="text-2xl sm:text-3xl font-semibold">
        {title}
      </h2>

      <div className="h-px flex-1 bg-white/10" />
    </div>

    {subtitle && (
      <p className="mt-2 text-sm text-white/50">
        {subtitle}
      </p>
    )}
  </div>
);

/* ============================================================
   MACHINE CARD
============================================================ */

const MachineCard = ({
  machine,
  onOpen,
}: {
  machine: Machine;
  onOpen: (machine: Machine) => void;
}) => {
  return (
    <button
      onClick={() => onOpen(machine)}
      className="group w-full text-left"
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-2 hover:border-white/20">

        {/* IMAGE */}
        <div className="relative aspect-[4/3] overflow-hidden bg-white">

          <img
            src={machine.image}
            alt={machine.title}
            className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

          {/* Tag */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
              {machine.tag}
            </span>
          </div>

          {/* View */}
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5">

          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
                {machine.category}
              </p>

              <h3 className="text-lg font-semibold text-white">
                {machine.title}
              </h3>
            </div>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-white/50">
            {machine.shortDescription}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-white/80">
            View Details
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </button>
  );
};

/* ============================================================
   MACHINE DETAILS MODAL
============================================================ */

const MachineModal = ({
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* MODAL */}
      <div
        className="relative z-10 max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#090909] shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur transition hover:bg-white hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* IMAGE SIDE */}
          <div className="relative bg-white p-6 sm:p-10">

            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white">
              <img
                src={gallery[currentImage]}
                alt={machine.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Navigation */}
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

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${
                      currentImage === index
                        ? "border-white"
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

          {/* INFORMATION SIDE */}
          <div className="p-6 sm:p-10 lg:p-12">

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              {machine.category}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
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

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="mailto:sales@adityaenterprisesin.com?subject=Product Enquiry"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/80"
              >
                <Mail className="h-4 w-4" />
                Request a Quote
              </a>

              <a
                href="tel:+919321826572"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </a>
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

        {/* DETAILS */}
        <div className="border-t border-white/10 p-6 sm:p-10 lg:p-12">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* FEATURES */}
            {machine.features &&
              machine.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold">
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
                  <h3 className="text-xl font-semibold">
                    Technical Specifications
                  </h3>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                    {machine.specifications.map((spec, index) => (
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
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-white/10 bg-white/[0.03] p-6 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <h3 className="text-lg font-semibold">
                Interested in this machine?
              </h3>

              <p className="mt-1 text-sm text-white/40">
                Contact us for pricing, availability and technical details.
              </p>
            </div>

            <a
              href={`mailto:sales@adityaenterprisesin.com?subject=Enquiry - ${encodeURIComponent(
                machine.title
              )}`}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/80"
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MAIN PAGE
============================================================ */

const Machines = () => {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [selectedMachine, setSelectedMachine] =
    useState<Machine | null>(null);

  const categories = [
    "All",
    ...Array.from(
      new Set(machines.map((machine) => machine.category))
    ),
  ];

  const filteredMachines = useMemo(() => {
    return machines.filter((machine) => {
      const matchesCategory =
        activeCategory === "All" ||
        machine.category === activeCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        machine.title.toLowerCase().includes(searchText) ||
        machine.category.toLowerCase().includes(searchText) ||
        machine.tag.toLowerCase().includes(searchText) ||
        machine.shortDescription
          .toLowerCase()
          .includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <div className="min-h-screen bg-black text-white">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#7834c8] via-[#7834c8] to-black">

          <Navbar />

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:pt-32">

            <p className="text-[10px] uppercase tracking-[0.3em] text-white">
              Industrial & Laboratory Equipment
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              Machines & Equipment
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white sm:text-base">
              Explore our range of precision instruments, testing
              equipment, color measurement systems, and laboratory
              machines designed for industrial and professional
              applications.
            </p>

            {/* SEARCH */}
            <div className="relative mt-8 max-w-xl">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />

              <input
                type="text"
                placeholder="Search machines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white/70 py-4 pl-11 pr-5 text-sm text-white outline-none backdrop-blur placeholder:text-black/40 focus:bg-white"
              />
            </div>

            {/* FILTERS */}
            <div className="mt-6 flex flex-wrap gap-2">

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeCategory === category
                      ? "bg-black text-white"
                      : "bg-black/10 text-white hover:bg-black/20"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
        </section>

        {/* =====================================================
            PRODUCTS
        ====================================================== */}
        <section className="bg-black">

          <div className="mx-auto max-w-7xl px-6 py-16">

            <SectionHeader
              title="Our Equipment"
              subtitle={`${filteredMachines.length} equipment ${
                filteredMachines.length === 1
                  ? "product"
                  : "products"
              } available`}
            />

            {filteredMachines.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center">
                <p className="text-white/50">
                  No machines found.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMachines.map((machine) => (
                  <MachineCard
                    key={machine.id}
                    machine={machine}
                    onOpen={setSelectedMachine}
                  />
                ))}
              </div>
            )}

            {/* =================================================
                CTA
            ================================================== */}
            <div className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-12">

              <div className="max-w-2xl">

                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Need a specific machine?
                </p>

                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Looking for the right equipment?
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/50">
                  Contact our team for product availability,
                  specifications, pricing, and technical assistance.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                  <a
                    href="mailto:sales@adityaenterprisesin.com"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/80"
                  >
                    <Mail className="h-4 w-4" />
                    sales@adityaenterprisesin.com
                  </a>

                  <a
                    href="tel:+919321826572"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    +91 9321826572
                  </a>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            MACHINE DETAILS MODAL
        ====================================================== */}
        {selectedMachine && (
          <MachineModal
            machine={selectedMachine}
            onClose={() => setSelectedMachine(null)}
          />
        )}
      </div>

      {/* =======================================================
          FOOTER
      ======================================================== */}
      <Collaborate />
    </>
  );
};

export default Machines;