"use client";

import * as React from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/copy";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Resources — a homepage band of productivity videos (YouTube).
 *
 * Uses a "lite" facade rather than raw iframes: each card shows the video
 * thumbnail + a play button, and only mounts the YouTube <iframe> once the
 * user clicks. This keeps the homepage fast and avoids loading YouTube's
 * scripts/cookies for visitors who never press play. The video list lives
 * in lib/copy.ts (copy.fr.resources.videos) so it's easy to edit or swap.
 */
export function Resources() {
  const t = copy.fr.resources;

  return (
    <section className="border-t border-neutral-20 bg-white">
      <div className="container py-20 sm:py-24">
        <div className="max-w-[46ch]">
          <p className="text-eyebrow uppercase text-neutral-80 mb-3">{t.eyebrow}</p>
          <h2 className="font-display text-h2 tracking-tight text-neutral-90">
            {t.title}
          </h2>
          <p className="mt-4 text-lead text-neutral-80">{t.sub}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.videos.map((v) => (
            <VideoCard
              key={v.id}
              id={v.id}
              topic={v.topic}
              title={v.title}
              blurb={v.blurb}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  id,
  topic,
  title,
  blurb,
}: {
  id: string;
  topic: string;
  title: string;
  blurb: string;
}) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className="group flex flex-col">
      {/* Media — 16:9 facade that swaps to the iframe on click */}
      <div className="relative aspect-video overflow-hidden rounded-lg border border-neutral-20 bg-neutral-10">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerated-encoder; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Lire la vidéo : ${title}`}
            className="absolute inset-0 h-full w-full"
          >
            {/* Thumbnail (plain <img> — no next/image, works on the static export) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.03]"
            />
            {/* Legibility scrim */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-neutral-90/40 via-transparent to-transparent"
            />
            {/* Play button */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "grid place-items-center size-14 rounded-full",
                "bg-white/95 text-neutral-90 shadow-card",
                "transition-transform duration-200 ease-soft group-hover:scale-105"
              )}
            >
              <Play size={22} strokeWidth={2} className="translate-x-0.5 fill-current" />
            </span>
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="mt-5">
        <Badge variant="neutral">{topic}</Badge>
        <h3 className="mt-3 font-display text-h5 tracking-tight text-neutral-90">
          {title}
        </h3>
        <p className="mt-2 text-body text-neutral-80">{blurb}</p>
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-small font-medium text-neutral-80 hover:text-purple-60 transition-colors duration-200 ease-soft"
        >
          Regarder sur YouTube
          <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
