import fs from "fs";
import path from "path";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gasandov.dev";

function getUsesContent() {
  const filePath = path.join(process.cwd(), "content/uses.mdx");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, frontmatter: data as { lastUpdated?: string } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "uses" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  return {
    title: t("heading"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/uses`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}/uses`]),
      ),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}/uses`,
      title: `${t("heading")} | ${tHero("name")}`,
      description: t("description"),
    },
  };
}

export default async function UsesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations({ locale, namespace: "uses" });

  const doc = getUsesContent();
  if (!doc) notFound();

  const formattedDate = doc.frontmatter.lastUpdated
    ? new Date(doc.frontmatter.lastUpdated).toLocaleDateString(
        locale === "de" ? "de-DE" : locale === "es" ? "es-MX" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : null;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-(--color-foreground) mb-3">
            {t("heading")}
          </h1>
          <p className="text-(--color-muted-foreground) mb-4">
            {t("description")}
          </p>
          {formattedDate && (
            <p className="text-xs text-(--color-muted-foreground) border-t border-(--color-border) pt-4">
              {t("lastUpdated")}:{" "}
              <time dateTime={doc.frontmatter.lastUpdated}>
                {formattedDate}
              </time>
            </p>
          )}
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-(--color-foreground) prose-p:text-(--color-foreground)/90 prose-p:leading-relaxed prose-a:text-(--color-primary) prose-a:no-underline hover:prose-a:underline prose-code:text-(--color-primary) prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-(--color-muted) prose-pre:border prose-pre:border-(--color-border) prose-blockquote:border-l-4 prose-blockquote:border-(--color-primary) prose-blockquote:pl-4 prose-blockquote:italic prose-li:text-(--color-foreground)/90 prose-table:text-sm prose-th:text-(--color-foreground) prose-td:text-(--color-foreground)/90">
          <MDXRemote source={doc.content} />
        </article>
      </div>
    </div>
  );
}
