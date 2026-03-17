import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing, type Locale } from "@/i18n/routing";
import { getAllPosts, getPost } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { GiscusComments } from "@/components/GiscusComments";
import { ArrowLeftIcon, ClockIcon, TagIcon } from "@heroicons/react/24/outline";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gasandov.dev";

export function generateStaticParams() {
  const posts = getAllPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const tHero = await getTranslations({ locale, namespace: "hero" });

  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${SITE_URL}/${loc}/blog/${slug}`,
          ]),
        ),
        "x-default": `${SITE_URL}/${routing.defaultLocale}/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      title: `${post.title} | ${tHero("name")}`,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "de" ? "de-DE" : locale === "es" ? "es-MX" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-(--color-muted-foreground) hover:text-(--color-primary) transition-colors mb-10"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          {t("backToBlog")}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-(--color-primary)"
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-(--color-foreground) leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-(--color-muted-foreground) leading-relaxed mb-6">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-(--color-muted-foreground) border-t border-(--color-border) pt-4">
            <time dateTime={post.date}>{formattedDate}</time>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3.5 h-3.5" />
              {t("readingTime", { minutes: post.readingTime })}
            </span>
          </div>
        </header>

        {/* MDX Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-(--color-foreground) prose-p:text-(--color-foreground)/90 prose-p:leading-relaxed prose-a:text-(--color-primary) prose-a:no-underline hover:prose-a:underline prose-code:text-(--color-primary) prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-(--color-muted) prose-pre:border prose-pre:border-(--color-border) prose-blockquote:border-l-4 prose-blockquote:border-(--color-primary) prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-xl prose-li:text-(--color-foreground)/90">
          <MDXRemote source={post.content} />
        </article>

        {/* Giscus comments */}
        <GiscusComments slug={post.slug} />
      </div>
    </div>
  );
}
