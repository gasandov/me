import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/config";

const STATIC_PAGES = [
  "", // home
  "/blog",
  "/photos",
  "/now",
  "/uses",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages — one entry per locale
  for (const locale of routing.locales) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}${page}`]),
            ),
            "x-default": `${SITE_URL}/${routing.defaultLocale}${page}`,
          },
        },
      });
    }
  }

  // Blog posts — one entry per post per locale
  const posts = getAllPosts();
  for (const post of posts) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((loc) => [
                loc,
                `${SITE_URL}/${loc}/blog/${post.slug}`,
              ]),
            ),
            "x-default": `${SITE_URL}/${routing.defaultLocale}/blog/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
