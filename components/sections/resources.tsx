"use client";

import * as React from "react";
import { Play, ArrowUpRight, X } from "lucide-react";
import { copy } from "@/lib/copy";
import { useLocale } from "@/components/locale-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Video = {
  id: string;
  topic: string;
  title: string;
  blurb: string;
};

/**
 * Resources — a homepage band of productivity videos (YouTube).
 *
 * Each card is a lightweight facade (thumbnail + play button). Clicking one
 * opens a modal lightbox that mounts the YouTube <iframe> and autoplays —
 * so YouTube's scripts/cookies only load once the visitor chooses to watch,
 * and the homepage stays fast. The video list lives in lib/copy.ts
 * (copy[locale].resources.videos) so it's easy to edit or swap.
 */
export function Resources() {
  const locale = useLocale();
  const t = copy[locale].resources;
  const [active, setActive] = React.useState<Video | null>(null);

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
            <VideoCard key={v.id} video={v} onOpen={() => setActive(v)} locale={locale} />
          ))}
        </div>
      </div>

      {active ? (
        <VideoModal video={active} onClose={() => setActive(null)} locale={locale} />
      ) : null}
    </section>
  );
}

function VideoCard({ video, onOpen, locale }: { video: Video; onOpen: () => void; locale: import("@/lib/copy").Locale }) {
  const { id, topic, title, blurb } = video;

  return (
    <div className="group flex flex-col">
      {/* Media — 16:9 facade; opens the modal on click */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={locale === "fr" ? `Lire la vidéo : ${title}` : `Play video: ${title}`}
        className="relative aspect-video overflow-hidden rounded-lg border border-neutral-20 bg-neutral-10 focus-visible:outline-none focus-visible:shadow-focus"
      >
        {/* Thumbnail (plain <img> — no next/image, works on the static export) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-neutral-90/40 via-transparent to-transparent"
        />
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
          {locale === "fr" ? "Regarder sur YouTube" : "Watch on YouTube"}
          <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/**
 * VideoModal — full-screen lightbox for a single video. Closes on backdrop
 * click, the × button, or Escape. Locks body scroll while open.
 */
function VideoModal({ video, onClose, locale }: { video: Video; onClose: () => void; locale: import("@/lib/copy").Locale }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 bg-neutral-90/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[960px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={locale === "fr" ? "Fermer" : "Close"}
          className="absolute -top-11 right-0 grid place-items-center size-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
        >
          <X size={20} strokeWidth={1.75} />
        </button>

        <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
