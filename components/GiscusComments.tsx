"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface GiscusCommentsProps {
  slug: string;
}

export function GiscusComments({ slug }: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO ?? "";
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "";
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

  useEffect(() => {
    if (!repo || !repoId || !categoryId) return;
    if (!containerRef.current) return;

    // Remove any previously injected script to avoid duplication on theme change
    const existing = containerRef.current.querySelector("script[src*='giscus']");
    if (existing) existing.remove();

    const iframe = containerRef.current.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );

    if (iframe) {
      // Send a theme update message to already-loaded Giscus iframe
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: resolvedTheme === "dark" ? "dark" : "light",
            },
          },
        },
        "https://giscus.app",
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    containerRef.current.appendChild(script);
  }, [repo, repoId, category, categoryId, resolvedTheme, slug]);

  if (!repo || !repoId || !categoryId) return null;

  return (
    <div
      ref={containerRef}
      className="mt-12 pt-8 border-t border-border"
    />
  );
}
