import React from "react";
import { useNavigate } from "react-router-dom";

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

  const handleRegister = (product: string) => {
    navigate(
      `/PreRegisterForm?product=${encodeURIComponent(product)}`
    );
  };

  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black font-sans text-white">

      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-yellow-500/[0.035] blur-[150px]" />

        <div className="absolute right-[5%] top-[50%] h-[500px] w-[500px] rounded-full bg-yellow-500/[0.025] blur-[170px]" />

      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <div className="relative z-50 px-4 pt-6 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-center justify-between">

            {/* BRAND */}

            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:bg-yellow-400">

                <span className="text-[10px] font-bold">
                  AE
                </span>

              </div>

              <div className="hidden text-left sm:block">

                <p className="text-xs font-semibold tracking-tight text-white">
                  Aditya Enterprises
                </p>

                <p className="mt-0.5 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                  Techno Services
                </p>

              </div>

            </button>


            {/* NAV */}

            <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-xl md:flex">

              <button
                onClick={() => navigate("/")}
                className="rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.12em] text-gray-500 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/Portfolio")}
                className="rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.12em] text-gray-500 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                Products
              </button>

              <button
                className="rounded-full bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black"
              >
                Pre-Register
              </button>

              <button
                onClick={() => navigate("/Contact")}
                className="rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.12em] text-gray-500 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                Contact
              </button>

            </nav>


            {/* RIGHT SIDE */}

            <div className="flex items-center gap-3">

              <span className="hidden text-[9px] uppercase tracking-[0.2em] text-gray-600 lg:block">
                Aditya Enterprises
              </span>

              <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.03]" />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 min-h-[85vh]">

        <div className="mx-auto flex max-w-7xl items-center px-6 py-28 sm:px-10 md:min-h-[80vh] md:px-16">

          <div className="max-w-6xl">

            {/* EYEBROW */}

            <div className="mb-7 flex items-center gap-4">

              <div className="h-px w-12 bg-yellow-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Upcoming Collection
              </span>

            </div>


            {/* HEADING */}

            <h1 className="font-stacksansnotch text-[52px] font-medium leading-[1.02] tracking-tight text-white sm:text-[68px] md:text-[84px] lg:text-[100px]">

              Choose what
              <br />

              <span className="text-gray-400">
                comes next.
              </span>

            </h1>


            {/* DESCRIPTION */}

            <p className="mt-8 max-w-[620px] text-base font-light leading-relaxed text-gray-400 sm:text-lg">

              We're exploring our next collection of watches and wearable
              technology. Tell us what you're interested in and help us decide
              what comes next.

            </p>


            {/* BUTTONS */}

            <div className="mt-10 flex flex-wrap items-center gap-4">

              <button
                onClick={scrollToCollection}
                className="group inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-yellow-400"
              >

                Explore Collection

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>


              <div className="flex items-center gap-3 rounded-full border border-white/10 px-6 py-4">

                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />

                <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                  No payment required
                </span>

              </div>

            </div>


            {/* HERO INFO */}

            <div className="mt-16 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-6">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  Registration
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Free
                </p>

              </div>


              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  Payment
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Not Required
                </p>

              </div>


              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  Status
                </p>

                <p className="mt-1 text-xs text-yellow-500">
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

      <section className="relative z-10 border-y border-white/[0.07] bg-[#080808]">

        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:px-16 md:py-32">

          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">
                Your Demand
              </p>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                We want to know what you want before we decide what comes
                next.
              </p>

            </div>


            <h2 className="font-stacksansnotch text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">

              You choose.
              <br />

              <span className="text-gray-600">
                We source.
              </span>

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

          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <div className="mb-4 flex items-center gap-3">

                <div className="h-px w-8 bg-yellow-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">
                  What we're exploring
                </p>

              </div>

              <h2 className="font-stacksansnotch text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
                Upcoming Products
              </h2>

            </div>


            <p className="max-w-md text-sm leading-6 text-gray-500">

              Choose a category that interests you. Register your preference
              and we'll keep you updated when the collection becomes
              available.

            </p>

          </div>


          {/* PRODUCTS */}

          <div className="grid gap-5 md:grid-cols-2">

            {products.map((product, index) => (

              <article
                key={product.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-yellow-500/40"
              >

                {/* IMAGE */}

                <div className="relative aspect-[16/10] overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-65"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />


                  {/* NUMBER */}

                  <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md">

                    <span className="text-[9px] font-bold text-gray-400">
                      0{index + 1}
                    </span>

                  </div>


                  {/* STATUS */}

                  <div className="absolute right-5 top-5">

                    <span className="rounded-full border border-yellow-500/20 bg-black/50 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-500 backdrop-blur-md">
                      Coming Soon
                    </span>

                  </div>


                  {/* IMAGE TITLE */}

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                      {product.category}
                    </p>

                    <h3 className="font-stacksansnotch text-2xl font-medium leading-tight text-white sm:text-3xl">

                      {product.name}

                    </h3>

                  </div>

                </div>


                {/* CONTENT */}

                <div className="p-6 sm:p-7">

                  <p className="text-sm font-medium text-gray-300">
                    {product.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-6 text-gray-500 sm:text-sm">
                    {product.description}
                  </p>


                  {/* FOOTER */}

                  <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                    <span className="text-[9px] uppercase tracking-[0.18em] text-gray-600">
                      Register your interest
                    </span>


                    <button
                      onClick={() => handleRegister(product.name)}
                      className="group/button inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-yellow-400"
                    >

                      Register

                      <span className="text-base transition-transform duration-300 group-hover/button:translate-x-1">
                        →
                      </span>

                    </button>

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

      <section className="relative z-10 bg-[#080808] px-6 py-24 sm:px-10 md:px-16 md:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-3">

                <div className="h-px w-8 bg-yellow-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">
                  Simple Process
                </p>

              </div>

              <h2 className="mt-5 font-stacksansnotch text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl">

                Tell us.
                <br />

                <span className="text-gray-600">
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
                  className="group grid grid-cols-[45px_1fr] gap-5 py-7"
                >

                  <span className="text-[10px] font-bold text-yellow-500">
                    {step.number}
                  </span>

                  <div>

                    <h3 className="text-base font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500 transition-colors duration-300 group-hover:text-gray-300">
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

      <section className="relative z-10 overflow-hidden border-t border-white/10 bg-[#0a0a0a]">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-yellow-500/10" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-yellow-500/10" />

        <div className="pointer-events-none absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-yellow-500/[0.025] blur-[120px]" />


        <div className="relative mx-auto max-w-7xl px-6 py-28 text-center sm:px-10 md:px-16 md:py-36">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">
            Pre-Registration
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl font-stacksansnotch text-5xl font-medium leading-[1] tracking-tight sm:text-6xl md:text-8xl">

            Your demand.
            <br />

            <span className="text-gray-600">
              Our next collection.
            </span>

          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-gray-500">
            Register your interest today. No payment. No purchase commitment.
            Just tell us what you'd like to see next.
          </p>

          <button
            onClick={scrollToCollection}
            className="group mt-9 inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-yellow-400"
          >

            Explore Collection

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </button>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-white/10 bg-black px-6 py-10 sm:px-10 md:px-16">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">

                <span className="text-[9px] font-bold">
                  AE
                </span>

              </div>

              <div>

                <p className="text-xs font-semibold">
                  Aditya Enterprises
                </p>

                <p className="text-[8px] uppercase tracking-[0.2em] text-gray-600">
                  Techno Services
                </p>

              </div>

            </div>

            <p className="mt-4 text-[10px] text-gray-600">
              Grow your dreams.
            </p>

          </div>


          {/* RIGHT */}

          <div className="md:text-right">

            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-700">
              Upcoming Collection
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Watches & Wearable Technology
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
};

export default PreRegister;
