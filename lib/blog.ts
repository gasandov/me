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
  locale?: string;
  readingTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getAllPosts(locale?: string): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts: BlogPostMeta[] = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      description: (data.description as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      locale: data.locale as string | undefined,
      readingTime: Math.max(1, Math.ceil(rt.minutes)),
    };
  });

  return posts
    .filter((p) => !locale || !p.locale || p.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPost | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];

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
      locale: data.locale as string | undefined,
      readingTime: Math.max(1, Math.ceil(rt.minutes)),
      content,
    };
  }

  return null;
}
