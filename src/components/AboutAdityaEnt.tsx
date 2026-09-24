import React from "react";

const AboutSection = () => {
  return (
    <section className="relative font-stacksansnotch bg-[#b9b9b9] py-16 sm:py-24">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-40 items-start">
          
          {/* LEFT: TITLE */}
          <div className="text-left">
            <h1 className="text-[2rem] sm:text-[3rem] lg:text-[4rem] font-semibold leading-[1.05]">
              AETechno Services is your{" "}
              <span className="block sm:inline text-[2rem] sm:text-[4rem] lg:text-[4rem] font-thin text-[#171717]">
                trusted technology partner
              </span>{" "}
              for reliable products, innovative solutions, and digital excellence.
            </h1>
          </div>

          {/* RIGHT: PARAS */}
          <div className="text-left">
            <p className="text-base sm:text-lg font-semibold leading-relaxed text-black">
              Strong businesses need the right technology, a clear digital presence, and solutions built around their needs. At AE Techno Services, we provide a wide range of electronic and industrial technology products, along with professional IT and digital services.
            </p>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-black">
              Our product portfolio includes colorimeters, color-analysis equipment, industrial electronics, computers, peripherals, and other technology products, while our services cover web and app development, UI/UX and graphic design, hosting, and digital marketing. We combine quality products, practical solutions, and reliable support to help businesses choose, build, and grow with the right technology.
              </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
