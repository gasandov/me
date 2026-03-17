"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

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

interface Project {
  title: string;
  descriptionKey: string;
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "me",
    descriptionKey: "me_description",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "MDX"],
    github: "https://github.com/gasandov/me",
    featured: true,
  },
];

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-24 px-4 bg-muted/40">
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
            04
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-14 text-foreground"
          >
            {t("heading")}
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {t("featured")}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {t(project.descriptionKey)}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <CodeBracketIcon className="w-4 h-4" />
                      {t("viewCode")}
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      {t("viewDemo")}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
