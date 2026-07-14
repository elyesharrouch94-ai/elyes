"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { stiffness: 400, damping: 32 });
  const ringY = useSpring(dotY, { stiffness: 400, damping: 32 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsActive(!!target.closest("a, button, [data-cursor-hover]"));
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [dotX, dotY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[200]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isActive ? 64 : 36,
          height: isActive ? 64 : 36,
          borderColor: isActive ? "var(--accent)" : "#ffffff",
          background: isActive ? "var(--accent-glow)" : "transparent",
          opacity: isVisible ? 1 : 0,
          mixBlendMode: isActive ? "normal" : "difference",
        }}
        transition={{
          width: { duration: 0.25 },
          height: { duration: 0.25 },
          opacity: { duration: 0.3 },
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[200] bg-accent"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
