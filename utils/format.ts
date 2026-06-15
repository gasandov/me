/**
 * Shared date, currency, and number formatting utilities.
 * All functions are locale-aware and avoid hardcoded BCP-47 tags.
 */

/** Maps a next-intl locale code to a BCP-47 tag suitable for Intl APIs. */
export function bcp47FromLocale(locale: string): string {
  return locale === "es" ? "es-MX" : "en-US";
}

/**
 * Formats a "YYYY-MM" date string as "Mon YYYY" in the given locale.
 * Used by the Experience timeline.
 */
export function formatMonthYear(dateStr: string, locale: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat(bcp47FromLocale(locale), {
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Formats a number as MXN currency using the locale's conventions.
 * Rounds to the nearest integer.
 */
export function formatMXN(amount: number, locale = "es"): string {
  return amount.toLocaleString(bcp47FromLocale(locale), {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/**
 * Formats an amount as a plain MXN string without the full currency symbol
 * (e.g. "$12,345"). Used by the CashbackCalculator.
 */
export function formatMxAmount(amount: number, locale: string): string {
  return `$${amount.toLocaleString(bcp47FromLocale(locale))}`;
}

/** Formats a percentage rate according to locale conventions. */
export function formatRatePercent(rate: number, locale: string): string {
  return rate.toLocaleString(bcp47FromLocale(locale), {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
