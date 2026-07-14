"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "eh-preloader-shown";
const REVEAL_DURATION = 2000;
const EXIT_FALLBACK_DELAY = 1500;

export default function Preloader() {
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyShown || reduced) {
      setRemoved(true);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    // The entrance (burst + mark + line) is driven entirely by CSS
    // animations that start the moment this mounts — no JS timing to get
    // stuck. This single timer only decides when to trigger the curtain
    // opening, matching the fixed 2s reveal.
    const t = setTimeout(() => setExiting(true), REVEAL_DURATION);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    // transitionend is the precise signal; the timer is only a fallback in
    // case it doesn't fire (e.g. an unexpected style interruption).
    const fallback = setTimeout(() => setRemoved(true), EXIT_FALLBACK_DELAY);
    return () => clearTimeout(fallback);
  }, [exiting]);

  useEffect(() => {
    document.documentElement.style.overflow = removed ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [removed]);

  if (removed) return null;

  return (
    <div aria-hidden className={`preloader ${exiting ? "preloader--exit" : ""}`}>
      <div
        className="preloader-panel preloader-panel--top"
        onTransitionEnd={() => setRemoved(true)}
      />
      <div className="preloader-panel preloader-panel--bottom" />
      <div className="preloader-content">
        <span className="preloader-burst" />
        <span className="preloader-mark-text">
          EH<span className="preloader-mark-dot">.</span>
        </span>
        <span className="preloader-line" />
      </div>
    </div>
  );
}
