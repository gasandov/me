import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MdxPageFrontmatter {
  lastUpdated?: string;
}

export interface MdxPageContent {
  content: string;
  frontmatter: MdxPageFrontmatter;
}

/**
 * Loads a locale-aware MDX page from the content/ directory.
 *
 * Resolution order (highest priority first):
 *   1. content/{slug}.{locale}.mdx
 *   2. content/{slug}.en.mdx
 *   3. content/{slug}.mdx  (legacy, no locale suffix)
 */
export function getLocaleMdxContent(
  slug: string,
  locale: string,
): MdxPageContent | null {
  const candidates = [
    `${slug}.${locale}.mdx`,
    `${slug}.en.mdx`,
    `${slug}.mdx`,
  ];

  for (const candidate of candidates) {
    const filePath = path.join(process.cwd(), "content", candidate);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(raw);
    return { content, frontmatter: data as MdxPageFrontmatter };
  }

  return null;
}
