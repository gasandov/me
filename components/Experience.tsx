"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import experienceData from "@/content/experience.json";

function formatMonthYear(dateStr: string, locale: string): string {
  const date = new Date(`${dateStr}-01`);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

interface Subproject {
  key: string;
}

interface ExperienceItem {
  key: string;
  company: string;
  start: string;
  end: string | null;
  stack: string[];
  subprojects?: Subproject[];
}

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();

  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-primary uppercase tracking-widest text-center mb-3"
          >
            02
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-14 text-foreground"
          >
            {t("heading")}
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden sm:block" />

            <div className="space-y-10">
              {(experienceData.items as ExperienceItem[]).map((item, i) => {
                const bullets = t.raw(`${item.key}.bullets`) as string[];
                const subprojectTranslations = item.subprojects
                  ? (
                      t.raw(`${item.key}.subprojects`) as Record<
                        string,
                        { name: string; description: string }
                      >
                    )
                  : null;

                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="sm:pl-14 relative"
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:flex absolute left-0 top-1.5 h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-primary shadow-sm">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {t(`${item.key}.role`)}
                          </h3>
                          <p className="text-sm font-medium text-primary">
                            {item.company}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-0.5 shrink-0">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {formatMonthYear(item.start, locale)} –{" "}
                            {item.end
                              ? formatMonthYear(item.end, locale)
                              : t("present")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {t(`${item.key}.location`)}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 mb-4">
                        {bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {item.subprojects && subprojectTranslations && (
                        <div className="mb-4 space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Projects
                          </p>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {item.subprojects.map((sp) => {
                              const spT = subprojectTranslations[sp.key];
                              if (!spT) return null;
                              return (
                                <div
                                  key={sp.key}
                                  className="rounded-lg border border-border bg-muted/40 px-3 py-2.5"
                                >
                                  <p className="text-xs font-semibold text-foreground mb-0.5">
                                    {spT.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {spT.description}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
