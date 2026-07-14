"use client";

import { useRef, MouseEvent, ReactNode, RefObject, CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  style?: CSSProperties;
};

function useMagnetic(strength: number) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, handleMove, handleLeave };
}

export function MagneticLink({
  children,
  className,
  strength = 0.35,
  href,
  style,
  target,
  rel,
}: Props & { href: string; target?: string; rel?: string }) {
  const { ref, springX, springY, handleMove, handleLeave } = useMagnetic(strength);
  return (
    <motion.a
      ref={ref as RefObject<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, x: springX, y: springY }}
      className={`relative ${className ?? ""}`}
      data-cursor-hover
    >
      {children}
    </motion.a>
  );
}

export default function MagneticButton({ children, className, strength = 0.35, onClick, style }: Props) {
  const { ref, springX, springY, handleMove, handleLeave } = useMagnetic(strength);
  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ ...style, x: springX, y: springY }}
      className={className}
      data-cursor-hover
    >
      {children}
    </motion.button>
  );
}
