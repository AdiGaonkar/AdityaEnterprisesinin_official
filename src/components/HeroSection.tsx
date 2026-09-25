// components/HeroSection.jsx
import React from "react";
import Navbar from "./Navbar";

const HeroSection = () => {
  const CardGroup = () => (
    <div className="flex gap-4 sm:gap-6 px-2 sm:px-3">
      {/* CARD 1 — DIGITAL FLATBED CUTTING */}
      <div className="group relative w-[300px] h-[240px] sm:w-[340px] sm:h-[260px] rounded-3xl overflow-hidden shrink-0 bg-[#0a0a0a] border border-white/10 shadow-2xl transition-all duration-300 hover:border-yellow-500/50">
        <img
          src="/you can do it. (2).png"
          alt="Digital Flatbed Cutting Machine"
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-400 font-bold mb-2">
            Cutting Technology
          </p>
          <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight mb-2">
            Digital Flatbed <br />
            <span className="font-semibold text-gray-300">Cutting Machines</span>
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Precision cutting solutions for high-end packaging and sample production.
          </p>
        </div>
      </div>

      {/* CARD 2 — COLOR MEASUREMENT */}
      <div className="group relative w-[300px] h-[240px] sm:w-[340px] sm:h-[260px] rounded-3xl overflow-hidden shrink-0 bg-[#0a0a0a] border border-white/10 shadow-2xl transition-all duration-300 hover:border-yellow-500/50">
        <img
          src="/you can do it. (15).png"
          alt="Color Measurement Spectrophotometer"
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-400 font-bold mb-2">
            Color Technology
          </p>
          <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight mb-2">
            Color Measurement <br />
            <span className="font-semibold text-gray-300">Solutions</span>
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Industry-leading accuracy for color control and automated consistency.
          </p>
        </div>
      </div>

      {/* CARD 3 — PRINTING & PACKAGING */}
      <div className="group relative w-[300px] h-[240px] sm:w-[340px] sm:h-[260px] rounded-3xl overflow-hidden shrink-0 bg-[#0a0a0a] border border-white/10 shadow-2xl transition-all duration-300 hover:border-yellow-500/50">
        <img
          src="/Add a heading.png"
          alt="Printing and Packaging Solutions"
          className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-400 font-bold mb-2">
            Industry Solutions
          </p>
          <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight mb-2">
            Printing & <br />
            <span className="font-semibold text-gray-300">Packaging</span>
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Advanced mechanical technology for modern, high-volume operations.
          </p>
        </div>
      </div>

      {/* CARD 4 — INDUSTRIAL TECHNOLOGY */}
      <div className="relative w-[300px] h-[240px] sm:w-[340px] sm:h-[260px] rounded-3xl shrink-0 bg-[#0f0f0f] border border-white/5 p-7 flex flex-col shadow-2xl transition-all duration-300 hover:border-yellow-500/30">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
          Industries We Serve
        </p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">
          Technology <br />
          <span className="font-semibold text-yellow-500">Across Industries</span>
        </h3>

        <div className="mt-auto grid grid-cols-2 gap-2">
          {["Printing", "Packaging", "Textile", "Coatings", "Plastics", "Inks"].map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-[11px] text-gray-300 text-center hover:bg-white/10 hover:text-white transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CARD 5 — COMPLETE SOLUTIONS */}
      <div className="group relative w-[300px] h-[240px] sm:w-[340px] sm:h-[260px] bg-[#0a0a0a] border border-yellow-500/20 rounded-3xl shrink-0 p-7 flex flex-col justify-between shadow-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
        <div className="absolute -right-10 -top-10 w-40 h-40 border border-yellow-500/10 rounded-full group-hover:scale-110 transition-transform duration-700" />

        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-500 font-bold">
            Aditya Enterprises
          </p>
          <h3 className="mt-3 text-2xl font-medium text-white leading-tight">
            Reliable Tech. <br />
            <span className="font-semibold">Smarter Solutions.</span>
          </h3>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Equipment and solutions engineered to elevate your productivity and precision.
          </p>
          <button className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-yellow-500 group-hover:text-yellow-400 transition-colors">
            Explore Solutions
            <span className="text-lg font-normal transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col font-sans bg-black">

      {/* BACKGROUND - Added a heavy dark overlay to ensure text is always readable */}
      <div className="absolute  inset-0 z-0">
        <img
          src="https://i.pinimg.com/736x/2d/d4/c5/2dd4c5d418fadc9a3e573ce79f3faabe.jpg"
          alt="Aditya Enterprises Background"
          className="w-screen h-screen "
        />
        {/* Stronger, solid black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* NAVBAR */}
      <div className="relative z-50 px-4 sm:px-8 pt-6">
        <Navbar />
      </div>

      {/* HERO CONTENT - Added padding bottom (pb-56) to push content strictly above the cards */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-6xl pb-20">

        <div className="mb-6 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#fff]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#fff]">
            Electronics • Software • Digital          </span>
        </div>

        {/* Reverted to crisp, clean white text for readability */}
        <h1 className="text-[52px] sm:text-[68px] md:text-[84px] lg:text-[100px] font-stacksansnotch font-medium text-white leading-[1.05] tracking-tight mb-8">
          Technology that <br />
          <span className="font-semibold text-gray-300">
            powers your industry.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-[600px] leading-relaxed mb-10 font-light">
          Aditya Enterprises provides reliable electronics, technology products, and digital solutions tailored to your needs. From electronic products to websites, mobile apps, design, hosting, and digital marketing, we deliver practical technology solutions that help businesses grow.
        </p>

        {/* Clean, distinct buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/Products"
            className="group inline-flex items-center gap-4 bg-[#fff] hover:bg-[#d4aeff] text-black px-8 py-4 rounded-full font-bold text-xs tracking-[0.1em] uppercase transition-all duration-300"
          >
            Explore Products
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
              <span className="text-black text-lg leading-none">→</span>
            </div>
          </a>

         import { Link } from "react-router-dom";

<Link
  to="/Contact"
  className="px-8 py-4 rounded-full font-bold text-xs tracking-[0.1em] uppercase text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
>
  Contact Us
</Link>
        </div>
      </div>

      {/* BOTTOM CAROUSEL */}

    </section>
  );
};

export default HeroSection;
