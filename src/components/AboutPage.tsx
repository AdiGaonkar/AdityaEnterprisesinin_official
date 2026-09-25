```tsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Collaborateforaboutpage from "@/pages/Collaborateforaboutpage";
import Navbar from "./Navbar";
import Collaborate from "./Collaborate";

type CardProps = {
  title: string;
  text: string;
  align?: "right";
  center?: boolean;
};

const Card: React.FC<CardProps> = ({ title, text, align, center }) => {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-md p-6 rounded-xl max-w-sm
        border border-white/10
        ${align === "right" ? "ml-auto" : ""}
        ${center ? "mx-auto text-center" : ""}
      `}
    >
      <h3 className="text-3xl sm:text-5xl font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-white/90">{text}</p>
    </div>
  );
};

const AboutMindMap: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const handleScrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* TOP HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#7834c8] via-[#7834c8] to-black">
        <Navbar onScrollTo={handleScrollTo} />

        <div className="mx-auto flex min-h-screen max-w-6xl -mt-28 flex-col items-center justify-center px-4 pt-24 pb-16 sm:pt-28">
          <h1 className="!font-stacksansnotch text-center text-8xl text-white sm:text-6xl md:text-9xl">
            AboutUs
          </h1>

          <div className="mx-auto mt-12 w-full max-w-xl text-center">
            <div className="h-px w-full bg-white/35" />

            <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-white/80">
              Feature
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              Who We Are & What We Do
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </section>

      {/* MAIN ABOUT SECTION */}
      <section
        id="about"
        className="relative min-h-screen w-full overflow-hidden bg-black"
      >
        <motion.div
          style={{ y }}
          className="
            relative z-20 text-white mt-52 max-w-6xl mx-auto
            pt-24 sm:pt-32
            space-y-10 sm:space-y-16
            px-4 sm:px-8
          "
        >
          <Card
            title="WHO WE ARE?"
            align="right"
            text="
Aditya Enterprises is a technology solutions company providing reliable electronic products, industrial technology, and professional IT & digital services to businesses and individuals.
"
          />

          <Card
            title="WHAT WE DO?"
            text="
We provide reliable electronic and industrial technology products along with professional IT and digital services, helping businesses find the right solutions to build, operate, and grow.
"
          />

          <Card
            title="OUR STORY"
            align="right"
            text="Built with passion to deliver reliable technology and digital solutions that help businesses grow."
          />

          <Card
            title="OUR MISSION"
            text="To empower businesses with reliable technology products, innovative IT solutions, and digital services that drive efficiency, growth, and long-term success."
          />

          <Card
            title="OUR VISION"
            align="right"
            text="To become one of India’s most trusted technology companies, delivering reliable electronic products, industrial solutions, and innovative IT and digital services."
          />

          <Card
            title="WHY CHOOSE US?"
            center
            text="We combine reliable technology products with innovative IT and digital solutions to deliver practical, quality-driven solutions tailored to every customer’s needs."
          />
        </motion.div>

        {/* ===== OUR STORY SECTION ===== */}
        <div className="relative px-4 sm:px-10 md:px-16 py-20 flex flex-col-reverse md:flex-row items-center gap-12">

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left md:ml-32">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4">
              Our <span className="text-yellow-400">Story</span>
            </h2>

            <p className="italic text-gray-300 mb-6">
              From Passion to Purpose
            </p>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
              Aditya Enterprises was founded with a simple belief — that the
              right technology can solve real problems, create new
              opportunities, and help businesses move forward with confidence.

              <br />
              <br />

              Today, we bring together electronic and industrial technology
              products with IT and digital services to help our customers turn
              their requirements into practical solutions. From color
              measurement equipment and electronics to websites, mobile
              applications, design, hosting, and digital marketing, we are
              committed to delivering reliable technology tailored to every
              need.
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex-1 w-full">
            <img
              src="/Gemini_Generated_Image_y7y4idy7y4idy7y4.png"
              alt="Aditya Enterprises - Our Story"
              className="w-full h-[240px] sm:h-[300px] md:h-[380px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <Collaborate />
    </>
  );
};

export default AboutMindMap;
