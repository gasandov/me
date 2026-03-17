import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { BlogSearch } from "@/components/BlogSearch";

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
  const t = await getTranslations({ locale, namespace: "blog" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  return {
    title: t("heading"),
    description: t("heading"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}/blog`]),
      ),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}/blog`,
      title: `${t("heading")} | ${tHero("name")}`,
      description: t("heading"),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations({ locale, namespace: "blog" });

  const posts = getAllPosts(locale);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-(--color-foreground) mb-3">
            {t("heading")}
          </h1>
          <p className="text-(--color-muted-foreground)">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        <BlogSearch
          posts={posts}
          searchPlaceholder={t("searchPlaceholder")}
          noResults={t("noResults")}
          readMore={t("readMore")}
          readingTimeLabel={t.raw("readingTime") as string}
        />
      </div>
    </div>
  );
}
