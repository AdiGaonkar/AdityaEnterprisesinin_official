import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

type Product = {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  availability: string;
  technology: string;
  idealFor: string;
};

const products: Product[] = [
  {
    id: "analog-watch",
    name: "Analog Watches",
    category: "TIMELESS TECHNOLOGY",
    subtitle: "Classic design. Modern selection.",
    description:
      "Explore our upcoming selection of analog watches designed for everyday wear, professional settings, and timeless style. We're carefully exploring designs that combine classic aesthetics with dependable everyday functionality.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      "Classic analog design",
      "Everyday wear focused",
      "Professional styling",
      "Multiple design options",
    ],
    availability: "Coming Soon",
    technology: "Traditional Analog",
    idealFor: "Everyday & Professional Wear",
  },
  {
    id: "smart-watch",
    name: "Smart Watches",
    category: "CONNECTED TECHNOLOGY",
    subtitle: "Technology on your wrist.",
    description:
      "Discover our upcoming selection of smart watches combining connectivity, activity tracking, productivity, and everyday convenience. We're exploring practical wearable technology designed for modern lifestyles.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      "Connected wearable technology",
      "Activity tracking",
      "Smart everyday features",
      "Modern touchscreen designs",
    ],
    availability: "Coming Soon",
    technology: "Smart Wearable",
    idealFor: "Fitness, Work & Everyday Use",
  },
  {
    id: "smart-band",
    name: "Smart Bands",
    category: "FITNESS TECHNOLOGY",
    subtitle: "Track. Move. Improve.",
    description:
      "Lightweight wearable technology designed for activity tracking, fitness, and everyday movement. We're exploring comfortable and practical smart bands for people who want useful technology without unnecessary bulk.",
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      "Lightweight wearable design",
      "Activity tracking",
      "Fitness focused",
      "Comfortable everyday use",
    ],
    availability: "Coming Soon",
    technology: "Fitness Wearable",
    idealFor: "Fitness & Active Lifestyle",
  },
  {
    id: "smart-ring",
    name: "Smart Rings",
    category: "WEARABLE TECHNOLOGY",
    subtitle: "Small form. Smart technology.",
    description:
      "Compact wearable technology designed to bring smart features into your everyday life without the bulk. We're exploring sleek smart rings that combine convenience, subtle design, and modern wearable technology.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=90",
    highlights: [
      "Compact wearable design",
      "Minimal everyday form",
      "Smart technology",
      "Discreet wearable experience",
    ],
    availability: "Coming Soon",
    technology: "Smart Wearable",
    idealFor: "Everyday & Active Lifestyle",
  },
];

const ProductDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product");

  const product = products.find((item) => item.id === productId);

  const handleRegister = () => {
    if (!product) return;

    navigate(
      "/PreRegisterForm?product=" + encodeURIComponent(product.name)
    );
  };

  const handleBack = () => {
    navigate("/Pre-register");
  };

  // ---------------------------------------------------------
  // PRODUCT NOT FOUND
  // ---------------------------------------------------------

  if (!product) {
    return (
      <main className="min-h-screen bg-[#050505] font-sans text-white">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#7834c8]/15 blur-[180px]" />

          <div className="absolute bottom-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-[#7834c8]/10 blur-[180px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-50 px-4 pt-6 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Navbar />
          </div>
        </div>

        <section className="relative z-10 flex min-h-[75vh] items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">
              Product Not Found
            </p>

            <h1 className="mt-6 font-stacksansnotch text-5xl font-extrabold tracking-tight sm:text-6xl">
              We couldn't find
              <br />
              <span className="text-white/30">that product.</span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-white/60">
              The product you're looking for may no longer be available or the
              link may be incorrect.
            </p>

            <button
              type="button"
              onClick={handleBack}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-gradient-to-r hover:from-[#7834c8] hover:to-[#6127a3] hover:text-white hover:shadow-[0_0_30px_rgba(120,52,200,0.4)]"
            >
              ← Back to Collection
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] font-sans text-white selection:bg-[#7834c8]/40 selection:text-white">
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[5%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#7834c8]/15 blur-[180px]" />

        <div className="absolute right-[5%] top-[45%] h-[600px] w-[600px] rounded-full bg-[#7834c8]/10 blur-[200px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <div className="relative z-50 px-4 pt-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Navbar />
        </div>
      </div>

      {/* =====================================================
          BACK BUTTON
      ====================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-10 sm:px-10 md:px-16">
        <button
          type="button"
          onClick={handleBack}
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white"
        >
          <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          Back to Collection
        </button>
      </div>

      {/* =====================================================
          HERO PRODUCT
      ====================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-10 md:px-16 md:pb-32 md:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* IMAGE */}
          <div className="relative">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7834c8]/20 blur-[100px]" />

            <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />

              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/3] h-full w-full object-cover opacity-75 transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Product number */}
              <div className="absolute left-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl">
                <span className="text-[10px] font-extrabold">
                  {product.id === "analog-watch"
                    ? "01"
                    : product.id === "smart-watch"
                    ? "02"
                    : product.id === "smart-band"
                    ? "03"
                    : "04"}
                </span>
              </div>

              {/* Status */}
              <div className="absolute right-6 top-6 z-20">
                <span className="rounded-full border border-purple-400/30 bg-black/60 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-purple-300 backdrop-blur-xl">
                  {product.availability}
                </span>
              </div>

              {/* Bottom image text */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-7 sm:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
                  {product.category}
                </p>

                <h2 className="mt-3 font-stacksansnotch text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {product.name}
                </h2>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#7834c8]/40 bg-[#7834c8]/10 px-5 py-2.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_#7834c8]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-200">
                Upcoming Product
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-8 font-stacksansnotch text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
              {product.name}
            </h1>

            <p className="mt-5 text-lg font-medium text-white/60 sm:text-xl">
              {product.subtitle}
            </p>

            {/* Description */}
            <p className="mt-8 max-w-xl text-base leading-8 text-white/60">
              {product.description}
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleRegister}
                className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#7834c8] to-[#6127a3] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_40px_rgba(120,52,200,.3)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_60px_rgba(120,52,200,.5)] hover:ring-2 hover:ring-purple-400/50"
              >
                Register Your Interest

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Explore More
              </button>
            </div>

            {/* Trust info */}
            <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                  Registration
                </p>

                <p className="mt-2 text-sm font-semibold text-white/90">
                  Free
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                  Payment
                </p>

                <p className="mt-2 text-sm font-semibold text-white/90">
                  Not Required
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md sm:col-span-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                  Status
                </p>

                <p className="mt-2 text-sm font-semibold text-purple-400">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}
      <section className="relative z-10 border-y border-white/[0.05] bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:px-16 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-gradient-to-r from-[#7834c8] to-transparent" />

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
                  Product Overview
                </p>
              </div>

              <h2 className="mt-6 font-stacksansnotch text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Designed around
                <br />
                <span className="text-white/30">what matters.</span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
                We're exploring products that balance design, functionality,
                and everyday usability. Your interest helps us understand what
                should come next.
              </p>
            </div>

            {/* RIGHT */}
            <div>
              {/* HIGHLIGHTS */}
              <div className="border-y border-white/10">
                {product.highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-6 border-b border-white/10 py-6 last:border-b-0"
                  >
                    <span className="text-[10px] font-extrabold text-purple-400">
                      0{index + 1}
                    </span>

                    <span className="text-base font-medium text-white/80">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SPECS / INFORMATION
      ====================================================== */}
      <section className="relative z-10 px-6 py-24 sm:px-10 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
              At a Glance
            </p>

            <h2 className="mt-5 font-stacksansnotch text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Product Details
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-[#090909] p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                Category
              </p>

              <p className="mt-4 text-base font-semibold text-white">
                {product.category}
              </p>
            </div>

            <div className="bg-[#090909] p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                Technology
              </p>

              <p className="mt-4 text-base font-semibold text-white">
                {product.technology}
              </p>
            </div>

            <div className="bg-[#090909] p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                Ideal For
              </p>

              <p className="mt-4 text-base font-semibold text-white">
                {product.idealFor}
              </p>
            </div>

            <div className="bg-[#090909] p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                Availability
              </p>

              <p className="mt-4 text-base font-semibold text-purple-400">
                {product.availability}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative z-10 overflow-hidden border-t border-white/10 bg-[#050505]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7834c8]/10 blur-[160px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center sm:px-10 md:py-40">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
            Your Interest Matters
          </p>

          <h2 className="mx-auto mt-6 max-w-4xl font-stacksansnotch text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Want to see
            <br />
            <span className="bg-gradient-to-br from-white/50 to-white/10 bg-clip-text text-transparent">
              {product.name}?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/50">
            Register your interest and we'll keep you updated when this
            collection becomes available.
          </p>

          <button
            type="button"
            onClick={handleRegister}
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition-all duration-500 hover:bg-gradient-to-r hover:from-[#7834c8] hover:to-[#6127a3] hover:text-white hover:shadow-[0_15px_60px_rgba(120,52,200,0.4)] hover:ring-2 hover:ring-purple-400/50"
          >
            Register Your Interest

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </button>

          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
            No payment required · No purchase commitment
          </p>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505] px-6 py-12 sm:px-10 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white to-white/80 text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <span className="text-[10px] font-extrabold tracking-wider">
                  AE
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Aditya Enterprises
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
                  Techno Services
                </p>
              </div>
            </div>

            <p className="mt-5 text-[11px] font-medium text-white/40">
              Grow your dreams.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Product
            </p>

            <p className="mt-2.5 text-sm font-semibold text-white/80">
              {product.name}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ProductDetails;
