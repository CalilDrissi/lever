import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { ArticleBody } from "@/components/blog/article-body";
import { PostCard, formatDate } from "@/components/blog/post-card";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ArticleToc } from "@/components/blog/article-toc";
import { WaveformPlayer } from "@/components/blog/waveform-player";
import { BlurImage } from "@/components/blur-image";
import { Badge } from "@/components/ui/badge";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  articleHeadings,
  articlePlainText,
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

const COLUMN = "mx-auto w-full max-w-[720px]";

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

  const [related, headings] = await Promise.all([
    post.related ? getRelatedArticles(post.related) : Promise.resolve([]),
    Promise.resolve(articleHeadings(post)),
  ]);
  const plainText = articlePlainText(post);

  return (
    <PageShell>
      <ReadingProgress targetId="post-article" />
      <article id="post-article">
        {/* Header — centered column */}
        <header className="border-b border-neutral-20 bg-neutral-5">
          <div className="container pt-32 pb-12 sm:pt-36">
            <div className={COLUMN}>
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

              <h1 className="mt-4 font-display text-h3 sm:text-h2 tracking-tight text-neutral-90 text-balance">
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

              <div className="mt-7">
                <WaveformPlayer text={plainText} />
              </div>
            </div>
          </div>
        </header>

        {/* Cover — centered, slightly wider than the text column */}
        {post.coverImageUrl ? (
          <div className="container pt-10">
            <BlurImage
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              wrapperClassName="mx-auto w-full max-w-[860px] aspect-[16/9] rounded-lg border border-neutral-20"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        {/* Body — centered column, sticky TOC rail on wide screens */}
        <div className="container py-12 sm:py-14">
          <ArticleToc headings={headings} />
          <div className={COLUMN}>
            <ArticleBody article={post} />

            <div className="mt-14 pt-6 border-t border-neutral-20">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
              >
                <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
                Retour au blog
              </Link>
            </div>
          </div>
        </div>

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
