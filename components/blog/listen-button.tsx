"use client";

import * as React from "react";
import { Play, Pause, Square } from "lucide-react";

/**
 * ListenButton — reads the article aloud using the browser's Speech Synthesis
 * API (no backend, works on the static export). Renders nothing if the browser
 * doesn't support speech synthesis.
 */
export function ListenButton({ text }: { text: string }) {
  const [supported, setSupported] = React.useState(false);
  const [state, setState] = React.useState<"idle" | "playing" | "paused">("idle");

  React.useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function start() {
    const synth = window.speechSynthesis;
    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    const fr = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("fr"));
    if (fr) u.voice = fr;
    u.rate = 1;
    u.onend = () => setState("idle");
    u.onerror = () => setState("idle");
    synth.speak(u);
    setState("playing");
  }

  function pause() {
    window.speechSynthesis.pause();
    setState("paused");
  }

  function stop() {
    window.speechSynthesis.cancel();
    setState("idle");
  }

  if (!supported) return null;

  const label =
    state === "playing" ? "Pause" : state === "paused" ? "Reprendre" : "Écouter l'article";

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-20 bg-neutral-5 p-1 pr-3">
      <button
        type="button"
        onClick={state === "playing" ? pause : start}
        aria-label={label}
        className="inline-flex items-center gap-2 rounded-full bg-white border border-neutral-20 px-3 py-1.5 text-small font-medium text-neutral-90 hover:border-neutral-30 transition-colors duration-200 ease-soft"
      >
        {state === "playing" ? (
          <Pause size={15} strokeWidth={2} className="fill-current" aria-hidden="true" />
        ) : (
          <Play size={15} strokeWidth={2} className="fill-current" aria-hidden="true" />
        )}
        {label}
      </button>
      {state !== "idle" ? (
        <button
          type="button"
          onClick={stop}
          aria-label="Arrêter"
          className="grid place-items-center size-7 rounded-full text-neutral-60 hover:text-neutral-90 hover:bg-neutral-10 transition-colors duration-200 ease-soft"
        >
          <Square size={13} strokeWidth={2} className="fill-current" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
