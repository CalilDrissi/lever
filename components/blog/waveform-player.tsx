"use client";

import * as React from "react";
import { Play, Pause, Square, Rewind, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WaveformPlayer — soundwave-style read-aloud player.
 *
 * Audio is generated live by the browser's Speech Synthesis API (no file), so
 * the waveform is stylised: played portion fills purple, the rest stays grey,
 * bars pulse while speaking. Progress tracks the speech engine's word-boundary
 * events. Controls: rewind, play/pause, stop, click-to-seek, playback speed.
 *
 * Voice: locked to Google français (fr-FR), with a plain fr-FR fallback on
 * browsers that don't ship the Google voice.
 */
const BARS = 64;
const SPEEDS = [1, 1.25, 1.5, 2, 0.75] as const;
const REWIND_SEC = 15;

const BAR_HEIGHTS: number[] = Array.from({ length: BARS }, (_, i) => {
  const wave = Math.sin(i * 0.5) * 0.5 + 0.5;
  const noise = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
  const h = 0.3 + wave * 0.5 + (noise - 0.5) * 0.45;
  return Math.max(0.18, Math.min(1, h));
});

function pickVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const vs = synth.getVoices();
  return (
    vs.find((v) => /google/i.test(v.name) && v.lang.toLowerCase().startsWith("fr")) ||
    vs.find((v) => v.lang.toLowerCase() === "fr-fr") ||
    vs.find((v) => v.lang.toLowerCase().startsWith("fr")) ||
    null
  );
}

function fmt(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function WaveformPlayer({ text }: { text: string }) {
  const [supported, setSupported] = React.useState(false);
  const [state, setState] = React.useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [progress, setProgress] = React.useState(0); // 0..1
  const [rate, setRate] = React.useState<number>(1);
  const rateRef = React.useRef(1);
  rateRef.current = rate;

  const words = React.useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text]
  );
  const totalSec = Math.max(1, Math.round(words / (160 / 60))); // ~160 wpm

  React.useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const synth = window.speechSynthesis;
    // Warm the voice list (loads asynchronously in Chrome).
    const warm = () => synth.getVoices();
    warm();
    synth.addEventListener("voiceschanged", warm);
    return () => {
      synth.removeEventListener("voiceschanged", warm);
      synth.cancel();
    };
  }, []);

  function speakFrom(charOffset: number) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const offset = Math.max(0, Math.min(text.length, charOffset));
    setProgress(offset / Math.max(1, text.length));
    const u = new SpeechSynthesisUtterance(text.slice(offset));
    u.lang = "fr-FR";
    const voice = pickVoice(synth);
    if (voice) u.voice = voice;
    u.rate = rateRef.current;
    u.pitch = 1;
    u.onboundary = (e) => {
      const pos = offset + (e.charIndex || 0);
      setProgress(Math.min(1, pos / text.length));
    };
    u.onstart = () => setState("playing");
    u.onend = () => {
      setProgress(1);
      setState("idle");
    };
    u.onerror = () => setState("idle");
    synth.speak(u);
    // Speech doesn't begin instantly (engine spin-up / network fetch for the
    // Google voice) — show a loading state until onstart fires.
    setState("loading");
  }

  function toggle() {
    const synth = window.speechSynthesis;
    if (state === "playing") {
      synth.pause();
      setState("paused");
      return;
    }
    if (state === "loading") {
      stop();
      return;
    }
    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }
    speakFrom(progress > 0 && progress < 0.999 ? Math.floor(progress * text.length) : 0);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setState("idle");
    setProgress(0);
  }

  function rewind() {
    const back = REWIND_SEC / totalSec; // fraction of the whole
    speakFrom(Math.floor(Math.max(0, progress - back) * text.length));
  }

  function seek(frac: number) {
    speakFrom(Math.floor(Math.min(1, Math.max(0, frac)) * text.length));
  }

  function cycleSpeed() {
    const idx = SPEEDS.indexOf(rate as (typeof SPEEDS)[number]);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setRate(next);
    rateRef.current = next;
    if (state !== "idle") speakFrom(Math.floor(progress * text.length));
  }

  // Broadcast audio position so ReadingProgress can reflect it.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const active = state === "playing" || state === "paused";
    window.dispatchEvent(
      new CustomEvent("audio-progress", { detail: { pct: progress, active } })
    );
  }, [progress, state]);

  if (!supported) return null;

  const ctrl =
    "grid place-items-center size-9 shrink-0 rounded-full border border-neutral-20 bg-white text-neutral-80 hover:text-neutral-90 hover:border-neutral-30 transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus";

  return (
    <div className="flex items-center gap-2 rounded-full border border-neutral-20 bg-neutral-5 p-2 pr-3">
      <button type="button" onClick={rewind} aria-label={`Reculer de ${REWIND_SEC} secondes`} className={ctrl}>
        <Rewind size={16} strokeWidth={2} className="fill-current" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={toggle}
        aria-label={
          state === "playing" ? "Pause" : state === "loading" ? "Chargement…" : "Écouter l'article"
        }
        aria-busy={state === "loading"}
        className="grid place-items-center size-10 shrink-0 rounded-full bg-purple-60 text-white shadow-[0_6px_16px_-6px_rgba(113,76,182,0.6)] hover:bg-purple-80 transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
      >
        {state === "loading" ? (
          <Loader2 size={18} strokeWidth={2.25} className="animate-spin" aria-hidden="true" />
        ) : state === "playing" ? (
          <Pause size={18} strokeWidth={2} className="fill-current" aria-hidden="true" />
        ) : (
          <Play size={18} strokeWidth={2} className="translate-x-0.5 fill-current" aria-hidden="true" />
        )}
      </button>

      <button type="button" onClick={stop} aria-label="Arrêter" className={ctrl}>
        <Square size={14} strokeWidth={2} className="fill-current" aria-hidden="true" />
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
        className={cn(
          "relative flex h-9 flex-1 items-center gap-[2px] cursor-pointer",
          state === "loading" && "opacity-60 animate-pulse"
        )}
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

      <button
        type="button"
        onClick={cycleSpeed}
        aria-label={`Vitesse de lecture : ${rate}×`}
        className="shrink-0 rounded-full border border-neutral-20 bg-white px-2.5 py-1 text-small tabular-nums font-medium text-neutral-80 hover:text-neutral-90 hover:border-neutral-30 transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
      >
        {rate}×
      </button>
    </div>
  );
}
