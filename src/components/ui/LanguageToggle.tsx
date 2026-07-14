"use client";

import { useI18n } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div
      className="relative flex items-center border border-border bg-surface rounded-full p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          data-cursor-hover
          aria-pressed={lang === l}
          className={`relative z-10 px-2.5 py-1.5 rounded-full transition-colors uppercase ${
            lang === l ? "text-[var(--on-accent)]" : "text-text-dim hover:text-text"
          }`}
        >
          {lang === l && (
            <span
              className="absolute inset-0 rounded-full -z-10"
              style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))" }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  );
}
