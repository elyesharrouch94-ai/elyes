"use client";

import { MagneticLink } from "./ui/MagneticButton";
import RoleRotator from "./ui/RoleRotator";
import Counter from "./ui/Counter";
import Logos from "./Logos";
import HeroBackground from "./HeroBackground";
import { stats } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  const statLabels = [t.hero.statsYears, t.hero.statsBudgets, t.hero.statsClients];

  return (
    <section
      id="home"
      className="snap-section relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-12 overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-4xl text-center">
        <p className="inline-flex items-center gap-2.5 text-sm text-text-dim border border-border bg-surface px-4.5 py-2 rounded-full mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {t.hero.availability}
        </p>

        <h1
          style={{ textShadow: "var(--name-shadow)" }}
          className="font-display font-bold leading-[0.98] tracking-tight text-[clamp(3.2rem,9vw,7rem)] mb-7"
        >
          <span className="block">Elyes</span>
          <span className="block gradient-text">Harrouch</span>
        </h1>

        <div className="relative">
          <div aria-hidden className="hero-text-scrim absolute -inset-x-8 -inset-y-5 -z-10 backdrop-blur-md" />

          <p className="hero-subtext font-display text-[clamp(1.1rem,2.4vw,1.6rem)] mb-5">
            {t.hero.specialistPrefix} · <RoleRotator roles={t.hero.roles} />
          </p>

          <p className="hero-subtext max-w-xl mx-auto leading-relaxed mb-11">{t.hero.lead}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <MagneticLink
            href="#work"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-medium text-[var(--on-accent)] shadow-[0_8px_28px_-8px_var(--accent-glow)]"
            style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))" }}
          >
            {t.hero.ctaWork}
          </MagneticLink>
          <MagneticLink
            href="https://www.linkedin.com/in/elyes-harrouch/?locale=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-4 rounded-full font-medium border border-border hover:border-white/30 hover:bg-surface transition-colors"
          >
            {t.hero.ctaTalk}
          </MagneticLink>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-6 max-w-2xl w-full mt-16 pt-10 pb-6 border-t border-border bg-bg/65 backdrop-blur-md rounded-[28px]">
        {stats.map((s, i) => (
          <div key={statLabels[i]} className="flex flex-col items-center gap-1.5 text-center">
            <Counter target={s.target} suffix={s.suffix} />
            <span className="text-xs text-text-faint leading-snug">{statLabels[i]}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mt-14">
        <Logos />
      </div>
    </section>
  );
}
