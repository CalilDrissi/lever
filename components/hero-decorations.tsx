"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  type LucideIcon,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  Zap,
} from "lucide-react";

/**
 * HeroDecorations — two layers of floating bits over the navy hero:
 *
 *   1. SIX MINI-CARDS — Superhuman-style product surfaces (score widget,
 *      Domino notification, handled-row, weekly throughput, etc.) that
 *      hint at the actual product.
 *   2. TINY COLORFUL CONFETTI — small dots / pills / chips in the brand
 *      color scales (purple, green, mulberry, orange, blue) that sprinkle
 *      around the hero to add liveliness without competing with the copy.
 *
 * Layout safe zones (h-screen hero, ~800-1080 px tall):
 *   - Pill nav consumes ~9% of the viewport height at the top.
 *   - Centered hero copy occupies ~30-72% vertically and the central
 *     ~720 px column horizontally on lg+.
 *   - Mini-cards live in the corners pulled WELL clear of the page edges
 *     (left-[7%] / right-[7%] for top, left-[14%] / right-[14%] for
 *     bottom). On 1280 px viewports the 150 px top card lands at ~90 px
 *     from the edge — far from the browser chrome, far from the
 *     headline (which spans 208-1072 px on the worst-case xl viewport).
 *   - Tiny confetti pieces fill the in-between corners and edges where
 *     the eye finds empty space.
 *
 * Reduced-motion: every piece renders statically.
 */

export function HeroDecorations() {
  const reduce = useReducedMotion();

  const drift = (delay: number, distance = 8, tilt = -1.5) =>
    reduce
      ? undefined
      : {
          animate: {
            y: [0, -distance, 0],
            rotate: [tilt, tilt + 1, tilt],
          },
          transition: {
            duration: 6 + delay * 0.6,
            ease: "easeInOut" as const,
            repeat: Infinity,
            delay,
          },
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* ===== MINI-CARDS ===== */}
      {/* All cards render only at xl+ where there's enough wing-space to
          clear both the centered headline and the page edges. */}

      {/* TOP-LEFT — score widget, line-3 height (top-[42%]), well inset
          from the edge so it never collides with the headline column. */}
      <motion.div
        {...drift(0, 6, -2)}
        className="absolute top-[42%] left-[7%] hidden xl:block"
      >
        <ScoreCard score={92} />
      </motion.div>

      {/* TOP-RIGHT — Domino notification, mirrored */}
      <motion.div
        {...drift(1.2, 6, 2)}
        className="absolute top-[42%] right-[7%] hidden xl:block"
      >
        <DominoCard />
      </motion.div>

      {/* MID-LEFT — quick stat (2xl only) */}
      <motion.div
        {...drift(0.6, 5, -3)}
        className="absolute top-[48%] left-[8%] hidden 2xl:block"
      >
        <StatCard icon={Clock} big="10" unit="min" label="par jour" />
      </motion.div>

      {/* MID-RIGHT — backlog trend (2xl only) */}
      <motion.div
        {...drift(1.8, 5, 3)}
        className="absolute top-[50%] right-[8%] hidden 2xl:block"
      >
        <StatCard icon={TrendingDown} big="−30" unit="%" label="backlog" />
      </motion.div>

      {/* BOTTOM-LEFT — handled-row mini card */}
      <motion.div
        {...drift(0.9, 6, 2)}
        className="absolute bottom-[14%] left-[14%] hidden xl:block"
      >
        <HandledCard />
      </motion.div>

      {/* BOTTOM-RIGHT — weekly throughput */}
      <motion.div
        {...drift(2.1, 6, -2)}
        className="absolute bottom-[16%] right-[14%] hidden xl:block"
      >
        <ThroughputCard />
      </motion.div>

      {/* ===== TINY COLORFUL CONFETTI ===== */}
      {/* Wrapped around the centered copy in two safe zones:
            · side wings  → left/right-[<6%] at any vertical position
            · bottom band → bottom-[8-20%] (below the microproof)
          The previous top-band confetti was removed — anything above
          the headline crowded the area between the pill nav and the
          title. */}

      {/* BOTTOM BAND ------------------------------------------------------ */}
      {/* Bottom-left wing — green check pill */}
      <motion.div
        {...drift(1.4, 4, -2)}
        className="absolute bottom-[12%] left-[24%] hidden lg:block"
      >
        <MiniPill color="green" icon={CheckCircle2} label="+1" />
      </motion.div>

      {/* Bottom-right wing — purple zap pill */}
      <motion.div
        {...drift(2.0, 4, 2)}
        className="absolute bottom-[14%] right-[22%] hidden lg:block"
      >
        <MiniPill color="purple" icon={Zap} label="92" />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Mini-card pieces — kept lightweight so they read as decoration, not  */
/* content. All share the glassy look that blends into the navy hero.   */
/* -------------------------------------------------------------------- */

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white/[0.10] backdrop-blur-md border border-white/20 p-2.5 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.5)] text-white">
      {children}
    </div>
  );
}

function ScoreCard({ score }: { score: number }) {
  return (
    <CardShell>
      <div className="flex items-center gap-2 w-[140px]">
        <div className="relative size-9 grid place-items-center shrink-0">
          <svg width={36} height={36} className="-rotate-90">
            <circle
              cx={18}
              cy={18}
              r={14}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2.5}
              fill="none"
            />
            <circle
              cx={18}
              cy={18}
              r={14}
              stroke="white"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 14}
              strokeDashoffset={(2 * Math.PI * 14) * (1 - score / 100)}
              fill="none"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-eyebrow tabular-nums leading-none">
            {score}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/65 leading-tight">
            Score levier
          </p>
          <p className="text-[12px] font-medium leading-tight truncate">
            Top du jour
          </p>
        </div>
      </div>
    </CardShell>
  );
}

function DominoCard() {
  return (
    <CardShell>
      <div className="flex items-center gap-2 w-[150px]">
        <span className="size-7 rounded-md grid place-items-center bg-purple-60 text-white shrink-0">
          <Sparkles size={12} strokeWidth={2.25} aria-hidden="true" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/70">
            Domino
          </p>
          <p className="text-[12px] font-medium truncate">Devis signé</p>
        </div>
      </div>
    </CardShell>
  );
}

function HandledCard() {
  return (
    <CardShell>
      <div className="flex items-center gap-2 w-[150px]">
        <span className="size-6 rounded-full grid place-items-center bg-green-60 text-white shrink-0">
          <CheckCircle2 size={12} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-medium leading-tight truncate">
            Planning Q3
          </p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/60 leading-tight">
            Traité · 08:31
          </p>
        </div>
      </div>
    </CardShell>
  );
}

function ThroughputCard() {
  return (
    <CardShell>
      <div className="w-[130px]">
        <div className="flex items-center gap-1.5 mb-1">
          <Mail size={10} strokeWidth={2.25} aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/70">
            Cette semaine
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-h6 tabular-nums leading-none">
            +47
          </span>
          <span className="text-[10px] text-white/60">traités</span>
        </div>
        {/* Sparkline */}
        <svg
          viewBox="0 0 120 18"
          className="mt-1 w-full h-3"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 0 13 L 20 11 L 40 14 L 60 8 L 80 9 L 100 5 L 120 3" />
        </svg>
      </div>
    </CardShell>
  );
}

function StatCard({
  icon: Icon,
  big,
  unit,
  label,
}: {
  icon: LucideIcon;
  big: string;
  unit: string;
  label: string;
}) {
  return (
    <CardShell>
      <div className="w-[110px]">
        <div className="flex items-center gap-1.5 mb-1 text-white/70">
          <Icon size={10} strokeWidth={2.25} aria-hidden={true} />
          <span className="text-[10px] uppercase tracking-[0.14em]">
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-h6 tabular-nums leading-none">
            {big}
          </span>
          <span className="text-[10px] text-white/70">{unit}</span>
        </div>
      </div>
    </CardShell>
  );
}

/* -------------------------------------------------------------------- */
/* Tiny colorful pieces.                                                 */
/* Solid brand colors so they pop against the navy hero gradient.        */
/* -------------------------------------------------------------------- */

type ChipColor = "purple" | "green" | "mulberry" | "orange" | "sky";

const CHIP_BG: Record<ChipColor, string> = {
  purple: "bg-purple-60 ring-purple-30/40",
  green: "bg-green-60 ring-green-30/40",
  mulberry: "bg-mulberry-60 ring-mulberry-30/40",
  orange: "bg-orange-40 ring-orange-30/40",
  sky: "bg-sky-60 ring-sky-30/40",
};

function ChipDot({
  color,
  children,
}: {
  color: ChipColor;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`grid place-items-center size-6 rounded-full ${CHIP_BG[color]} ring-2 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.35)]`}
    >
      {children}
    </span>
  );
}

function PulseDot({ color }: { color: ChipColor }) {
  return (
    <span className="relative inline-flex">
      <span
        className={`relative size-2.5 rounded-full ${CHIP_BG[color]} ring-2 ring-white/15`}
      />
      <motion.span
        className={`absolute inset-0 rounded-full ${CHIP_BG[color]} opacity-60`}
        initial={false}
        animate={{
          scale: [1, 2.4, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2.4,
          ease: "easeOut",
          repeat: Infinity,
        }}
      />
    </span>
  );
}

function MiniPill({
  color,
  icon: Icon,
  label,
}: {
  color: ChipColor;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${CHIP_BG[color]} ring-2 text-white text-[10px] uppercase tracking-[0.14em] font-medium shadow-[0_4px_10px_-2px_rgba(0,0,0,0.35)]`}
    >
      <Icon size={10} strokeWidth={2.5} aria-hidden="true" />
      {label}
    </span>
  );
}
