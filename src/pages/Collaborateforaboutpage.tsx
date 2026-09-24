import React from "react";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const Collaborate = () => {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="relative font-stacksansnotch min-h-screen w-full overflow-hidden bg-black flex flex-col">

      {/* ================= FLOATING CIRCLES ================= */}
      <div className="absolute left-20 top-24 h-28 w-28 rounded-full bg-white/30 blur-sm" />
      <div className="absolute left-32 top-52 h-16 w-16 rounded-full bg-white/30 blur-sm" />
      <div className="absolute right-24 top-60 h-24 w-24 rounded-full bg-white/30 blur-sm" />

      {/* ================= CTA ================= */}
      <div className=" mt-40">
      <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6">
        <div>
          <h1
            className="text-6xl md:text-9xl font-extrabold leading-tight
            bg-gradient-to-b from-white via-white to-black
            text-transparent bg-clip-text"
          >
            Ready <br />
            <span className="text-yellow-400">To Collaborate?</span>
          </h1>

          <div className="mt-10 space-y-4 text-sm font-medium text-gray-300">
            <button className="flex items-center gap-2 mx-auto hover:gap-3 transition-all">
              Explore Products <span>→</span>
            </button>
            <button className="flex items-center gap-2 mx-auto hover:gap-3 transition-all">
              Contact us <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= PROPER FOOTER ================= */}
      <footer className="relative mt-20 z-10 px-6 md:px-16 pb-12 text-white">

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              AE <span className="text-white/60">Techno Services</span>
            </h3>
            <p className="mt-4 max-w-sm text-gray-100 text-sm leading-relaxed">
              A digital studio crafting modern web experiences, UI/UX design,
              and scalable solutions for ambitious brands.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-100 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {["Home", "About", "Services", "Portfolio", "Contact"].map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-100 hover:text-gray-500 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-full border border-white/20
                  flex items-center justify-center
                  text-gray-400 hover:text-white hover:border-white/50 transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Aditya Enterprises. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </footer>

      {/* ================= FLOATING GRADIENT DOME ================= */}
      <div
        className="pointer-events-none absolute bottom-[-30%] left-1/2 -translate-x-1/2
        w-[80%] h-[80%] rounded-t-full
        bg-gradient-to-t from-white via-gray-200 to-transparent
        blur-[2px] opacity-90 animate-[float_8s_ease-in-out_infinite]"
      />

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-20px); }
        }
      `}</style>
      </div>
    </section>
  );
};

export default Collaborate;
