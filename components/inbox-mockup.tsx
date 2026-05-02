"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * InboxMockup — pure HTML/CSS rendering of the Virtus Lever inbox UI.
 * The "Domino du jour" card is the focal element, scored 92.
 *
 * Rendered with framer-motion only for a single fade-up — no looping animations.
 */
export function InboxMockup({ className }: { className?: string }) {
  const t = copy.fr.inbox;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={cn(
        "w-full max-w-[560px] rounded-xl bg-neutral-5 border border-neutral-20",
        "shadow-card overflow-hidden",
        className
      )}
      role="img"
      aria-label="Aperçu de l'interface Virtus Lever — Domino du jour"
    >
      {/* Window chrome — three dots, restrained. */}
      <div className="flex items-center gap-1.5 px-4 h-9 border-b border-neutral-20 bg-neutral-10">
        <span className="size-2.5 rounded-sm bg-neutral-30" />
        <span className="size-2.5 rounded-sm bg-neutral-20" />
        <span className="size-2.5 rounded-sm bg-neutral-20" />
        <span className="ml-3 text-eyebrow uppercase text-neutral-60">
          {t.heading}
        </span>
      </div>

      {/* Domino du jour card — the focal element. */}
      <div className="p-3 sm:p-4">
        <div className="rounded-lg bg-white border border-neutral-30 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="accent">{t.dominoTitle}</Badge>
                <span className="hidden sm:inline text-eyebrow uppercase text-neutral-60">
                  {t.dominoSubtitle}
                </span>
              </div>
              <p className="text-small text-neutral-80 mb-1 truncate">
                {t.dominoFrom}
              </p>
              <h4 className="font-display text-h5 tracking-tight text-neutral-90 mb-2">
                {t.dominoSubject}
              </h4>
              <p className="text-small text-neutral-80 line-clamp-2 max-w-[42ch]">
                {t.dominoPreview}
              </p>
            </div>

            {/* Leverage score — circular gauge. */}
            <ScoreGauge value={t.scoreValue} label={t.score} />
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button className="h-9 px-4 rounded-sm bg-neutral-90 text-white text-small font-medium hover:bg-purple-90 transition-colors">
              {t.actionOpen}
            </button>
            <button className="h-9 px-4 rounded-sm border border-neutral-30 text-neutral-90 text-small font-medium hover:bg-neutral-5 transition-colors">
              {t.actionDefer}
            </button>
            <button className="h-9 px-3 rounded-sm text-neutral-80 text-small font-medium hover:text-neutral-90 transition-colors">
              {t.actionDone}
            </button>
          </div>
        </div>

        {/* Quieter list of other emails. */}
        <ul className="mt-4 divide-y divide-neutral-20 border-t border-neutral-20">
          {t.sampleRows.map((row, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center gap-3 py-3 px-1",
                row.muted && "opacity-60"
              )}
            >
              <span className="size-1.5 rounded-full bg-neutral-30 shrink-0" />
              <span className="text-small text-neutral-90 w-[28%] truncate">{row.from}</span>
              <span className="text-small text-neutral-80 flex-1 truncate">
                {row.subject}
              </span>
              <span className="text-small text-neutral-60 tabular-nums">{row.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/**
 * ScoreGauge — concentric ring with the leverage score in the center.
 * Pure SVG, no animation library.
 */
function ScoreGauge({ value, label }: { value: number; label: string }) {
  const size = 76;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#dedbd5"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#714cb6"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-h4 tracking-tight tabular-nums text-neutral-90">
            {value}
          </span>
        </div>
      </div>
      <span className="text-eyebrow uppercase text-neutral-60">{label}</span>
    </div>
  );
}
