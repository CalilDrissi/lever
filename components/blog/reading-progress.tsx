"use client";

import * as React from "react";

/**
 * ReadingProgress — a thin bar at the very top of the viewport showing how far
 * the reader has scrolled through the article element (`targetId`).
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [scrollPct, setScrollPct] = React.useState(0);
  const [audioOverride, setAudioOverride] = React.useState<number | null>(null);

  React.useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const start = el.offsetTop;
      const end = el.offsetTop + el.offsetHeight - window.innerHeight;
      const span = Math.max(1, end - start);
      const p = ((window.scrollY - start) / span) * 100;
      setScrollPct(Math.min(100, Math.max(0, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  React.useEffect(() => {
    const onAudioProgress = (e: Event) => {
      const { pct, active } = (e as CustomEvent<{ pct: number; active: boolean }>).detail;
      setAudioOverride(active ? pct * 100 : null);
    };
    window.addEventListener("audio-progress", onAudioProgress);
    return () => window.removeEventListener("audio-progress", onAudioProgress);
  }, []);

  const displayed = audioOverride ?? scrollPct;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-50 h-1 pointer-events-none"
    >
      <div
        className="h-full bg-purple-60 transition-[width] duration-100 ease-linear"
        style={{ width: `${displayed}%` }}
      />
    </div>
  );
}
