"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function SectionNav() {
  const { t } = useI18n();
  const sections = [
    { id: "home", label: t.sectionNav.home },
    { id: "about", label: t.sectionNav.about },
    { id: "work", label: t.sectionNav.work },
    { id: "services", label: t.sectionNav.services },
    { id: "contact", label: t.sectionNav.contact },
  ];
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[120] hidden lg:flex flex-col gap-5"
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          aria-current={active === id ? "true" : undefined}
          data-cursor-hover
          className="group relative flex items-center justify-end"
        >
          <span
            className={`mr-3 text-[0.68rem] uppercase tracking-wide whitespace-nowrap transition-all duration-300 ${
              active === id
                ? "opacity-100 translate-x-0 text-text"
                : "opacity-0 translate-x-2 text-text-faint group-hover:opacity-100 group-hover:translate-x-0"
            }`}
          >
            {label}
          </span>
          <span
            className={`block rounded-full border transition-all duration-300 ${
              active === id
                ? "w-2.5 h-2.5 bg-accent border-accent"
                : "w-1.5 h-1.5 bg-transparent border-text-faint group-hover:border-text-dim"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
