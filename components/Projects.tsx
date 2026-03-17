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
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "gasandov.dev",
    description:
      "My personal portfolio and blog. Built with Next.js App Router, next-intl for multilingual support (EN/ES/DE), Tailwind CSS v4, and framer-motion animations. Features dark mode, MDX blog, dynamic OG images, and RSS feed.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "MDX"],
    github: "https://github.com/gasandov/me",
    featured: true,
  },
  {
    title: "Splitr",
    description:
      "A web app for splitting expenses with friends and roommates. Supports real-time balance updates, smart settlement suggestions to minimize transactions, and receipt photo uploads.",
    stack: ["React", "Node.js", "Socket.io", "PostgreSQL", "Prisma"],
    github: "https://github.com/gasandov/splitr",
    demo: "https://splitr-demo.vercel.app",
    featured: true,
  },
  {
    title: "QuickAPI",
    description:
      "A CLI tool to scaffold RESTful APIs from a YAML spec. Generates controllers, route handlers, validation schemas, and tests — reducing boilerplate setup from hours to seconds.",
    stack: ["Node.js", "TypeScript", "Commander.js", "Zod"],
    github: "https://github.com/gasandov/quickapi",
  },
  {
    title: "Memos",
    description:
      "A lightweight Markdown-based note-taking app with full-text search, tag filtering, and offline support via a Service Worker. Syncs across devices using a small Express backend.",
    stack: ["React", "Express", "SQLite", "Markdown", "PWA"],
    github: "https://github.com/gasandov/memos",
    demo: "https://memos-app.vercel.app",
  },
];

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-24 px-4 bg-(--color-muted)/40">
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
            04
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-center mb-14 text-(--color-foreground)"
          >
            {t("heading")}
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className="group flex flex-col rounded-2xl border border-(--color-border) bg-(--color-card) p-6 hover:border-(--color-primary)/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-(--color-foreground) group-hover:text-(--color-primary) transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-sm text-(--color-muted-foreground) leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-(--color-muted) text-(--color-muted-foreground) border border-(--color-border)"
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
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-(--color-muted-foreground) hover:text-(--color-foreground) transition-colors"
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
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-(--color-primary) hover:opacity-80 transition-opacity"
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
