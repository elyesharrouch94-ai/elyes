"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollImageTunnelImage {
  /** Image URL. */
  src: string;
  /** Alt text. */
  alt: string;
}

export interface ScrollImageTunnelProps {
  /** Photos shown in sequence, one per scroll segment. */
  images: ScrollImageTunnelImage[];
  /** Hint shown above the pinned stage before the user starts scrolling. */
  hint?: React.ReactNode;
  /** Scroll distance dedicated to each photo (taller = slower reveal). Default `"200vh"`. */
  stepHeight?: string;
  /**
   * Scrollable ancestor to track instead of the page — pass this when pinning
   * inside a bounded panel (e.g. a preview container) rather than the window.
   */
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
}

function TunnelFrame({
  src,
  alt,
  index,
  total,
  progress,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const local = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1],
  );
  // Each photo starts already clearly visible (never a near-invisible speck)
  // and grows to fully cover the frame, shown at its true, correctly graded
  // color throughout. Opacity ramps in almost immediately so there's no
  // stretch of scroll where nothing appears to be on screen.
  const scale = useTransform(local, [0, 0.7], [0.45, 1]);
  const y = useTransform(local, [0, 0.7], [24, 0]);
  // `progress` stays clamped at 0 until the pinned container's own top
  // reaches the viewport top — for up to a full viewport height before that,
  // the section is already on screen but every frame reports local === 0.
  // Frame 0 has nothing to hide behind during that lead-in, so keep it
  // opaque from the start; only later frames need to fade in over the one
  // before them.
  const opacity = useTransform(local, [0, 0.02, 1], [index === 0 ? 1 : 0, 1, 1]);

  return (
    <div
      style={{ zIndex: index }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Flexbox handles centering so it never fights with the scale/y
          transform below — motion owns the transform property once a
          motion value drives it, so a translate-based centering class on
          the same element would get silently clobbered. */}
      <motion.div
        style={{ scale, y, opacity }}
        className="h-[70%] w-full max-w-xl overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* All frames in a tunnel are part of one pinned-scroll unit that's
            already in view the moment any of it is — lazy-loading later
            frames fights that and can leave them not-yet-fetched by the
            time their turn arrives during a fast scroll. */}
        <img
          src={src}
          alt={alt}
          loading="eager"
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}

export function ScrollImageTunnel({
  images,
  hint = "Scroll down to reveal the images",
  stepHeight = "200vh",
  container,
  className,
}: ScrollImageTunnelProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const containerEl = container?.current ?? null;
    const win = el.ownerDocument.defaultView ?? window;
    const target: HTMLElement | Window = containerEl ?? win;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = containerEl ? containerEl.clientHeight : win.innerHeight;
      const top = containerEl
        ? rect.top - containerEl.getBoundingClientRect().top
        : rect.top;
      const denom = rect.height - viewport || 1;
      progress.set(Math.min(1, Math.max(0, -top / denom)));
    };
    const onScroll = () => {
      if (!raf) raf = win.requestAnimationFrame(update);
    };

    update();
    target.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onScroll);
    const ro = containerEl ? new ResizeObserver(onScroll) : null;
    if (containerEl && ro) ro.observe(containerEl);

    return () => {
      target.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
      ro?.disconnect();
      if (raf) win.cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, progress, container]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("grid gap-4 bg-muted p-6", className)}>
        {images.map((image) => (
          <div
            key={image.src}
            className="mx-auto aspect-[3/4] w-full max-w-xl overflow-hidden bg-background"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-clip", className)}>
      <div className="my-20 grid content-start justify-items-center gap-6 text-center">
        <span className="relative text-xs uppercase leading-tight text-muted-foreground after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-muted-foreground/40 after:content-['']">
          {hint}
        </span>
      </div>

      <div
        ref={containerRef}
        style={{ height: `calc(${images.length} * ${stepHeight})` }}
        className="w-full"
      >
        <section className="sticky top-0 h-screen w-full overflow-hidden bg-background">
          {images.map((image, index) => (
            <TunnelFrame
              key={image.src}
              src={image.src}
              alt={image.alt}
              index={index}
              total={images.length}
              progress={progress}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default ScrollImageTunnel;
