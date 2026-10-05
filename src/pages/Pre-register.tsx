import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: "analog-watch",
    name: "Analog Watches",
    shortName: "Analog",
    subtitle: "Timeless design. Everyday style.",
    description:
      "Explore a curated collection of classic analog watches designed for everyday and formal wear.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "smart-watch",
    name: "Smart Watches",
    shortName: "Smart Watches",
    subtitle: "Technology on your wrist.",
    description:
      "Modern smart watches built around connectivity, activity tracking and everyday convenience.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "smart-band",
    name: "Smart Bands",
    shortName: "Smart Bands",
    subtitle: "Track. Move. Improve.",
    description:
      "Lightweight wearable technology designed for fitness, activity and everyday tracking.",
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "smart-ring",
    name: "Smart Rings",
    shortName: "Smart Rings",
    subtitle: "Small form. Smart technology.",
    description:
      "A new generation of compact wearable technology designed to fit naturally into everyday life.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
  },
];

const PreRegister = () => {
  const navigate = useNavigate();

  const handleRegister = (product: string) => {
    navigate(
      `/pre-register/form?product=${encodeURIComponent(product)}`
    );
  };

  const scrollToCollection = () => {
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">

      {/* =====================================================
          GLOBAL AMBIENT GLOW
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div className="absolute left-[15%] top-[15%] h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[180px]" />

        <div className="absolute right-[5%] top-[35%] h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[180px]" />

        <div className="absolute bottom-[5%] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[200px]" />

      </div>


      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <header className="relative z-50 px-5 pt-5 md:px-8">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
              <span className="text-[10px] font-bold">
                AE
              </span>
            </div>

            <div className="hidden sm:block text-left">

              <p className="text-[11px] font-semibold tracking-tight">
                Aditya Enterprises
              </p>

              <p className="text-[8px] uppercase tracking-[0.18em] text-white/35">
                Techno Services
              </p>

            </div>

          </button>


          {/* Pill Navigation */}

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl md:flex">

            <button
              onClick={() => navigate("/")}
              className="rounded-full px-5 py-2 text-[10px] text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              Products
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-full px-5 py-2 text-[10px] text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              Services
            </button>

            <button
              className="rounded-full bg-white/10 px-5 py-2 text-[10px] text-white"
            >
              Pre-Register
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-full px-5 py-2 text-[10px] text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              Contact
            </button>

          </nav>


          {/* Right circle */}

          <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.04]" />

        </div>

      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10">

        <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-20 md:px-10">

          <div className="relative w-full">

            {/* Hero purple glow */}

            <div className="pointer-events-none absolute left-[25%] top-[35%] h-[300px] w-[500px] rounded-full bg-purple-700/30 blur-[130px]" />


            {/* Small eyebrow */}

            <div className="relative mb-7 flex items-center gap-3">

              <span className="h-px w-8 bg-purple-500" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-white/45">
                Upcoming Collection · Watches · Wearables
              </p>

            </div>


            {/* Heading */}

            <h1 className="relative max-w-5xl text-[3.5rem] font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[7.5rem]">

              Choose what
              <br />

              <span className="bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent">
                comes next.
              </span>

            </h1>


            {/* Description */}

            <div className="relative mt-8 flex max-w-2xl flex-col gap-7 md:flex-row md:items-end">

              <p className="max-w-xl text-sm leading-7 text-white/40">
                We are exploring a new collection of watches and wearable
                technology. Tell us what interests you and help shape what
                comes next.
              </p>

              <button
                onClick={scrollToCollection}
                className="group flex w-fit items-center gap-3 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-white"
              >

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition group-hover:border-purple-500/60 group-hover:bg-purple-600/20">
                  ↓
                </span>

                Explore

              </button>

            </div>


            {/* Hero bottom info */}

            <div className="relative mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/[0.07] pt-6">

              <div>

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Registration
                </p>

                <p className="mt-1 text-xs text-white/60">
                  Completely Free
                </p>

              </div>

              <div>

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Payment
                </p>

                <p className="mt-1 text-xs text-white/60">
                  Not Required
                </p>

              </div>

              <div>

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Availability
                </p>

                <p className="mt-1 text-xs text-white/60">
                  Coming Soon
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PURPLE INTRO SECTION
      ====================================================== */}

      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-purple-700 via-purple-700 to-purple-900">

        {/* Glow */}

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/20 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">

          <p className="text-[9px] uppercase tracking-[0.35em] text-white/50">
            Your choice matters
          </p>

          <h2 className="mt-6 max-w-5xl text-4xl font-medium leading-[1] tracking-[-0.045em] sm:text-5xl md:text-7xl">

            You choose.
            <br />

            <span className="text-white/45">
              We source.
            </span>

          </h2>

          <p className="mt-8 max-w-xl text-sm leading-7 text-white/55">
            Your interest helps us understand what people actually want.
            Register for a category and we'll keep you updated when the
            collection becomes available.
          </p>

        </div>

      </section>


      {/* =====================================================
          COLLECTION
      ====================================================== */}

      <section
        id="collection"
        className="relative z-10 px-6 py-24 md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}

          <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div>

              <p className="text-[9px] uppercase tracking-[0.35em] text-purple-400">
                Upcoming Products
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl">
                Find your next.
              </h2>

            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Select a category you're interested in and register your
              preference. No payment or purchase commitment is required.
            </p>

          </div>


          {/* Product grid */}

          <div className="grid gap-5 md:grid-cols-2">

            {products.map((product, index) => (

              <article
                key={product.id}
                className="group relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-white/[0.035] transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.055]"
              >

                {/* Image */}

                <div className="relative aspect-[16/10] overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover opacity-75 grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />

                  {/* Image gradient */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080609] via-transparent to-black/10" />


                  {/* Purple glow */}

                  <div className="absolute -bottom-20 left-1/2 h-40 w-60 -translate-x-1/2 rounded-full bg-purple-700/30 blur-[70px] transition duration-500 group-hover:bg-purple-600/50" />


                  {/* Number */}

                  <div className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-md">

                    <span className="text-[9px] text-white/60">
                      0{index + 1}
                    </span>

                  </div>


                  {/* Status */}

                  <div className="absolute right-5 top-5">

                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                      Coming Soon
                    </span>

                  </div>

                </div>


                {/* Card content */}

                <div className="p-7 md:p-8">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-purple-400">
                    {product.subtitle}
                  </p>

                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.025em]">
                    {product.name}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-6 text-white/35">
                    {product.description}
                  </p>


                  {/* Button */}

                  <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-6">

                    <span className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                      Register interest
                    </span>

                    <button
                      onClick={() => handleRegister(product.name)}
                      className="group/button flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-600/20"
                    >

                      Register

                      <span className="transition-transform duration-300 group-hover/button:translate-x-1">
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

      <section className="relative z-10 border-t border-white/[0.06] px-6 py-24 md:px-10 md:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">

            {/* Left */}

            <div>

              <p className="text-[9px] uppercase tracking-[0.35em] text-purple-400">
                How it works
              </p>

              <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                Simple.
                <br />

                <span className="text-white/30">
                  No commitment.
                </span>
              </h2>

            </div>


            {/* Steps */}

            <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">

              {[
                {
                  number: "01",
                  title: "Choose",
                  text: "Select the product category that interests you.",
                },
                {
                  number: "02",
                  title: "Register",
                  text: "Share your details and preferred category with us.",
                },
                {
                  number: "03",
                  title: "We source",
                  text: "Your demand helps us plan our upcoming collection.",
                },
                {
                  number: "04",
                  title: "Get notified",
                  text: "We'll let you know when the collection becomes available.",
                },
              ].map((step) => (

                <div
                  key={step.number}
                  className="group grid grid-cols-[50px_1fr] gap-5 py-7"
                >

                  <span className="text-[10px] text-purple-400/70">
                    {step.number}
                  </span>

                  <div>

                    <h3 className="text-base font-medium">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/30 transition group-hover:text-white/45">
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

      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-purple-900 via-purple-700 to-purple-800">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/20 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-36">

          <p className="text-[9px] uppercase tracking-[0.35em] text-white/45">
            Pre-Registration
          </p>

          <h2 className="mx-auto mt-6 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-8xl">

            Your demand.
            <br />

            <span className="text-white/45">
              Our next collection.
            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/55">
            Tell us what you want to see next. Registration is free and
            requires no payment.
          </p>

          <button
            onClick={scrollToCollection}
            className="group mt-9 inline-flex items-center gap-4 rounded-full bg-white px-7 py-3.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-white/90"
          >

            Explore Collection

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </button>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-white/[0.07] bg-black px-6 py-10 md:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                <span className="text-[8px] font-bold">
                  AE
                </span>
              </div>

              <p className="text-xs font-medium">
                Aditya Enterprises
              </p>

            </div>

            <p className="mt-4 max-w-xs text-[10px] leading-5 text-white/25">
              Technology, products and services built around your needs.
            </p>

          </div>


          <div className="text-left md:text-right">

            <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
              Aditya (Techno Services)
            </p>

            <p className="mt-2 text-xs text-white/35">
              Grow your dreams.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
};

export default PreRegister;
