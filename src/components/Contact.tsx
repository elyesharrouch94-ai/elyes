"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TiltCard from "./ui/TiltCard";
import { contact } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  const [toast, setToast] = useState<string | null>(null);

  const copy = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(message);
    } catch {
      setToast(`${t.contact.copyFailed} ${value}`);
    }
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <section id="contact" className="snap-section relative z-10 min-h-screen flex items-center px-6 py-32 md:py-0">
      <div className="max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display text-sm text-accent tracking-wide mb-4"
        >
          {t.contact.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-[clamp(2.2rem,5vw,3.6rem)] mb-6"
        >
          {t.contact.headingPre}
          <span className="gradient-text">{t.contact.headingHighlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg text-text-dim mb-12"
        >
          {t.contact.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TiltCard maxTilt={4} className="rounded-[18px]">
            <button
              onClick={() => copy(contact.email, t.contact.copiedEmail)}
              data-cursor-hover
              className="w-full text-left p-6.5 rounded-[18px] border border-border bg-surface hover:border-accent/40 hover:bg-surface-hover transition-colors flex flex-col gap-2"
            >
              <span className="text-xs uppercase tracking-wide text-text-faint">{t.contact.emailLabel}</span>
              <span className="font-display text-lg">{contact.email}</span>
            </button>
          </TiltCard>

          <TiltCard maxTilt={4} className="rounded-[18px]">
            <button
              onClick={() => copy(contact.phone, t.contact.copiedPhone)}
              data-cursor-hover
              className="w-full text-left p-6.5 rounded-[18px] border border-border bg-surface hover:border-accent/40 hover:bg-surface-hover transition-colors flex flex-col gap-2"
            >
              <span className="text-xs uppercase tracking-wide text-text-faint">{t.contact.phoneLabel}</span>
              <span className="font-display text-lg">{contact.phone}</span>
            </button>
          </TiltCard>

          <TiltCard maxTilt={4} className="rounded-[18px]">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="p-6.5 rounded-[18px] border border-border bg-surface hover:border-accent/40 hover:bg-surface-hover transition-colors flex flex-col gap-2"
            >
              <span className="text-xs uppercase tracking-wide text-text-faint">{t.contact.instagramLabel}</span>
              <span className="font-display text-lg">{contact.instagramHandle}</span>
            </a>
          </TiltCard>

          <div className="p-6.5 rounded-[18px] border border-border bg-surface flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-text-faint">{t.contact.locationLabel}</span>
            <span className="font-display text-lg">{contact.location}</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 bg-elevated border border-border text-text px-5.5 py-3 rounded-full text-sm z-[300]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
