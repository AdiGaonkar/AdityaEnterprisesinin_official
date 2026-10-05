
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Collaborate from "../components/Collaborate";

const products = [
  {
    id: "analog-watch",
    name: "Analog Watches",
    category: "TIMELESS TECHNOLOGY",
    subtitle: "Classic design. Modern selection.",
    description:
      "Explore our upcoming selection of analog watches designed for everyday wear, professional settings, and timeless style.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "smart-watch",
    name: "Smart Watches",
    category: "CONNECTED TECHNOLOGY",
    subtitle: "Technology on your wrist.",
    description:
      "Discover upcoming smart watches combining connectivity, activity tracking, productivity, and everyday convenience.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "smart-band",
    name: "Smart Bands",
    category: "FITNESS TECHNOLOGY",
    subtitle: "Track. Move. Improve.",
    description:
      "Lightweight wearable technology designed for activity tracking, fitness, and everyday movement.",
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "smart-ring",
    name: "Smart Rings",
    category: "WEARABLE TECHNOLOGY",
    subtitle: "Small form. Smart technology.",
    description:
      "Compact wearable technology designed to bring smart features into your everyday life without the bulk.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85",
  },
];

const PreRegister = () => {
  const navigate = useNavigate();

  /*
   * REGISTER
   * Uses string concatenation instead of a template literal
   * to avoid the Vercel/esbuild parsing issue.
   */
  const handleRegister = (product: string) => {
    navigate(
      "/PreRegisterForm?product=" + encodeURIComponent(product)
    );
  };

  /*
   * VIEW PRODUCT DETAILS
   */
  const handleViewDetails = (productId: string) => {
    navigate(
      "/ProductDetails?product=" + encodeURIComponent(productId)
    );
  };

  /*
   * SCROLL TO PRODUCT COLLECTION
   */
  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] font-sans text-white selection:bg-[#7834c8]/40 selection:text-white">
      {/* =====================================================
          AMBIENT BACKGROUND & GRID
      ====================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[5%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#7834c8]/15 blur-[180px]" />

        <div className="absolute right-[5%] top-[40%] h-[600px] w-[600px] rounded-full bg-[#7834c8]/10 blur-[200px]" />

        {/* Premium Grid */}
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
          HERO
      ====================================================== */}
      <section className="relative z-10 min-h-[85vh]">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-28 sm:px-10 md:min-h-[80vh] md:px-16">
          <div className="max-w-6xl">
            {/* EYEBROW */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#7834c8]/50 bg-gradient-to-r from-[#7834c8]/20 to-transparent px-5 py-2.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-300 shadow-[0_0_10px_#7834c8]" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-purple-200">
                Upcoming Collection
              </span>
            </div>

            {/* HEADING */}
            <h1 className="font-stacksansnotch text-[52px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[68px] md:text-[84px] lg:text-[100px]">
              Choose what
              <br />

              <span className="bg-gradient-to-br from-white via-white to-purple-500 bg-clip-text text-transparent">
                comes next.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-[620px] text-base leading-relaxed text-white/70 sm:text-lg md:leading-loose">
              We're exploring our next collection of watches and wearable
              technology. Tell us what you're interested in and help us decide
              what comes next.
            </p>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <button
                onClick={scrollToCollection}
                className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#7834c8] to-[#6127a3] px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_40px_rgba(120,52,200,.3)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_60px_rgba(120,52,200,.5)] hover:ring-2 hover:ring-purple-400/50"
              >
                Explore Collection

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>

              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_#7834c8]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
                  No payment required
                </span>
              </div>
            </div>

            {/* HERO INFO */}
            <div className="mt-20 flex flex-wrap gap-x-14 gap-y-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Registration
                </p>

                <p className="mt-2 text-sm font-semibold text-white/90">
                  Free
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Payment
                </p>

                <p className="mt-2 text-sm font-semibold text-white/90">
                  Not Required
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Status
                </p>

                <p className="mt-2 text-sm font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(120,52,200,0.5)]">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATEMENT SECTION
      ====================================================== */}
      <section className="relative z-10 border-y border-white/[0.05] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:px-16 md:py-32">
          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
                Your Demand
              </p>

              <p className="mt-5 text-base leading-relaxed text-white/60">
                We want to know what you want before we decide what comes next.
              </p>
            </div>

            <h2 className="font-stacksansnotch text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
              You choose.
              <br />

              <span className="text-white/30">We source.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* =====================================================
          COLLECTION
      ====================================================== */}
      <section
        id="collection"
        className="relative z-10 px-6 py-24 sm:px-10 md:px-16 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-10 bg-gradient-to-r from-[#7834c8] to-transparent" />

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
                  What we're exploring
                </p>
              </div>

              <h2 className="font-stacksansnotch text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Upcoming Products
              </h2>
            </div>

            <p className="max-w-md text-base leading-relaxed text-white/70">
              Choose a category that interests you. Register your preference
              and we'll keep you updated when the collection becomes available.
            </p>
          </div>

          {/* PRODUCTS */}
          <div className="grid gap-8 md:grid-cols-2">
            {products.map((product, index) => (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7834c8]/60 hover:shadow-[0_30px_60px_rgba(120,52,200,0.15)]"
              >
                {/* IMAGE */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
                  />

                  {/* Purple subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#7834c8]/0 transition-colors duration-500 group-hover:bg-[#7834c8]/20" />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                  {/* NUMBER */}
                  <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-colors group-hover:border-[#7834c8]/50">
                    <span className="text-[10px] font-extrabold text-white">
                      0{index + 1}
                    </span>
                  </div>

                  {/* STATUS */}
                  <div className="absolute right-6 top-6">
                    <span className="rounded-full border border-purple-400/30 bg-black/60 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-purple-300 backdrop-blur-md">
                      Coming Soon
                    </span>
                  </div>

                  {/* IMAGE TITLE */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400">
                      {product.category}
                    </p>

                    <h3 className="font-stacksansnotch text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-4xl">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 pt-4">
                  <p className="text-base font-semibold text-white/90">
                    {product.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {product.description}
                  </p>

                  {/* FOOTER / ACTIONS */}
                  <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Register your interest
                    </span>

                    <div className="flex items-center gap-3">
                      {/* VIEW DETAILS */}
                      <button
                        onClick={() => handleViewDetails(product.id)}
                        className="group/button inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white"
                      >
                        View Details

                        <span className="text-sm transition-transform duration-300 group-hover/button:translate-x-1">
                          →
                        </span>
                      </button>

                      {/* REGISTER */}
                      <button
                        onClick={() => handleRegister(product.name)}
                        className="group/button inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-gradient-to-r hover:from-[#7834c8] hover:to-[#6127a3] hover:text-white hover:shadow-[0_0_20px_rgba(120,52,200,0.4)] hover:ring-2 hover:ring-purple-400/50"
                      >
                        Register

                        <span className="text-base transition-transform duration-300 group-hover/button:translate-x-1.5">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="relative z-10 border-y border-white/[0.05] bg-black/40 px-6 py-24 backdrop-blur-2xl sm:px-10 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr]">
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-gradient-to-r from-[#7834c8] to-transparent" />

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
                  Simple Process
                </p>
              </div>

              <h2 className="mt-6 font-stacksansnotch text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                Tell us.
                <br />

                <span className="text-white/40">
                  We'll take it from there.
                </span>
              </h2>
            </div>

            {/* RIGHT */}
            <div className="divide-y divide-white/10 border-y border-white/10">
              {[
                {
                  number: "01",
                  title: "Choose",
                  text: "Select the product category you're interested in.",
                },
                {
                  number: "02",
                  title: "Register",
                  text: "Share your details and tell us what you're looking for.",
                },
                {
                  number: "03",
                  title: "We source",
                  text: "Your interest helps us plan our upcoming collection.",
                },
                {
                  number: "04",
                  title: "Get notified",
                  text: "We'll contact you when the selected collection becomes available.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="-mx-6 grid grid-cols-[50px_1fr] gap-6 rounded-2xl px-6 py-8 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-sm font-extrabold text-purple-400 drop-shadow-[0_0_10px_rgba(120,52,200,0.5)]">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 max-w-lg text-base leading-relaxed text-white/50">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative z-10 overflow-hidden bg-[#050505]">
        {/* DECORATIVE GLOWS */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-[#7834c8]/20 bg-[#7834c8]/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-10 h-[600px] w-[600px] rounded-full bg-[#7834c8]/10 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 text-center sm:px-10 md:px-16 md:py-48">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">
            Pre-Registration
          </p>

          <h2 className="mx-auto mt-6 max-w-5xl font-stacksansnotch text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-8xl">
            Your demand.
            <br />

            <span className="bg-gradient-to-br from-white/40 to-white/10 bg-clip-text text-transparent">
              Our next collection.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60">
            Register your interest today. No payment. No purchase commitment.
            Just tell us what you'd like to see next.
          </p>

          <button
            onClick={scrollToCollection}
            className="group mt-12 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#7834c8] to-[#6127a3] px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_40px_rgba(120,52,200,.3)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_60px_rgba(120,52,200,.5)] hover:ring-2 hover:ring-purple-400/50"
          >
            Explore Collection

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </div>
      </section>

      {/* =====================================================
          COLLABORATE
      ====================================================== */}
      <section className="relative z-10 border-t border-white/10 bg-[#050505]">
        <Collaborate />
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050505] px-6 py-12 sm:px-10 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          {/* BRAND */}
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

          {/* RIGHT */}
          <div className="md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Upcoming Collection
            </p>

            <p className="mt-2.5 text-sm font-semibold text-white/80">
              Watches & Wearable Technology
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default PreRegister;
