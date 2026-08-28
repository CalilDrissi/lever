import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { PostCard } from "@/components/blog/post-card";
import { getAllArticleTags, getArticlesByTag, tagToSlug } from "@/lib/blog";

export const dynamicParams = false;

const PLACEHOLDER_TAG = "coming-soon";

export async function generateStaticParams() {
  const tags = await getAllArticleTags("en");
  if (tags.length === 0) return [{ tag: PLACEHOLDER_TAG }];
  return tags.map((tag) => ({ tag: tagToSlug(tag) }));
}

async function resolveTag(slug: string): Promise<string | null> {
  const tags = await getAllArticleTags("en");
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
    title: `${tag} — Virtus Lever Blog`,
    description: `All Virtus Lever articles on the topic "${tag}".`,
    alternates: { canonical: `/blog/tag/${params.tag}` },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: { tag: string };
}) {
  const tag = await resolveTag(params.tag);

  if (!tag) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Blog · Topic"
          title="Coming soon"
          lead="Topics will appear here once the first articles are published."
        />
        <Section>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
            All articles
          </Link>
        </Section>
      </PageShell>
    );
  }

  const posts = await getArticlesByTag(tag, "en");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Blog · Topic"
        title={tag}
        lead={`All articles on the topic "${tag}".`}
      />

      <Section>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft mb-10"
        >
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          All articles
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale="en" />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
