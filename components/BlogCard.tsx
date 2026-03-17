import { Link } from "@/i18n/navigation";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
  readMore: string;
  readingTimeLabel: string;
}

export function BlogCard({ post, readMore, readingTimeLabel }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link href={`/blog/${post.slug}`} className="group-hover:no-underline">
        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h2>
      </Link>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {post.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden>·</span>
          <span>{readingTimeLabel.replace("{minutes}", String(post.readingTime))}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-medium text-primary hover:underline"
        >
          {readMore} →
        </Link>
      </div>
    </article>
  );
}
