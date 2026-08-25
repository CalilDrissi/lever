import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { RichText } from "@/components/blog/rich-text";
import { formatDate } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug, tagToSlug } from "@/lib/contentful";

// Export mode: only the slugs enumerated here are built; nothing on-demand.
export const dynamicParams = false;

// `output: export` rejects a dynamic route with zero params. Before any
// posts exist we emit one placeholder slug so the site still builds; the
// page renders a friendly "à venir" state for it. Once real posts exist the
// placeholder disappears.
const PLACEHOLDER_SLUG = "a-venir";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (posts.length === 0) return [{ slug: PLACEHOLDER_SLUG }];
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Article — Virtus Lever" };
  return {
    title: `${post.title} — Virtus Lever`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
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
  const post = await getPostBySlug(params.slug);

  // Only reachable for the placeholder slug (dynamicParams=false restricts
  // routing to enumerated slugs, which all resolve to real posts).
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

  return (
    <PageShell>
      <article>
        {/* Article header */}
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
              </div>
            </div>
          </div>
        </header>

        {/* Cover image */}
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
            <RichText document={post.body} />
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
      </article>
    </PageShell>
  );
}
