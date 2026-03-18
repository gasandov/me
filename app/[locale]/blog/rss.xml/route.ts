import { Feed } from "feed";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  const feed = new Feed({
    title: "Germán Sandoval — Blog",
    description: "Thoughts on web development, architecture, and software craft.",
    id: `${SITE_URL}/${locale}/blog`,
    link: `${SITE_URL}/${locale}/blog`,
    language: locale,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Germán Sandoval`,
    author: {
      name: "Germán Sandoval",
      link: SITE_URL,
    },
    feedLinks: {
      rss2: `${SITE_URL}/${locale}/blog/rss.xml`,
    },
  });

  const posts = getAllPosts(locale);

  for (const post of posts) {
    const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((t) => ({ name: t })),
      author: [{ name: "Germán Sandoval", link: SITE_URL }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
