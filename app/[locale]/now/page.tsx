import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/config";
import { PROSE_PAGE } from "@/lib/prose";
import { getLocaleMdxContent } from "@/lib/mdx-page";
import { bcp47FromLocale } from "@/utils/format";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "now" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  return {
    title: t("heading"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/now`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}/now`]),
        ),
        "x-default": `${SITE_URL}/${routing.defaultLocale}/now`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}/now`,
      title: `${t("heading")} | ${tHero("name")}`,
      description: t("description"),
    },
  };
}

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations({ locale, namespace: "now" });

  const doc = getLocaleMdxContent("now", locale);
  if (!doc) notFound();

  const formattedDate = doc.frontmatter.lastUpdated
    ? new Date(doc.frontmatter.lastUpdated).toLocaleDateString(
        bcp47FromLocale(locale),
        { year: "numeric", month: "long", day: "numeric" },
      )
    : null;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground mb-4">
            {t("description")}
          </p>
          {formattedDate && (
            <p className="text-xs text-muted-foreground border-t border-border pt-4">
              {t("lastUpdated")}:{" "}
              <time dateTime={doc.frontmatter.lastUpdated}>
                {formattedDate}
              </time>
            </p>
          )}
        </header>

        <article className={PROSE_PAGE}>
          <MDXRemote source={doc.content} />
        </article>
      </div>
    </div>
  );
}
