"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NAV_LINKS = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
] as const;

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  de: "DE",
};

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function switchLocale(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-(--color-border) shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / name */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-(--color-foreground) hover:text-(--color-primary) transition-colors"
        >
          gasandov
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className="text-sm text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors capitalize"
              >
                {t(key)}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              className="text-sm text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors"
            >
              {t("blog")}
            </Link>
          </li>
          <li>
            <Link
              href="/photos"
              className="text-sm text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors"
            >
              {t("photos")}
            </Link>
          </li>
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Locale switcher */}
          <div className="hidden md:flex items-center gap-1 border border-(--color-border) rounded-full px-1 py-0.5">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
                  loc === locale
                    ? "bg-(--color-primary) text-(--color-primary-foreground)"
                    : "text-(--color-muted-foreground) hover:text-(--color-foreground)"
                }`}
                aria-label={`Switch to ${loc}`}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={t("toggleTheme")}
            className="p-2 rounded-full text-(--color-muted-foreground) hover:text-(--color-foreground) hover:bg-(--color-muted) transition-colors"
          >
            {mounted ? (
              isDark ? (
                <SunIcon className="w-4 h-4" />
              ) : (
                <MoonIcon className="w-4 h-4" />
              )
            ) : (
              <span className="w-4 h-4 block" />
            )}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            className="md:hidden p-2 rounded-full text-(--color-muted-foreground) hover:text-(--color-foreground) hover:bg-(--color-muted) transition-colors"
          >
            {menuOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-(--color-border) bg-background/95 backdrop-blur-md">
          <ul className="flex flex-col px-4 py-4 gap-3">
            {NAV_LINKS.map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors capitalize py-1"
                >
                  {t(key)}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="block text-sm text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors py-1"
              >
                {t("blog")}
              </Link>
            </li>
            <li>
              <Link
                href="/photos"
                className="block text-sm text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors py-1"
              >
                {t("photos")}
              </Link>
            </li>
            {/* Locale switcher (mobile) */}
            <li className="flex items-center gap-2 pt-2 border-t border-(--color-border)">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    switchLocale(loc);
                    setMenuOpen(false);
                  }}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                    loc === locale
                      ? "bg-(--color-primary) text-(--color-primary-foreground) border-(--color-primary)"
                      : "border-(--color-border) text-(--color-muted-foreground) hover:text-(--color-foreground)"
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </button>
              ))}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
