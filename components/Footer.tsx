"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>{t("madeWith")}</p>

        <nav aria-label="Footer navigation" className="flex items-center gap-4">
          <Link
            href="/photos"
            className="hover:text-foreground transition-colors"
          >
            {t("photos")}
          </Link>
          <Link
            href="/now"
            className="hover:text-foreground transition-colors"
          >
            {t("now")}
          </Link>
          <Link
            href="/uses"
            className="hover:text-foreground transition-colors"
          >
            {t("uses")}
          </Link>
        </nav>

        <p>
          © {year} Germán Sandoval · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
