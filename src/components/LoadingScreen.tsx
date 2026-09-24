import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black
          "
        >
          {/* LOADER BOX */}
          <div
            className="
              relative w-[85%] max-w-[320px]
              sm:w-full sm:max-w-none
              h-[180px] sm:h-full
              flex items-center justify-center
            "
          >
            {/* Percentage */}
            <p
              className="
                text-white font-semibold
                text-[56px]
                sm:text-[90px]
                md:text-[140px]
              "
            >
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
