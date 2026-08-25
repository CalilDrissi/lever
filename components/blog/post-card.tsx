import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BlurImage } from "@/components/blur-image";
import type { Article } from "@/lib/blog";

/** Format an ISO date as e.g. "12 août 2026" (French). */
export function formatDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function PostCard({ post }: { post: Article }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-lg border border-neutral-20 bg-white overflow-hidden transition-shadow duration-200 ease-soft hover:shadow-card"
    >
      {post.coverImageUrl ? (
        <BlurImage
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          wrapperClassName="aspect-[16/10]"
          className="h-full w-full object-cover group-hover:scale-[1.03]"
        />
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-10">
          <div className="absolute inset-0 grid place-items-center text-neutral-30">
            <span className="font-display text-h4 tracking-tight">VL</span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags[0] ? <Badge variant="neutral">{post.tags[0]}</Badge> : null}
          {post.publishedDate ? (
            <span className="text-small text-neutral-60">
              {formatDate(post.publishedDate)}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 font-display text-h5 tracking-tight text-neutral-90 group-hover:text-purple-60 transition-colors duration-200 ease-soft">
          {post.title}
        </h3>

        {post.excerpt ? (
          <p className="mt-2 text-body text-neutral-80 line-clamp-3">{post.excerpt}</p>
        ) : null}

        <span className="mt-4 pt-4 border-t border-neutral-10 text-small font-medium text-neutral-80 group-hover:text-purple-60 transition-colors duration-200 ease-soft">
          Lire l'article →
        </span>
      </div>
    </Link>
  );
}
