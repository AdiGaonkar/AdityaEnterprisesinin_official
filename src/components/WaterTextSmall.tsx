// components/WaterFillTextSmall.jsx
import { motion } from "framer-motion";

export default function WaterFillTextSmall({ text, active }) {
  return (
    <span className="relative inline-block">
      {/* TEXT OUTLINE */}
      <span
        className="absolute inset-0 text-gray-400 pointer-events-none"
        style={{
          WebkitTextStroke: "0.5px #e5e7eb",
        }}
      >
        {text}
      </span>

      {/* WATER FILL */}
      <motion.span
        className="absolute inset-0 text-transparent overflow-hidden"
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
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          },
          clipPath: {
            duration: 0.5,
            ease: "easeOut",
          },
        }}
      >
        {text}
      </motion.span>

      {/* SPACER */}
      <span className="opacity-0">{text}</span>
    </span>
  );
}
