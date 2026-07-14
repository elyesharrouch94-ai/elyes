"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticLink } from "./ui/MagneticButton";
import ThemeToggle from "./ui/ThemeToggle";
import LanguageToggle from "./ui/LanguageToggle";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#services", label: t.nav.services },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 transition-all duration-400 ${
          scrolled ? "py-3.5 bg-bg/70 backdrop-blur-xl border-b border-border" : "py-5.5"
        }`}
      >
        <a href="#home" className="font-display text-xl font-bold" data-cursor-hover>
          EH<span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-dim hover:text-text transition-colors"
                data-cursor-hover
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2.5">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <MagneticLink
            href="#contact"
            className="hidden md:inline-flex border border-border rounded-full px-5 py-2.5 text-sm hover:border-accent hover:bg-accent/10 transition-colors"
          >
            {t.nav.getInTouch}
          </MagneticLink>

          <button
            className="md:hidden flex flex-col gap-1.5 z-[101]"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            data-cursor-hover
          >
            <motion.span
              className="w-6 h-0.5 bg-text rounded-full"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text rounded-full"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text rounded-full"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-bg/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
