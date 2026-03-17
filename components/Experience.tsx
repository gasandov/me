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

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Wizeline",
    period: "2022 – Present",
    location: "Guadalajara, MX (Remote)",
    bullets: [
      "Architected a real-time data pipeline processing 2M+ events/day for a US fintech client, reducing latency by 70%.",
      "Led a squad of 5 engineers, driving TypeScript adoption and establishing team code-review standards.",
      "Designed and shipped a micro-frontend architecture with Module Federation, cutting time-to-feature by 35%.",
      "Championed observability improvements (OpenTelemetry + Datadog), reducing mean time to recovery from 45 min to 8 min.",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Kafka"],
  },
  {
    role: "Full-Stack Developer",
    company: "Softtek",
    period: "2019 – 2022",
    location: "Mexico City, MX",
    bullets: [
      "Built and maintained 4 client-facing web applications across retail and healthcare verticals.",
      "Integrated Stripe and Conekta payment gateways, enabling $500K/month in transactions.",
      "Revamped CI/CD pipelines with GitHub Actions, reducing deploy times from 30 min to under 7 min.",
      "Delivered a headless CMS migration (Contentful) that improved editor experience and content velocity.",
    ],
    stack: ["Next.js", "Express", "MySQL", "Redis", "Docker", "GCP"],
  },
  {
    role: "Junior Web Developer",
    company: "Freelance / Early Career",
    period: "2017 – 2019",
    location: "Mexico City, MX",
    bullets: [
      "Developed responsive websites and small SPAs for 10+ local businesses and startups.",
      "Built a custom e-commerce solution with a real-time inventory dashboard for a local retailer.",
      "Worked directly with clients to gather requirements, iterate on designs, and deliver on time.",
    ],
    stack: ["React", "JavaScript", "Firebase", "CSS Modules"],
  },
];

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="py-24 px-4 bg-muted/40">
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
            02
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-14 text-(--color-foreground)"
          >
            {t("heading")}
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-(--color-border) hidden sm:block" />

            <div className="space-y-10">
              {EXPERIENCES.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="sm:pl-14 relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-0 top-1.5 h-8 w-8 items-center justify-center rounded-full bg-(--color-card) border-2 border-(--color-primary) shadow-sm">
                    <div className="h-2.5 w-2.5 rounded-full bg-(--color-primary)" />
                  </div>

                  <div className="rounded-2xl border border-(--color-border) bg-(--color-card) p-6 hover:border-primary/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-base font-semibold text-(--color-foreground)">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-(--color-primary)">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-0.5 shrink-0">
                        <span className="text-xs font-medium text-(--color-muted-foreground) bg-(--color-muted) px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                        <span className="text-xs text-(--color-muted-foreground)">
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-(--color-muted-foreground) leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-(--color-primary) font-medium"
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
