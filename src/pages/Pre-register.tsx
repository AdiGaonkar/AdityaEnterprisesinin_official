import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: "analog-watch",
    name: "Analog Watches",
    subtitle: "Classic design. Everyday style.",
    description:
      "Explore a curated selection of analog watches designed to bring timeless style to everyday and formal occasions.",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "smart-watch",
    name: "Smart Watches",
    subtitle: "Smart technology. Everyday life.",
    description:
      "Discover upcoming smart watches designed around connectivity, activity tracking and modern everyday use.",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "smart-band",
    name: "Smart Bands",
    subtitle: "Move smarter. Track better.",
    description:
      "Lightweight wearable technology focused on activity, fitness and everyday health tracking.",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "smart-ring",
    name: "Smart Rings",
    subtitle: "Compact technology. Powerful possibilities.",
    description:
      "A new generation of compact wearables designed for people who want technology that fits naturally into everyday life.",
    status: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
  },
];

const PreRegister = () => {
  const navigate = useNavigate();

  const handleRegister = (product: string) => {
    navigate(`/PreRegisterForm?product=${encodeURIComponent(product)}`);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">

      {/* =========================
          HERO
      ========================== */}

      <section className="relative overflow-hidden bg-[#111111] text-white">

        {/* Background glow */}
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#b51f32]/20 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6">

          {/* NAV / BRAND */}

          <div className="flex items-center justify-between border-b border-white/10 py-6">

            <div>
              <p className="text-sm font-semibold tracking-[0.08em]">
                ADITYA
              </p>

              <p className="mt-0.5 text-[9px] tracking-[0.28em] text-white/40">
                TECHNO SERVICES
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Aditya Enterprises
              </p>
            </div>

          </div>


          {/* HERO CONTENT */}

          <div className="mx-auto max-w-4xl py-24 text-center md:py-32">

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-md">

              <span className="h-1.5 w-1.5 rounded-full bg-[#c91f3b]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
                New Collection
              </span>

            </div>


            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-8xl">

              The Next
              <br />

              <span className="text-[#c91f3b]">
                Collection.
              </span>

            </h1>


            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">

              Watches and wearable technology,
              carefully selected for what comes next.

            </p>


            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <button
                onClick={() =>
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-[#c91f3b] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#df2947] hover:shadow-[0_10px_40px_rgba(201,31,59,0.25)]"
              >
                Explore Collection
              </button>

              <span className="rounded-full border border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-white/40">
                No payment required
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          INTRO
      ========================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-28">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c91f3b]">
            Your choice matters
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-[#171717] md:text-5xl">
            You choose.
            <br />
            <span className="text-black/35">
              We source.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-black/50">
            We are exploring our next collection of watches and wearable
            technology. Tell us what you are interested in and help us decide
            what comes next.
          </p>

        </div>

      </section>


      {/* =========================
          COLLECTION
      ========================== */}

      <section
        id="collection"
        className="bg-[#f7f7f5] px-6 py-20 md:py-28"
      >

        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}

          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c91f3b]">
                Upcoming Collection
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#171717] md:text-5xl">
                Find what fits you.
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-black/45 md:text-right">
              Register your interest in any collection. Registration is free
              and does not require payment or purchase.
            </p>

          </div>


          {/* PRODUCTS */}

          <div className="grid gap-6 md:grid-cols-2">

            {products.map((product, index) => (

              <article
                key={product.id}
                className="group overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >

                {/* IMAGE */}

                <div className="relative aspect-[16/10] overflow-hidden bg-[#e9e9e6]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />


                  {/* Number */}

                  <div className="absolute left-5 top-5">

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[10px] font-medium text-white backdrop-blur-md">
                      0{index + 1}
                    </span>

                  </div>


                  {/* Status */}

                  <div className="absolute right-5 top-5">

                    <span className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      {product.status}
                    </span>

                  </div>

                </div>


                {/* CONTENT */}

                <div className="p-7 md:p-8">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c91f3b]">
                    {product.subtitle}
                  </p>


                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[#171717] md:text-3xl">
                    {product.name}
                  </h3>


                  <p className="mt-4 max-w-lg text-sm leading-6 text-black/45">
                    {product.description}
                  </p>


                  <div className="mt-7 flex items-center justify-between border-t border-black/[0.07] pt-6">

                    <span className="text-[10px] uppercase tracking-[0.18em] text-black/30">
                      Register your interest
                    </span>


                    <button
                      onClick={() => handleRegister(product.name)}
                      className="flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#c91f3b]"
                    >
                      Register

                      <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
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


      {/* =========================
          HOW IT WORKS
      ========================== */}

      <section className="bg-[#111111] px-6 py-20 text-white md:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c91f3b]">
              Simple Process
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Your demand.
              <br />
              <span className="text-white/35">
                Our next collection.
              </span>
            </h2>

          </div>


          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Choose",
                text: "Tell us which product category interests you.",
              },
              {
                number: "02",
                title: "Register",
                text: "Submit your details. There is no payment required.",
              },
              {
                number: "03",
                title: "Stay Updated",
                text: "We will let you know when the collection becomes available.",
              },
            ].map((step) => (

              <div
                key={step.number}
                className="bg-[#151515] p-8 md:p-10"
              >

                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#c91f3b]">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================== */}

      <section className="bg-white px-6 py-20 text-center md:py-28">

        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c91f3b]">
          Coming Soon
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#171717] md:text-6xl">
          Something worth
          <br />
          <span className="text-black/30">
            waiting for.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-black/45">
          Register your interest today and be among the first to know
          when our upcoming collection arrives.
        </p>

        <button
          onClick={() =>
            document
              .getElementById("collection")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-8 rounded-full bg-[#c91f3b] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#b51b35]"
        >
          Explore Collection
        </button>

      </section>


      {/* =========================
          FOOTER
      ========================== */}

      <footer className="border-t border-black/10 bg-[#f7f7f5] px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

          <div>

            <p className="text-sm font-semibold tracking-[0.08em]">
              ADITYA
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-black/35">
              TECHNO SERVICES
            </p>

          </div>


          <p className="text-[10px] uppercase tracking-[0.18em] text-black/30">
            Grow your dreams.
          </p>

        </div>

      </footer>

    </main>
  );
};

export default PreRegister;
