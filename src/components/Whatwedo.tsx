import React from "react";

const WhatWeDo = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 overflow-x-hidden">
      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-center mb-10 sm:mb-16">
        What we do?
      </h2>

      {/* Grid */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 auto-rows-auto md:auto-rows-[260px]">
          {/* Left Tall Card */}
          <div className="min-w-0 md:row-span-2 rounded-3xl bg-[#e0e0e0] p-5 sm:p-6 flex flex-col justify-between">
            <h3 className="text-lg sm:text-xl font-semibold leading-tight break-words">
              We design experiences <br className="hidden sm:block" /> that convert
            </h3>

            <div className="mt-6 h-48 sm:h-56 w-full max-w-full bg-[#9e9e9e] rounded-xl flex items-center justify-center text-white overflow-hidden">
              img
            </div>
          </div>

          {/* Top Right Wide Card */}
          <div className="min-w-0 md:col-span-2 rounded-3xl bg-[#e0e0e0] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <h3 className="text-lg sm:text-xl font-semibold leading-tight break-words">
              We help brands <br className="hidden sm:block" /> grow digitally
            </h3>

            <div className="h-20 w-24 sm:h-24 sm:w-32 bg-[#9e9e9e] rounded-xl flex items-center justify-center text-white shrink-0 overflow-hidden">
              img
            </div>
          </div>

          {/* Bottom Small Card 1 */}
          <div className="min-w-0 rounded-3xl bg-[#e0e0e0] p-5 sm:p-6 flex items-start justify-between gap-4">
            <h3 className="text-base sm:text-lg font-semibold leading-tight break-words">
              We design <br className="hidden sm:block" /> with purpose
            </h3>

            <div className="h-10 w-10 bg-[#9e9e9e] rounded-md flex items-center justify-center text-white text-xs shrink-0 overflow-hidden">
              img
            </div>
          </div>

          {/* Bottom Small Card 2 */}
          <div className="min-w-0 rounded-3xl bg-[#e0e0e0] p-5 sm:p-6 flex items-start justify-between gap-4">
            <h3 className="text-base sm:text-lg font-semibold leading-tight break-words">
              We build <br className="hidden sm:block" /> for scale
            </h3>

            <div className="h-10 w-10 bg-[#9e9e9e] rounded-md flex items-center justify-center text-white text-xs shrink-0 overflow-hidden">
              img
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
