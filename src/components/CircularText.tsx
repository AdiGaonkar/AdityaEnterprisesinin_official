import { motion } from "framer-motion";

const CIRCULAR_TEXT = "WHO WE ARE • WHO WE ARE • WHO WE ARE • WHO WE ARE • ";

export default function CircularText() {
  const radius = 250;
  const characters = CIRCULAR_TEXT.split("");

  return (
    <motion.div
      animate={{ rotate: 380 }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "linear",
      }}
      className="relative w-[300px] mt-28 h-[280px]"
    >
      {characters.map((char, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 text-[#fff] text-3xl tracking-[0.3em]"
          style={{
            transform: `
              rotate(${(360 / characters.length) * i}deg)
              translate(${radius}px)
              rotate(90deg)
            `,
            transformOrigin: "0 0",
          }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
}
