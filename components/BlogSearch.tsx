"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BlogCard } from "./BlogCard";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogSearchProps {
  posts: BlogPostMeta[];
  searchPlaceholder: string;
  noResults: string;
  readMore: string;
  readingTimeLabel: string;
}

export function BlogSearch({
  posts,
  searchPlaceholder,
  noResults,
  readMore,
  readingTimeLabel,
}: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 2 },
          { name: "description", weight: 1.5 },
          { name: "tags", weight: 1 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [posts],
  );

  const results = useMemo(() => {
    if (!query.trim()) return posts;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, posts]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-colors"
        />
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{noResults}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {results.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              readMore={readMore}
              readingTimeLabel={readingTimeLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
