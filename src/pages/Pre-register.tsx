import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: "analog-watch",
    name: "Analog Watches",
    subtitle: "Timeless. Refined. Classic.",
    description:
      "A carefully selected collection of elegant analog watches for everyday and formal wear.",
    status: "Launching Soon",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "smart-watch",
    name: "Smart Watches",
    subtitle: "Technology on your wrist.",
    description:
      "Modern smart watches combining everyday connectivity, fitness and style.",
    status: "Launching Soon",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "smart-band",
    name: "Smart Bands",
    subtitle: "Track. Move. Improve.",
    description:
      "Lightweight smart bands designed for fitness, activity and everyday tracking.",
    status: "Launching Soon",
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "smart-ring",
    name: "Smart Rings",
    subtitle: "Small form. Smart technology.",
    description:
      "A new generation of compact wearable technology designed for your everyday life.",
    status: "Launching Soon",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
  },
];

const PreRegister = () => {
  const navigate = useNavigate();

  const handleRegister = (product: string) => {
    navigate(`/pre-register/form?product=${encodeURIComponent(product)}`);
  };

  return (
    <main className="min-h-screen bg-[#090707] text-white">

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,20,35,0.22),transparent_55%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">

          <p className="text-xs tracking-[0.45em] uppercase text-[#c9a46c] mb-6">
            Aditya (Techno Services)
          </p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight">
            Something New
            <br />
            <span className="text-[#d5b273] italic">
              Is Coming.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-7 text-white/50 leading-7">
            Explore our upcoming collection of watches and wearable
            technology. Choose what interests you and register to be
            among the first to know when it arrives.
          </p>

          <div className="mt-8 flex justify-center">
            <span className="rounded-full border border-[#c9a46c]/30 bg-[#c9a46c]/5 px-5 py-2 text-xs tracking-[0.2em] uppercase text-[#d8b77a]">
              No payment required
            </span>
          </div>

        </div>

      </section>


      {/* PRODUCT COLLECTION */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-14">

          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a46c] mb-4">
            Upcoming Collection
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            Choose Your Interest
          </h2>

        </div>


        <div className="grid md:grid-cols-2 gap-7">

          {products.map((product) => (

            <article
              key={product.id}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] transition-all duration-500 hover:border-[#c9a46c]/40 hover:bg-white/[0.045]"
            >

              {/* IMAGE */}

              <div className="relative aspect-[16/10] overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5">
                  <span className="rounded-full border border-[#d8b77a]/40 bg-black/50 backdrop-blur-md px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-[#e0c58e]">
                    {product.status}
                  </span>
                </div>

              </div>


              {/* CONTENT */}

              <div className="p-7">

                <p className="text-xs tracking-[0.3em] uppercase text-[#c9a46c]">
                  {product.subtitle}
                </p>

                <h3 className="mt-3 font-serif text-3xl">
                  {product.name}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/45">
                  {product.description}
                </p>


                <div className="mt-7 flex items-center justify-between">

                  <span className="text-xs text-white/30">
                    Register your interest
                  </span>

                  <button
                    onClick={() => handleRegister(product.name)}
                    className="group/btn rounded-full bg-[#d1ad70] px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-black transition-all hover:bg-[#e5c88f]"
                  >
                    Register
                    <span className="ml-2 inline-block transition-transform group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* FOOTER */}

      <section className="border-t border-white/5 py-16 text-center">

        <p className="text-xs tracking-[0.35em] uppercase text-[#c9a46c]">
          Your demand. Our next collection.
        </p>

      </section>

    </main>
  );
};

export default PreRegister;
