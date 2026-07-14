"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[150]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
        boxShadow: "0 0 12px var(--accent-glow)",
      }}
    />
  );
}
