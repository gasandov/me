import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

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
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <ContactSection />
      <Footer />
    </div>
  );
}
