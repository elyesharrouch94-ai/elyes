"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ScrollImageTunnel } from "@/components/ui/scroll-image-tunnel";
import WorkVideo from "@/components/WorkVideo";
import { workFilterKeys, type WorkCategory } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export default function Work() {
  const { t, workItems } = useI18n();
  const [filter, setFilter] = useState<"all" | WorkCategory>("all");

  const filterLabels: Record<"all" | WorkCategory, string> = {
    all: t.work.filterAll,
    corporate: t.work.filterCorporate,
    content: t.work.filterContent,
  };

  const filtered = useMemo(
    () => (filter === "all" ? workItems : workItems.filter((item) => item.category === filter)),
    [filter, workItems]
  );

  return (
    <section id="work" className="snap-section relative z-10 min-h-screen">
      <div className="px-6 pt-32 md:pt-36 pb-14 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display text-sm text-accent tracking-wide mb-4"
        >
          {t.work.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] mb-10"
        >
          {t.work.heading}
        </motion.h2>

        <div className="flex flex-wrap gap-2.5">
          {workFilterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              data-cursor-hover
              className={`relative px-5 py-2.5 rounded-full text-sm transition-colors ${
                filter === key ? "text-[var(--on-accent)]" : "text-text-dim border border-border bg-surface hover:text-text"
              }`}
            >
              {filter === key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full -z-10"
                  style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {filterLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div>
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6 }}
            className="relative border-t border-border px-6"
          >
            <div className="max-w-5xl mx-auto pt-20 pb-14">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-display text-sm text-text-faint">
                  {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </span>
                <span className="text-[0.72rem] uppercase tracking-wide text-text-faint border border-border px-3 py-1.5 rounded-full">
                  {item.client}
                </span>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold leading-[0.98] tracking-tight text-[clamp(2rem,5vw,4rem)] mb-7 max-w-3xl"
              >
                {item.title}
              </motion.h3>

              <p className="text-text-dim text-lg leading-relaxed max-w-2xl mb-8">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-text-dim border border-border px-3.5 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {item.images && (
              <div className="-mx-6">
                <ScrollImageTunnel
                  images={item.images.map((src) => ({ src, alt: `${item.client}: ${item.title}` }))}
                  hint={t.work.scrollHint(item.client)}
                  stepHeight="100vh"
                />
              </div>
            )}

            {item.video && (
              <div className="max-w-5xl mx-auto pb-16">
                <WorkVideo
                  src={item.video.src}
                  poster={item.video.poster}
                  label={`${item.client}: ${item.title}`}
                  aspect={item.video.aspect}
                  maxWidth={item.video.aspect ? 720 : undefined}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
