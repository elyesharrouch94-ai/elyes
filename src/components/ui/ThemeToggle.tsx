"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      data-cursor-hover
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="relative flex items-center justify-center w-9 h-9 rounded-full border border-border bg-surface hover:bg-surface-hover transition-colors"
    >
      {mounted && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          {isLight ? (
            <path
              d="M12 3v1.5M12 19.5V21M4.93 4.93l1.06 1.06M17.7 17.7l1.06 1.06M3 12h1.5M19.5 12H21M4.93 19.07l1.06-1.06M17.7 6.3l1.06-1.06M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          )}
        </svg>
      )}
    </button>
  );
}
