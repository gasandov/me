"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

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

interface ExperienceMeta {
  key: string;
  company: string;
  start: string;
  end: string | null;
  stack: string[];
  bulletCount: number;
}

const EXPERIENCE_META: ExperienceMeta[] = [
  {
    key: "wizeline",
    company: "Wizeline",
    start: "2022",
    end: null,
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Kafka"],
    bulletCount: 4,
  },
  {
    key: "softtek",
    company: "Softtek",
    start: "2019",
    end: "2022",
    stack: ["Next.js", "Express", "MySQL", "Redis", "Docker", "GCP"],
    bulletCount: 4,
  },
  {
    key: "freelance",
    company: "Freelance / Early Career",
    start: "2017",
    end: "2019",
    stack: ["React", "JavaScript", "Firebase", "CSS Modules"],
    bulletCount: 3,
  },
];

export function Experience() {
  const t = useTranslations("experience");

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
              {EXPERIENCE_META.map((meta, i) => (
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
                          {t(`${meta.key}.role`)}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {meta.company}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-0.5 shrink-0">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {meta.start} – {meta.end ?? t("present")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t(`${meta.key}.location`)}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {Array.from({ length: meta.bulletCount }, (_, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          {t(`${meta.key}.bullet_${j}`)}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {meta.stack.map((tech) => (
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
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
