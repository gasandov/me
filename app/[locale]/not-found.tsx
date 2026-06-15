import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">404</p>
      <h1 className="text-4xl font-bold text-foreground mb-3">{t("heading")}</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">{t("description")}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
