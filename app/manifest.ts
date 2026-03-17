import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Germán Sandoval",
    short_name: "gasandov",
    description:
      "Full-stack software engineer building scalable web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5060d0",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
