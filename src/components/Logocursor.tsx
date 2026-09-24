import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const LogoCarousel = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://www.codemintsolutions.com/_next/image?url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F6a%2FJavaScript-logo.png&w=256&q=75",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
     "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
       "https://www.codemintsolutions.com/_next/image?url=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F64%2FExpressjs.png&w=256&q=75",
        "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
         "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  // Track scroll direction (up/down)
  const { scrollY } = useScroll();
  const x = useMotionValue(0); // horizontal movement

  // Smooth animation
  const smoothX = useSpring(x, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  let lastScrollY = 0;

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (currentY) => {
      if (currentY > lastScrollY) {
        // user is scrolling DOWN → move logos RIGHT
        x.set(x.get() + 5);
      } else {
        // user is scrolling UP → move logos LEFT
        x.set(x.get() - 5);
      }
      lastScrollY = currentY;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden py-12 mt-20">
      <motion.div
        className="flex space-x-16"
        style={{
          x: smoothX,
          width: "fit-content",
          gap: "4rem",
        }}
      >
        {extendedLogos.map((logo, index) => (
          <motion.img
            key={`logo-${index}`}
            src={logo}
            alt="tech logo"
            className="h-24 object-contain"
            initial={{ opacity: 0.5 }}
            whileHover={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
