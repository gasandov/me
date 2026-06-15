/**
 * Base prose classes shared across all MDX pages.
 */
const PROSE_BASE =
  "prose prose-neutral dark:prose-invert max-w-none " +
  "prose-headings:font-semibold prose-headings:text-foreground " +
  "prose-p:text-foreground/90 prose-p:leading-relaxed " +
  "prose-a:text-primary prose-a:no-underline hover:prose-a:underline " +
  "prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm " +
  "prose-pre:bg-muted prose-pre:border prose-pre:border-border " +
  "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic " +
  "prose-li:text-foreground/90";

/** Prose for static pages with tables (now, uses). */
export const PROSE_PAGE =
  `${PROSE_BASE} prose-table:text-sm prose-th:text-foreground prose-td:text-foreground/90`;

/** Prose for blog posts (justified text, rounded images). */
export const PROSE_BLOG =
  `${PROSE_BASE} text-justify prose-img:rounded-xl`;
