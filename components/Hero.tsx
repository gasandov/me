"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? "#";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16"
    >
      {/* Subtle radial gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="font-mono text-sm text-primary mb-3 tracking-widest uppercase"
        >
          {t("greeting")}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-4"
        >
          {t("name")}
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={item}
          className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed text-base sm:text-lg"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-primary"
          >
            {t("cta_resume")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-primary"
          >
            {t("cta_contact")}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <a href="#about" aria-label="Scroll to About">
          <ArrowDownIcon className="w-5 h-5 text-muted-foreground animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
