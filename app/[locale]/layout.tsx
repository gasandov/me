import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gasandov.dev";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}`]),
  );

  return {
    title: {
      default: `${t("name")} — ${t("title")}`,
      template: `%s | ${t("name")}`,
    },
    description: t("tagline"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...languages,
        "x-default": `${SITE_URL}/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_MX" : "en_US",
      url: `${SITE_URL}/${locale}`,
      siteName: t("name"),
      title: `${t("name")} — ${t("title")}`,
      description: t("tagline"),
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} — ${t("title")}`,
      description: t("tagline"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Germán Sandoval",
  url: SITE_URL,
  jobTitle: "Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building scalable web applications with clean code and thoughtful UX.",
  sameAs: [
    "https://github.com/gasandov",
    "https://linkedin.com/in/gasandov",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <main>{children}</main>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
