"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-border) py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-(--color-muted-foreground)">
        <p>{t("madeWith")}</p>
        <p>
          © {year} Germán Sandoval · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
