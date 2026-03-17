import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { getAllPhotos } from "@/lib/photos";
import { PhotoGrid } from "@/components/PhotoGrid";

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
  const t = await getTranslations({ locale, namespace: "photos" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  return {
    title: t("heading"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/photos`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}/photos`]),
        ),
        "x-default": `${SITE_URL}/${routing.defaultLocale}/photos`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}/photos`,
      title: `${t("heading")} | ${tHero("name")}`,
      description: t("description"),
    },
  };
}

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations({ locale, namespace: "photos" });

  const photos = getAllPhotos();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-(--color-foreground) mb-3">
            {t("heading")}
          </h1>
          <p className="text-(--color-muted-foreground)">{t("description")}</p>
        </div>

        <PhotoGrid photos={photos} noPhotos={t("noPhotos")} />
      </div>
    </div>
  );
}
