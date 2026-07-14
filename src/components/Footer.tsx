"use client";

import { useI18n } from "@/lib/i18n";
import TicTacToe from "./TicTacToe";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 px-6 py-16 border-t border-border">
      <TicTacToe />
      <p className="text-center text-text-faint text-sm mt-14">
        © {new Date().getFullYear()} Elyes Harrouch. {t.footer.rights}
      </p>
    </footer>
  );
}
