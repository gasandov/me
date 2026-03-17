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
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface SkillCategory {
  label: string;
  color: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Frontend",
    color: "bg-violet-500/10 text-violet-500",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "React Query",
      "HTML / CSS",
    ],
  },
  {
    label: "Backend",
    color: "bg-sky-500/10 text-sky-500",
    skills: [
      "Node.js",
      "Express",
      "Fastify",
      "Python",
      "REST APIs",
      "GraphQL",
      "tRPC",
      "WebSockets",
    ],
  },
  {
    label: "Databases & Storage",
    color: "bg-amber-500/10 text-amber-500",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "MongoDB",
      "Prisma",
      "Drizzle ORM",
    ],
  },
  {
    label: "DevOps & Tools",
    color: "bg-emerald-500/10 text-emerald-500",
    skills: [
      "Git",
      "Docker",
      "GitHub Actions",
      "AWS",
      "GCP",
      "Vercel",
      "Linux",
      "Kafka",
    ],
  },
];

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-(--color-primary) uppercase tracking-widest text-center mb-3"
          >
            03
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-14 text-(--color-foreground)"
          >
            {t("heading")}
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((category) => (
              <motion.div
                key={category.label}
                variants={fadeUp}
                className="rounded-2xl border border-(--color-border) bg-(--color-card) p-6 hover:border-(--color-primary)/40 transition-colors"
              >
                <span
                  className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${category.color}`}
                >
                  {category.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1 rounded-full bg-(--color-muted) text-(--color-foreground) border border-(--color-border) hover:border-(--color-primary)/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
