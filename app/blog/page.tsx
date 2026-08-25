import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { PostCard } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Blog — Virtus Lever",
  description:
    "Idées, méthodes et retours d'expérience pour une boîte de réception plus calme et une productivité à plus haut levier.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Blog"
        title="Une boîte plus calme, une pensée plus claire."
        lead="Idées, méthodes et retours d'expérience sur la productivité, l'email et l'effet de levier."
      />

      <Section>
        {tags.length > 0 ? (
          <div className="mb-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${tagToSlug(tag)}`}>
                <Badge
                  variant="neutral"
                  className="hover:border-neutral-30 hover:text-neutral-90 transition-colors duration-200 ease-soft cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        ) : null}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </Section>
    </PageShell>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-neutral-30 bg-neutral-5 px-6 py-16 text-center">
      <p className="font-display text-h5 tracking-tight text-neutral-90">
        Les premiers articles arrivent bientôt.
      </p>
      <p className="mt-2 text-body text-neutral-80 measure mx-auto">
        Reviens vite — ou{" "}
        <Link
          href="/#newsletter-email"
          className="text-neutral-90 underline underline-offset-4 hover:text-purple-60"
        >
          abonne-toi à la lettre
        </Link>{" "}
        pour être prévenu·e.
      </p>
    </div>
  );
}
