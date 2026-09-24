import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Instagram,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Collaborate = () => {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col">
      {/* ================= FLOATING CIRCLES ================= */}
      <div className="absolute left-20 top-24 h-28 w-28 rounded-full bg-white/10 blur-sm" />
      <div className="absolute left-32 top-52 h-16 w-16 rounded-full bg-white/10 blur-sm" />
      <div className="absolute right-24 top-60 h-24 w-24 rounded-full bg-white/10 blur-sm" />

      {/* ================= CTA ================= */}
      <div className="mt-40">
        <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-6xl md:text-9xl font-extrabold leading-tight bg-gradient-to-b from-white via-white to-black text-transparent bg-clip-text">
              Ready <br />
              <span className="text-[#fff]">To Collaborate?</span>
            </h1>

            <div className="mt-10 space-y-4 text-sm font-medium text-gray-300">
              <Link
                to="/Products"
                className="flex items-center gap-2 mx-auto justify-center hover:gap-3 transition-all"
              >
                Explore Products <span>→</span>
              </Link>

              <Link
                to="/Contact"
                className="flex items-center gap-2 mx-auto justify-center hover:gap-3 transition-all"
              >
                Contact us <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="relative mt-20 z-10 px-6 md:px-16 pb-12 text-white">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Aditya<span className="text-white/60"> Enterprises</span>
              </h3>
              <p className="mt-4 max-w-sm text-gray-100 text-sm font-light leading-relaxed">
                A technology solutions company delivering reliable electronic products, industrial technology, web and app development, UI/UX design, hosting, and digital marketing solutions for businesses and individuals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-gray-100 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                {["Home", "About", "Services", "Portfolio", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-100 hover:text-gray-500 transition"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-gray-100 mb-4">
                Products
              </h4>
              <ul className="space-y-3 text-sm font-thin">
                {[
                  "Spectrophotometer",
                  "Densitometer",
                  "Colourimeters",
                  "Color assessment light box",
                  "Whiteness meter",
                  "Gloss meter",
                  "Hardness tester",
                  "Color fastness meter",
                  "Moisture meter",
                  "pH meter",
                  "Tensile machines",
                  "Environment chambers",
                  "Impact tester",
                  "Heat seal tester",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-gray-100 hover:text-gray-500 transition cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* IT Support */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-gray-100 mb-4">
                IT Support
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  "Web Development",
                  "Web Designing",
                  "Video Editing",
                  "SEO",
                  "UI / UX",
                  "App Development",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-gray-100 hover:text-gray-500 transition cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-gray-100 mb-4">
                Contact
              </h4>

              <ul className="space-y-4 text-sm text-gray-100">
                {/* Phone */}
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 text-gray-400 shrink-0" />
                  <a
                    href="tel:+919321826572"
                    className="hover:text-gray-400 transition"
                  >
                    +91 9321826572
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 text-gray-400 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a
                      href="mailto:sales@adityaenterprisesin.com"
                      className="hover:text-gray-400 transition"
                    >
                      sales@adityaenterprisesin.com
                    </a>
                    <a
                      href="mailto:services@adityaenterprisesin.com"
                      className="hover:text-gray-400 transition"
                    >
                      services@adityaenterprisesin.com
                    </a>
                  </div>
                </li>

                {/* GST Number */}
                <li className="flex items-start gap-3">
                  <span className="w-4 h-4 mt-1 text-gray-400 text-xs font-semibold flex items-center justify-center">
                    GST
                  </span>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      
                    </p>
                    <p className="text-gray-100">27ALKPG8922C1Z5</p>
                  </div>
                </li>

                {/* Location */}
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-gray-400 shrink-0" />
                  <span>
                    K23, Mayuresh Park, Lake Road, Bhandup-West, Mumbai-400078
                    <br />
                    Serving worldwide
                  </span>
                </li>
              </ul>

              {/* Socials */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://www.instagram.com/adityaenterprises_/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://github.com/AdityaEnterprisesin"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 transition"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div> 
          {/* ^^^ ADDED MISSING CLOSING DIV FOR THE GRID HERE ^^^ */}

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Aditya Enterprises. All rights
              reserved.
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

        {/* FLOATING GRADIENT */}
        <div className="pointer-events-none absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-t-full bg-gradient-to-t from-gray-500 via-gray-400 to-transparent blur-[2px] opacity-90 animate-[float_8s_ease-in-out_infinite]" />

        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(-20px);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Collaborate;