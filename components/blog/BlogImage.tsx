"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MotionImage = motion(Image);

interface Props {
  src?: string;
  alt?: string;
}

export function BlogImage({ src, alt }: Props) {
  const t = useTranslations("blog");
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    // Move focus to the close button when lightbox opens
    closeButtonRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!src) return null;

  const closeLabel = t("closeImage");

  return (
    <>
      <Image
        src={src}
        alt={alt ?? ""}
        width={0}
        height={0}
        sizes="100vw"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        className="rounded-xl cursor-zoom-in w-full h-auto"
      />

      <AnimatePresence>
        {open && createPortal(
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt ?? closeLabel}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

            {/* Close button */}
            <button
              ref={closeButtonRef}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              onClick={close}
              aria-label={closeLabel}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Image */}
            <MotionImage
              src={src}
              alt={alt ?? ""}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 90vw"
              className="relative z-10 max-w-full max-h-[90vh] w-auto h-auto rounded-xl object-contain shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>,
          document.body,
        )}
      </AnimatePresence>
    </>
  );
}
