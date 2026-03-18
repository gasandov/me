"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPinIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

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
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

type LanguageEntry = { name: string; level: string };

export function About() {
  const t = useTranslations("about");
  const languages = t.raw("languages.list") as LanguageEntry[];

  return (
    <section id="about" className="py-24 px-4">
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
            01
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-14 text-foreground"
          >
            {t("heading")}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-foreground text-base sm:text-lg leading-relaxed">
                {t("bio")}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                {t("bio2")}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {t("locationLabel")}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {t("location")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <BriefcaseIcon className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {t("statusLabel")}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {t("status")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { value: "8+", label: t("stats.yearsExp") },
                  { value: "10+", label: t("stats.projects") },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-muted text-center"
                  >
                    <span className="text-2xl font-bold text-primary">
                      {value}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1 whitespace-pre-line leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-muted">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  {t("languages.label")}
                </p>
                <div className="flex flex-col gap-2">
                  {languages.map(({ name, level }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
