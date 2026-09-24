import React from "react";

const ServicesSection = () => {
  return (
    <section className="bg-black font-stacksansnotch w-full min-h-[600px] flex items-center py-20 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* =========================================
            LEFT COLUMN - TEXT CONTENT
        ========================================= */}
        <div className="lg:col-span-5 flex flex-col items-start">

          {/* Badge */}
          <div className="inline-block px-8 py-2 rounded-full border-[1.5px] border-[#fff] mb-8">
            <span className="text-gray-200 text-sm font-medium tracking-wide">
              Services
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Advanced Technology for Every Application
          </h2>

          {/* Paragraph */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-[580px] font-light">
            Discover reliable electronic and industrial solutions designed for professional requirements. Our portfolio includes colorimeters, spectrophotometers, color measurement equipment, computers, peripherals, and more, alongside web and app development, UI/UX and graphic design, hosting, and digital marketing services. We combine quality products, technical expertise, and practical digital solutions to support businesses at every stage.
          </p>
          {/* CTA Button */}
          <button className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#252525] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors border border-white/5">
            Explore More
            <span className="text-base leading-none">→</span>
          </button>
        </div>

        {/* =========================================
            RIGHT COLUMN - CAROUSEL MOCK
        ========================================= */}
        <div className="lg:col-span-7 flex gap-6 lg:gap-8 items-start relative ml-auto">

          {/* Main Active Card (Large) */}
          <div className="relative w-[400px] h-[420px] sm:w-[480px] sm:h-[500px] rounded-[2rem] shrink-0 shadow-2xl overflow-hidden bg-[#1a1a1a]">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
              alt="Advanced color measurement equipment"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          {/* Next Card Preview & Controls (Small) */}
          <div className="flex flex-col gap-4 shrink-0 mt-4 sm:mt-6">

            {/* Secondary Card */}
            <div className="relative w-[200px] h-[160px] sm:w-[260px] sm:h-[200px] rounded-[2rem] shrink-0 overflow-hidden bg-[#1a1a1a]">
              <img
                src="https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80"
                alt="Calibration services"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Subtext */}
            <p className="text-[10px] sm:text-[11px] text-gray-500 leading-snug max-w-[200px] sm:max-w-[240px] font-light mt-2">
              Professional calibration and maintenance services that ensure long-term accuracy and reliability.
            </p>

            {/* Navigation Controls */}
            <div className="flex gap-3 mt-2">
              <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#b36bff] hover:bg-[#b36bff] flex items-center justify-center text-black transition-colors">
                <span className="text-xs font-bold">←</span>
              </button>
              <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#b36bff] hover:bg-[#b36bff] flex items-center justify-center text-black transition-colors">
                <span className="text-xs font-bold">→</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;