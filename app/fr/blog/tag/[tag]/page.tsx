import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { PostCard } from "@/components/blog/post-card";
import { getAllArticleTags, getArticlesByTag, tagToSlug } from "@/lib/blog";

export const dynamicParams = false;

const PLACEHOLDER_TAG = "a-venir";

export async function generateStaticParams() {
  const tags = await getAllArticleTags("fr");
  if (tags.length === 0) return [{ tag: PLACEHOLDER_TAG }];
  return tags.map((tag) => ({ tag: tagToSlug(tag) }));
}

async function resolveTag(slug: string): Promise<string | null> {
  const tags = await getAllArticleTags("fr");
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
    alternates: { canonical: `/fr/blog/tag/${params.tag}` },
  };
}

export default async function FrBlogTagPage({
  params,
}: {
  params: { tag: string };
}) {
  const tag = await resolveTag(params.tag);

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
            href="/fr/blog"
            className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
            Tous les articles
          </Link>
        </Section>
      </PageShell>
    );
  }

  const posts = await getArticlesByTag(tag, "fr");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Blog · Thème"
        title={tag}
        lead={`Tous les articles sur le thème « ${tag} ».`}
      />

      <Section>
        <Link
          href="/fr/blog"
          className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft mb-10"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          Tous les articles
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} basePath="/fr/blog" />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
