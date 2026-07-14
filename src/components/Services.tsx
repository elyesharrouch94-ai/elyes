"use client";

import { motion } from "framer-motion";
import TiltCard from "./ui/TiltCard";
import { adsStatValue } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export default function Services() {
  const { t, skills } = useI18n();

  return (
    <section id="services" className="snap-section relative z-10 min-h-screen flex items-center px-6 py-32 md:py-0">
      <div className="max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display text-sm text-accent tracking-wide mb-4"
        >
          {t.services.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-[clamp(2.2rem,5vw,3.6rem)] mb-14"
        >
          {t.services.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="p-8 rounded-[20px] border border-border bg-surface overflow-hidden hover:border-accent/40 transition-colors h-full">
                <div className="text-accent text-lg mb-4">◆</div>
                <h3 className="font-display text-lg mb-2.5">{skill.title}</h3>
                <p className="text-text-dim text-[0.92rem] leading-relaxed">{skill.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-[20px] border border-border bg-surface p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12"
        >
          <div className="flex-1">
            <span className="text-xs uppercase tracking-wide text-accent">{t.services.ads.label}</span>
            <h3 className="font-display text-xl md:text-2xl font-semibold mt-2.5 mb-3 leading-snug">
              {t.services.ads.title}
            </h3>
            <p className="text-text-dim text-[0.95rem] leading-relaxed max-w-lg mb-5">
              {t.services.ads.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.services.ads.platforms.map((platform) => (
                <span
                  key={platform}
                  className="text-xs text-text-dim border border-border px-3.5 py-1.5 rounded-full"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-center md:text-left md:border-l md:border-border md:pl-12">
            <span className="font-display text-4xl md:text-5xl font-bold gradient-text block">
              {adsStatValue}
            </span>
            <span className="text-text-faint text-sm mt-1 block max-w-[10rem]">
              {t.services.ads.statLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
