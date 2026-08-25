import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { ArticleBody } from "@/components/blog/article-body";
import { PostCard } from "@/components/blog/post-card";
import { formatDate } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  tagToSlug,
} from "@/lib/blog";

// Export mode: only the slugs enumerated here are built; nothing on-demand.
export const dynamicParams = false;

const PLACEHOLDER_SLUG = "a-venir";

export async function generateStaticParams() {
  const posts = await getAllArticles();
  if (posts.length === 0) return [{ slug: PLACEHOLDER_SLUG }];
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getArticleBySlug(params.slug);
  if (!post) return { title: "Article — Virtus Lever" };
  return {
    title: `${post.title} — Virtus Lever`,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getArticleBySlug(params.slug);

  if (!post) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Blog"
          title="Cet article arrive bientôt."
          lead="Le premier contenu est en préparation."
        />
        <Section>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
            Retour au blog
          </Link>
        </Section>
      </PageShell>
    );
  }

  const related = post.related ? await getRelatedArticles(post.related) : [];

  return (
    <PageShell>
      <article>
        {/* Header */}
        <header className="border-b border-neutral-20 bg-neutral-5">
          <div className="container pt-32 pb-12 sm:pt-36">
            <div className="measure">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
              >
                <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
                Tous les articles
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tagToSlug(tag)}`}>
                    <Badge variant="neutral" className="cursor-pointer hover:border-neutral-30">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              <h1 className="mt-4 font-display text-h1 tracking-tight text-neutral-90">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-neutral-60">
                {post.author ? <span>{post.author}</span> : null}
                {post.author && post.publishedDate ? <span aria-hidden="true">·</span> : null}
                {post.publishedDate ? (
                  <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                ) : null}
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min de lecture</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover */}
        {post.coverImageUrl ? (
          <div className="container pt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              className="w-full max-h-[520px] object-cover rounded-lg border border-neutral-20"
            />
          </div>
        ) : null}

        {/* Body */}
        <Section className="pt-10">
          <div className="measure">
            <ArticleBody article={post} />
          </div>

          <div className="measure mt-14 pt-6 border-t border-neutral-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
            >
              <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
              Retour au blog
            </Link>
          </div>
        </Section>

        {/* Related */}
        {related.length > 0 ? (
          <section className="border-t border-neutral-20 bg-neutral-5">
            <div className="container py-14 sm:py-16">
              <h2 className="font-display text-h4 tracking-tight text-neutral-90 mb-8">
                À lire ensuite
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <PostCard key={r.slug} post={r} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>
    </PageShell>
  );
}
