// components/WaterFillText.jsx
import { motion } from "framer-motion";

export default function WaterFillText({ text, active }) {
  return (
    <span className="relative inline-block">
      {/* TEXT OUTLINE */}
      <span
        className="absolute inset-0 text-gray-300 font-extrabold uppercase pointer-events-none"
        style={{
          WebkitTextStroke: "",
        }}
      >
        {text}
      </span>

      {/* WATER */}
      <motion.span
        className="absolute inset-0 font-extrabold uppercase text-transparent overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #fde047 20%, #facc15 60%, #ca8a04 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        animate={{
          backgroundPositionX: active ? ["0%", "100%"] : "0%",
          clipPath: active
            ? ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
            : "inset(100% 0 0 0)",
        }}
        transition={{
          backgroundPositionX: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
          clipPath: {
            duration: 0.8,
            ease: "easeOut",
          },
        }}
      >
        {text}
      </motion.span>

      {/* INVISIBLE TEXT FOR LAYOUT */}
      <span className="font-extrabold uppercase opacity-0">{text}</span>
    </span>
  );
}
