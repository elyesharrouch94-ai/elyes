"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function WorkVideo({
  src,
  poster,
  label,
  aspect = "9/16",
  maxWidth = 380,
}: {
  src: string;
  poster: string;
  label: string;
  /** CSS aspect-ratio for the video frame — vertical (default) or landscape sources need different bounding boxes. */
  aspect?: string;
  maxWidth?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center py-6"
    >
      <div
        style={{ maxWidth, aspectRatio: aspect }}
        className="relative w-full rounded-[24px] overflow-hidden border border-border bg-surface"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          data-cursor-hover
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
              <path d="M16 9l5 5M21 9l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
              <path
                d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M7 5.5v13l11-6.5z" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
