"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * HeroVideo — full-bleed background video for the hero.
 *
 * Topical direction: a slow domino sequence in soft daylight (or any calm,
 * paper-toned cinemagraph). The clip should feel like a watermark — never
 * compete with copy or the InboxMockup.
 *
 * Asset contract (drop into /public):
 *   /hero-bg.mp4   — looping, muted, ≤ 10s, ≤ 3MB if possible (H.264, 1080p)
 *   /hero-bg.webm  — optional, smaller AV1/VP9 sibling
 *   /hero-bg.jpg   — poster (first frame), used as fallback before play and
 *                    when prefers-reduced-motion is set
 *
 * Visual treatment:
 *   - desaturated and dimmed (CSS filter)
 *   - navy/blue gradient overlays match Superhuman's actual hero gradient
 *     (#314682 at the bottom, soft #7c9ad3 / lavender at the top) so the
 *     video reads as a watermark rather than competing with the copy
 *   - hairline bottom border that fades into the next section
 */
export function HeroVideo({ className }: { className?: string }) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* CSS placeholder — visible only while /public/hero-bg.* are missing.
          Once the <video> below has a real source, it paints over this layer. */}
      <div className="hero-video-placeholder absolute inset-0" />

      {!reducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={asset("/hero-bg.jpg")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "[filter:saturate(0.5)_contrast(1.05)_brightness(0.55)]"
          )}
        >
          <source src={asset("/hero-bg.webm")} type="video/webm" />
          <source src={asset("/hero-bg.mp4")} type="video/mp4" />
        </video>
      )}

      {reducedMotion && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${asset("/hero-bg.jpg")}')` }}
        />
      )}

      {/* Top-fade overlay — matches Superhuman's :after rule on the hero
          background-video container (deeper navy at the top of the frame). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(49,70,130,0.7) 0%, rgba(127,156,213,0.3) 30%, rgba(0,0,0,0))",
        }}
      />
      {/* Vertical wash — fades the video toward the navy bottom of the
          gradient so the section seam ends in solid color. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(49,70,130,0) 40%, rgba(49,70,130,0.55) 75%, #314682 100%)",
        }}
      />
      {/* Left-side wash — guarantees the copy column has highest legibility. */}
      <div
        className="absolute inset-y-0 left-0 w-2/3"
        style={{
          background:
            "linear-gradient(to right, rgba(49,70,130,0.85), rgba(49,70,130,0))",
        }}
      />

      {/* Hairline bottom edge — quiet white line so the seam reads on dark. */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </div>
  );
}
