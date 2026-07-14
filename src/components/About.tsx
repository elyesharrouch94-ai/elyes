"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t, experiences } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="snap-section relative z-10 min-h-screen px-6 py-32 md:py-36">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display text-sm text-accent tracking-wide mb-4"
        >
          {t.about.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-tight max-w-3xl mb-14"
        >
          {t.about.headingPre}
          <span className="gradient-text">{t.about.headingHighlight}</span>
          {t.about.headingPost}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-text-dim text-[1.05rem] leading-[1.85] mb-16"
        >
          <p className="mb-5">{t.about.p1}</p>
          <p className="mb-8">{t.about.p2}</p>

          <div className="flex flex-wrap gap-2.5">
            {t.about.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-border bg-surface px-4 py-2 rounded-full text-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display text-sm text-text-faint tracking-wide mb-8"
        >
          {t.about.pathLabel}
        </motion.p>

        <div ref={containerRef} className="relative pl-8 md:pl-9 max-w-2xl">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <div
            ref={lineRef}
            className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-accent-2 origin-top"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${i === experiences.length - 1 ? "" : "pb-12"}`}
            >
              <span className="absolute -left-8 md:-left-9 top-1 w-2.5 h-2.5 rounded-full bg-bg border-2 border-accent" />
              <span className="block text-xs text-text-faint mb-2 tracking-wide">
                {exp.period} · {exp.location}
              </span>
              <h3 className="font-display text-lg font-semibold mb-1 leading-snug">
                {exp.role}
                <span className="block text-sm font-normal text-text-dim mt-0.5">{exp.org}</span>
              </h3>
              <p className="text-text-dim text-[0.92rem] leading-relaxed max-w-xl">
                {exp.bullets[0]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
