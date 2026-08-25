"use client";

import * as React from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WaveformPlayer — a soundwave-style read-aloud player.
 *
 * The audio is generated live by the browser's Speech Synthesis API (no audio
 * file), so the waveform is a stylised set of bars: the played portion fills
 * purple, the rest stays grey, and bars pulse while speaking. Progress tracks
 * the speech engine's word-boundary events; clicking the wave seeks to the
 * nearest word (restarts narration from that offset).
 */
const BARS = 64;

// Deterministic, natural-looking bar heights (0.18–1), stable across renders.
const BAR_HEIGHTS: number[] = Array.from({ length: BARS }, (_, i) => {
  const wave = Math.sin(i * 0.5) * 0.5 + 0.5;
  const noise = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
  const h = 0.3 + wave * 0.5 + (noise - 0.5) * 0.45;
  return Math.max(0.18, Math.min(1, h));
});

function fmt(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function WaveformPlayer({ text }: { text: string }) {
  const [supported, setSupported] = React.useState(false);
  const [state, setState] = React.useState<"idle" | "playing" | "paused">("idle");
  const [progress, setProgress] = React.useState(0); // 0..1

  const words = React.useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text]
  );
  const totalSec = Math.max(1, Math.round(words / (160 / 60))); // ~160 wpm

  React.useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speakFrom(charOffset: number) {
    const synth = window.speechSynthesis;
    synth.cancel();
    setProgress(charOffset / Math.max(1, text.length));
    const u = new SpeechSynthesisUtterance(text.slice(charOffset));
    u.lang = "fr-FR";
    const fr = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("fr"));
    if (fr) u.voice = fr;
    u.rate = 1;
    u.onboundary = (e) => {
      const pos = charOffset + (e.charIndex || 0);
      setProgress(Math.min(1, pos / text.length));
    };
    u.onend = () => {
      setProgress(1);
      setState("idle");
    };
    u.onerror = () => setState("idle");
    synth.speak(u);
    setState("playing");
  }

  function toggle() {
    const synth = window.speechSynthesis;
    if (state === "playing") {
      synth.pause();
      setState("paused");
      return;
    }
    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }
    speakFrom(progress > 0 && progress < 0.999 ? Math.floor(progress * text.length) : 0);
  }

  function seek(frac: number) {
    speakFrom(Math.floor(Math.min(1, Math.max(0, frac)) * text.length));
  }

  if (!supported) return null;

  return (
    <div className="flex items-center gap-3 rounded-full border border-neutral-20 bg-neutral-5 p-2 pr-4">
      <button
        type="button"
        onClick={toggle}
        aria-label={state === "playing" ? "Pause" : "Écouter l'article"}
        className="grid place-items-center size-10 shrink-0 rounded-full bg-purple-60 text-white shadow-[0_6px_16px_-6px_rgba(113,76,182,0.6)] hover:bg-purple-80 transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
      >
        {state === "playing" ? (
          <Pause size={18} strokeWidth={2} className="fill-current" aria-hidden="true" />
        ) : (
          <Play size={18} strokeWidth={2} className="translate-x-0.5 fill-current" aria-hidden="true" />
        )}
      </button>

      <div
        role="slider"
        aria-label="Progression de la lecture"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          seek((e.clientX - r.left) / r.width);
        }}
        className="relative flex h-9 flex-1 items-center gap-[2px] cursor-pointer"
      >
        {BAR_HEIGHTS.map((h, i) => {
          const on = i / BARS <= progress;
          return (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-full origin-center",
                on ? "bg-purple-60" : "bg-neutral-30",
                state === "playing" && "animate-[wave_1s_ease-in-out_infinite] motion-reduce:animate-none"
              )}
              style={{
                height: `${Math.round(h * 100)}%`,
                animationDelay: state === "playing" ? `${(i % 12) * 70}ms` : undefined,
              }}
            />
          );
        })}
      </div>

      <span className="shrink-0 text-small tabular-nums text-neutral-60">
        {fmt(progress * totalSec)} / {fmt(totalSec)}
      </span>
    </div>
  );
}
