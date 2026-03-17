import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Sections will be filled in PR 2 */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center"
      >
        <p className="text-(--color-muted-foreground) text-sm">
          Homepage — coming in PR 2
        </p>
      </section>
    </div>
  );
}
