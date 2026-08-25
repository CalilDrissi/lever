import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { PostCard } from "@/components/blog/post-card";
import { getAllArticleTags, getArticlesByTag, tagToSlug } from "@/lib/blog";

// Export mode: only the tags enumerated here are built; nothing on-demand.
export const dynamicParams = false;

// See app/blog/[slug]/page.tsx — a placeholder keeps the export valid before
// any tagged posts exist.
const PLACEHOLDER_TAG = "a-venir";

export async function generateStaticParams() {
  const tags = await getAllArticleTags();
  if (tags.length === 0) return [{ tag: PLACEHOLDER_TAG }];
  return tags.map((tag) => ({ tag: tagToSlug(tag) }));
}

/** Resolve a URL tag-slug back to its original (accented) tag label. */
async function resolveTag(slug: string): Promise<string | null> {
  const tags = await getAllArticleTags();
  return tags.find((t) => tagToSlug(t) === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tag = await resolveTag(params.tag);
  if (!tag) return { title: "Blog — Virtus Lever" };
  return {
    title: `${tag} — Blog Virtus Lever`,
    description: `Tous les articles Virtus Lever sur le thème « ${tag} ».`,
    alternates: { canonical: `/blog/tag/${params.tag}` },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: { tag: string };
}) {
  const tag = await resolveTag(params.tag);

  // Only reachable for the placeholder tag before any tagged posts exist.
  if (!tag) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Blog · Thème"
          title="Bientôt"
          lead="Les thèmes apparaîtront ici dès les premiers articles."
        />
        <Section>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
            Tous les articles
          </Link>
        </Section>
      </PageShell>
    );
  }

  const posts = await getArticlesByTag(tag);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Blog · Thème"
        title={tag}
        lead={`Tous les articles sur le thème « ${tag} ».`}
      />

      <Section>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft mb-10"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          Tous les articles
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
