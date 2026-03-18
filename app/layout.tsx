import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/config";

// metadataBase is set here so all relative OG/twitter image URLs resolve correctly.
// html/body are provided by app/[locale]/layout.tsx to enable a dynamic lang attribute.
export const metadata: Metadata = {
  title: {
    default: "Germán Sandoval — Full-Stack Software Engineer",
    template: "%s | Germán Sandoval",
  },
  description:
    "Full-stack software engineer building scalable web applications with clean code and thoughtful UX.",
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
