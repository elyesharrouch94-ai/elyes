"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const HINT_SESSION_KEY = "popit-hint-shown";
const HINT_SHOW_DELAY = 2500;
const HINT_AUTO_HIDE = 6000;

const ROWS = 4;
const COLS = 5;
const TOTAL = ROWS * COLS;

let audioCtx: AudioContext | null = null;

function playPop(pressed: boolean) {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pressed ? 220 : 320, now);
    osc.frequency.exponentialRampToValueAtTime(pressed ? 120 : 480, now + 0.08);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  } catch {
    // Web Audio not available — silent fallback, the visual pop still plays.
  }
}

export default function PopIt() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [popped, setPopped] = useState<boolean[]>(() => Array(TOTAL).fill(false));
  const allPopped = popped.every(Boolean);
  const panelId = useId();

  useEffect(() => {
    if (sessionStorage.getItem(HINT_SESSION_KEY)) return;
    const showTimer = setTimeout(() => {
      sessionStorage.setItem(HINT_SESSION_KEY, "1");
      setHintVisible(true);
    }, HINT_SHOW_DELAY);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!hintVisible) return;
    const hideTimer = setTimeout(() => setHintVisible(false), HINT_AUTO_HIDE);
    return () => clearTimeout(hideTimer);
  }, [hintVisible]);

  const toggle = (i: number) => {
    setPopped((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      playPop(next[i]);
      return next;
    });
    if (typeof navigator !== "undefined") navigator.vibrate?.(12);
  };

  const reset = () => setPopped(Array(TOTAL).fill(false));

  return (
    <>
      <AnimatePresence>
        {hintVisible && !open && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-[5.5rem] z-[140] flex items-center gap-1.5 pl-3.5 pr-2 py-2 rounded-full border border-border bg-elevated shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)]"
          >
            <span className="text-sm font-medium whitespace-nowrap">{t.popit.title}</span>
            <button
              type="button"
              onClick={() => setHintVisible(false)}
              data-cursor-hover
              aria-label={t.popit.close}
              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-text-faint hover:text-text hover:bg-surface transition-colors"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setHintVisible(false);
        }}
        data-cursor-hover
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t.popit.title}
        whileTap={{ scale: 0.9 }}
        animate={hintVisible ? { scale: [1, 1.08, 1] } : {}}
        transition={hintVisible ? { duration: 0.6, repeat: 2, repeatDelay: 0.4 } : undefined}
        className="fixed bottom-6 left-6 z-[140] w-14 h-14 rounded-full border border-border bg-surface backdrop-blur-xl flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] hover:border-accent/50 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="2.6" fill="currentColor" opacity="0.9" />
          <circle cx="14.5" cy="6.5" r="2.1" fill="currentColor" opacity="0.55" />
          <circle cx="17" cy="12.5" r="2.6" fill="currentColor" opacity="0.9" />
          <circle cx="7" cy="14" r="2.1" fill="currentColor" opacity="0.55" />
          <circle cx="11.5" cy="18" r="2.6" fill="currentColor" opacity="0.9" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-6 z-[140] w-[19rem] rounded-[22px] border border-border bg-elevated p-5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <p className="font-display text-base font-semibold leading-tight">{t.popit.title}</p>
                <p className="text-text-faint text-xs mt-0.5">{t.popit.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                data-cursor-hover
                aria-label={t.popit.close}
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-text-faint hover:text-text hover:bg-surface transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2.5 my-4">
              {popped.map((isPopped, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  data-cursor-hover
                  aria-pressed={isPopped}
                  aria-label={`Bubble ${i + 1}`}
                  whileTap={{ scale: 0.85 }}
                  animate={{
                    scale: isPopped ? 0.86 : 1,
                    boxShadow: isPopped
                      ? "inset 0 3px 6px rgba(0,0,0,0.45), inset 0 -1px 1px rgba(255,255,255,0.05)"
                      : "0 3px 0 rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="aspect-square rounded-full"
                  style={{
                    background: isPopped
                      ? "radial-gradient(circle at 40% 35%, var(--surface-hover), var(--surface))"
                      : "radial-gradient(circle at 35% 30%, var(--accent-2), var(--accent))",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={reset}
              data-cursor-hover
              disabled={!popped.some(Boolean)}
              className="w-full text-center text-xs uppercase tracking-wide text-text-faint hover:text-text disabled:opacity-30 disabled:hover:text-text-faint transition-colors py-1.5"
            >
              {allPopped ? "🎉 " : ""}
              {t.popit.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
