import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CircularText from "./CircularText";

export default function AboutSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 👇 scroll down → text moves up → stops
  const y = useTransform(scrollYProgress, [0, 0.45], [200, 0], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none" />

      {/* 🔒 STICKY CENTER */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-20">
        <div className="relative">
          <CircularText />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-orange-500 mt-44 text-[120px] font-bold"></span>
          </div>
        </div>
      </div>

      {/* 🧭 SCROLL MOVING TEXT (REAL SCROLL LINKED) */}
      <motion.div
        style={{ y }}
        className="relative z-30 max-w-6xl text-3xl mx-auto -mt-[40vh] space-y-24 px-10"
      >
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl max-w-sm ml-auto">
          <h3 className="text-white font-semibold mb-2">WHO WE ARE ?</h3>
          <p className="text-gray-300 text-sm">
            AE Techno Services is a technology solutions company providing reliable electronic products, industrial technology, and professional IT & digital services to businesses and individuals.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl max-w-sm">
          <h3 className="text-white font-semibold mb-2">MISSION.</h3>
          <p className="text-gray-300 text-sm">
            To empower businesses with reliable technology products, innovative IT solutions, and digital services that drive efficiency, growth, and long-term success.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl max-w-sm ml-auto">
          <h3 className="text-white font-semibold mb-2">VISION.</h3>
          <p className="text-gray-300 text-sm">
            To become one of India’s most trusted technology companies, delivering reliable electronic products, industrial solutions, and innovative IT and digital services.
          </p>
        </div>


        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl max-w-sm mx-auto text-center">
          <h3 className="text-white font-semibold mb-2">
            WHY CHOOSE ADITYA ENTERPRISES ?
          </h3>
          <p className="text-gray-300 text-sm">
            We combine reliable technology products with innovative IT and digital solutions to deliver practical, quality-driven solutions tailored to every customer’s needs.
          </p>
        </div>
      </motion.div>

      {/* TOP LABEL */}
      <div className="absolute top-2 left-1/2 mt-5 -translate-x-1/2 text-4xl p-14 tracking-widest text-gray-500 z-40">
        ABOUT<span className="text-[#fff] ">US</span>
      </div>
    </section>
  );
}
