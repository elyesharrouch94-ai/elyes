"use client";

import Image from "next/image";
import { clientLogos } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const HEIGHT = 26;

export default function Logos() {
  const { t } = useI18n();
  const items = [...clientLogos, ...clientLogos];

  return (
    <div className="w-full border-t border-border pt-8">
      <p className="text-center text-[0.7rem] uppercase tracking-[0.2em] text-text-faint mb-6">
        {t.hero.trustedBy}
      </p>
      <div className="logo-marquee overflow-hidden">
        <div className="flex items-center gap-14 w-max animate-marquee">
          {items.map((logo, i) => {
            const height = HEIGHT * (logo.scale ?? 1);
            return (
            <div
              key={`${logo.name}-${i}`}
              style={{ height, width: height * logo.ratio }}
              className="relative shrink-0"
            >
              <Image
                src={logo.file}
                alt={logo.name}
                fill
                sizes="200px"
                className={`object-contain object-center ${logo.monochromeWhite ? "logo-mark" : ""} ${logo.whiteOnDark ? "logo-force-white" : ""}`}
              />
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
