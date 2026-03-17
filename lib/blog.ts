import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

/**
 * Builds a slug → best-matching filename map.
 *
 * Priority (higher wins):
 *   2 — exact locale match  (slug.{locale}.mdx)
 *   1 — English fallback    (slug.en.mdx) or legacy no-locale file
 *   0 — other locale        (kept only when no better option exists)
 */
function buildSlugMap(
  files: string[],
  locale?: string,
): Map<string, string> {
  const slugMap = new Map<string, { file: string; priority: number }>();

  for (const file of files) {
    const localeMatch = file.match(/^(.+)\.([a-z]{2})\.(mdx|md)$/);
    let slug: string;
    let priority: number;

    if (localeMatch) {
      const [, s, fileLocale] = localeMatch;
      slug = s;
      if (locale && fileLocale === locale) {
        priority = 2;
      } else if (fileLocale === "en") {
        priority = 1;
      } else {
        priority = 0;
      }
    } else {
      // Legacy file without a locale suffix — treat like English fallback
      slug = file.replace(/\.(mdx|md)$/, "");
      priority = 1;
    }

    const current = slugMap.get(slug);
    if (!current || priority > current.priority) {
      slugMap.set(slug, { file, priority });
    }
  }

  return new Map(
    [...slugMap.entries()].map(([slug, { file }]) => [slug, file]),
  );
}

function readPostMeta(slug: string, filePath: string): BlogPostMeta {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    description: (data.description as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    readingTime: Math.max(1, Math.ceil(rt.minutes)),
  };
}

export function getAllPosts(locale?: string): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.(mdx|md)$/.test(f));

  const slugMap = buildSlugMap(files, locale);

  const posts: BlogPostMeta[] = [];
  for (const [slug, file] of slugMap) {
    posts.push(readPostMeta(slug, path.join(BLOG_DIR, file)));
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPost(slug: string, locale?: string): BlogPost | null {
  const candidates: string[] = [];

  if (locale && locale !== "en") {
    candidates.push(`${slug}.${locale}.mdx`, `${slug}.${locale}.md`);
  }
  // English fallback, then legacy no-locale files
  candidates.push(`${slug}.en.mdx`, `${slug}.en.md`, `${slug}.mdx`, `${slug}.md`);

  for (const candidate of candidates) {
    const filePath = path.join(BLOG_DIR, candidate);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      description: (data.description as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      readingTime: Math.max(1, Math.ceil(rt.minutes)),
      content,
    };
  }

  return null;
}
