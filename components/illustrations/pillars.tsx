"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/**
 * Pillar illustrations — abstract scenes that match each pillar's metaphor.
 * All four use the Superhuman neutral scale on white, with a single green-60
 * accent on the "active" element. Sized for a 16:9 frame at the top of each
 * pillar card.
 */

const STROKE = "#474543";      // neutral-80
const FILL = "#292827";        // neutral-90
const SOFT = "#dedbd5";        // neutral-20
const SOFT_BG = "#f2f0eb";     // neutral-10
const HILITE = "#148072";      // green-60 — the "the right one" indicator
const HILITE_SOFT = "#d5f7eb"; // green-10

const SPRING = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

function Frame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="w-full h-full"
      role="img"
      aria-label={label}
    >
      {/* Soft white backdrop */}
      <rect width="320" height="180" fill={SOFT_BG} />
      {children}
    </svg>
  );
}

/**
 * Domino — five tiles in a row; the third is highlighted (green-60)
 * and tilted to suggest the "domino" that knocks the rest. Subtle drift
 * on the highlight so the card feels alive.
 */
export function DominoIllustration() {
  const reduce = useReducedMotion();
  return (
    <Frame label="Une rangée de dominos avec celui du milieu mis en avant">
      {/* Row of dominoes — the third is the "right one" today. */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 40 + i * 50;
        const isHighlight = i === 2;
        return isHighlight ? (
          <motion.g
            key={i}
            initial={{ rotate: 0 }}
            animate={reduce ? undefined : { rotate: [-3, -7, -3] }}
            transition={
              reduce
                ? undefined
                : { duration: 4, ease: "easeInOut", repeat: Infinity }
            }
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
          >
            <rect
              x={x}
              y={50}
              width={32}
              height={90}
              rx={4}
              fill={HILITE_SOFT}
              stroke={HILITE}
              strokeWidth={2}
            />
            <circle cx={x + 16} cy={75} r={3.5} fill={HILITE} />
            <circle cx={x + 16} cy={115} r={3.5} fill={HILITE} />
          </motion.g>
        ) : (
          <g key={i}>
            <rect
              x={x}
              y={50}
              width={32}
              height={90}
              rx={4}
              fill="#f7f5f2"
              stroke={SOFT}
              strokeWidth={1.5}
            />
            <circle cx={x + 16} cy={75} r={2.5} fill={SOFT} />
            <circle cx={x + 16} cy={115} r={2.5} fill={SOFT} />
          </g>
        );
      })}
      {/* Score badge above the highlighted one */}
      <g>
        <rect x={132} y={22} width={56} height={20} rx={10} fill={HILITE} />
        <text
          x={160}
          y={36}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="11"
          fontWeight="600"
          fill="#ffffff"
        >
          92 · top
        </text>
      </g>
      {/* Connector line from badge to domino */}
      <line
        x1={160}
        y1={42}
        x2={156}
        y2={50}
        stroke={HILITE}
        strokeWidth={1.5}
      />
    </Frame>
  );
}

/**
 * Triage — a list of rows; the noisy ones (newsletters, notifications) are
 * faded and the signal rows stay bold. A subtle vertical separator
 * traverses the scene to evoke the filter.
 */
export function TriageIllustration() {
  const reduce = useReducedMotion();
  const rows = [
    { y: 38, muted: true,  width: 200 },
    { y: 60, muted: false, width: 230 },
    { y: 82, muted: true,  width: 180 },
    { y: 104, muted: true, width: 210 },
    { y: 126, muted: false, width: 240 },
    { y: 148, muted: true, width: 170 },
  ];
  return (
    <Frame label="Liste d'emails : le bruit s'estompe, le signal reste">
      {rows.map((r, i) => (
        <motion.g
          key={i}
          initial={{ opacity: r.muted ? 1 : 1 }}
          animate={
            reduce
              ? undefined
              : r.muted
                ? { opacity: [1, 0.35, 1] }
                : { x: [0, 2, 0] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 5, ease: "easeInOut", repeat: Infinity, delay: i * 0.2 }
          }
        >
          {/* dot indicator */}
          <circle
            cx={32}
            cy={r.y}
            r={3}
            fill={r.muted ? SOFT : FILL}
          />
          {/* sender block */}
          <rect
            x={44}
            y={r.y - 5}
            width={56}
            height={10}
            rx={2}
            fill={r.muted ? SOFT : STROKE}
            opacity={r.muted ? 0.7 : 1}
          />
          {/* subject line */}
          <rect
            x={108}
            y={r.y - 4}
            width={r.width - 100}
            height={8}
            rx={2}
            fill={r.muted ? SOFT : FILL}
            opacity={r.muted ? 0.5 : 0.9}
          />
        </motion.g>
      ))}
      {/* Filter divider */}
      <line
        x1={20}
        y1={20}
        x2={20}
        y2={166}
        stroke={SOFT}
        strokeWidth={1}
        strokeDasharray="2 3"
      />
    </Frame>
  );
}

/**
 * Followups — a clock face whose hands stay anchored to the center cap
 * while their tips orbit, surrounded by a slow dashed arc.
 *
 * Why this is rebuilt without `transform: rotate()` on the hands:
 *
 * Earlier attempts used a CSS transform-origin pinned to the clock
 * center (`transformOrigin: "160px 90px" + transformBox: view-box`).
 * `transform-box: view-box` only stabilized in 2024; older engines
 * silently fall back to `fill-box`, and a `<line>` from (160,90) to
 * (160,72) has a fill-box midpoint at (160, 81). With the wrong
 * pivot, framer rotates around that midpoint — the supposed
 * "anchor" end at (160,90) traces a 9-px circle around the clock
 * center, leaving the hand visibly disconnected.
 *
 * The fix here doesn't rely on CSS transforms at all. Each hand has
 * its `x1/y1` hard-coded at the clock center; only `x2/y2` animate,
 * driven by trig from a motion-value angle. The start point is
 * literally never moved by the renderer, so the hand can never
 * appear detached. The dashed orbit uses SVG's native
 * `transform="rotate(angle cx cy)"` attribute, which has been
 * universally supported since SVG 1.1.
 */
export function FollowupsIllustration() {
  const reduce = useReducedMotion();

  // Clock center within the 320x180 viewBox.
  const CX = 160;
  const CY = 90;
  const HOUR_LEN = 18;
  const MIN_LEN = 28;

  // Angle motion values (degrees, 0 = pointing up, increases clockwise).
  const hourAngle = useMotionValue(0);
  const minuteAngle = useMotionValue(0);
  const orbitAngle = useMotionValue(0);

  // Drive the angles via framer-motion's runtime so the animation lives
  // off the React render path.
  React.useEffect(() => {
    if (reduce) return;
    const ah = animate(hourAngle, 360, {
      duration: 30,
      ease: "linear",
      repeat: Infinity,
    });
    const am = animate(minuteAngle, 360, {
      duration: 8,
      ease: "linear",
      repeat: Infinity,
    });
    const ao = animate(orbitAngle, 360, {
      duration: 22,
      ease: "linear",
      repeat: Infinity,
    });
    return () => {
      ah.stop();
      am.stop();
      ao.stop();
    };
  }, [reduce, hourAngle, minuteAngle, orbitAngle]);

  // Hand tips — sin(θ) drives x, -cos(θ) drives y so 0° points up.
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const hourX = useTransform(hourAngle, (a) => CX + Math.sin(toRad(a)) * HOUR_LEN);
  const hourY = useTransform(hourAngle, (a) => CY - Math.cos(toRad(a)) * HOUR_LEN);
  const minuteX = useTransform(minuteAngle, (a) => CX + Math.sin(toRad(a)) * MIN_LEN);
  const minuteY = useTransform(minuteAngle, (a) => CY - Math.cos(toRad(a)) * MIN_LEN);

  // Orbit — SVG transform attribute string `rotate(angle cx cy)` rotates
  // around an explicit pixel point with no transform-box dependency.
  const orbitTransform = useTransform(
    orbitAngle,
    (a) => `rotate(${a} ${CX} ${CY})`
  );

  return (
    <Frame label="Cycle de relance : un cadran d'horloge avec aiguilles">
      {/* Clock face */}
      <circle
        cx={CX}
        cy={CY}
        r={40}
        fill="#f7f5f2"
        stroke={SOFT}
        strokeWidth={1.5}
      />

      {/* Hour ticks at 12 / 3 / 6 / 9 */}
      {[
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
      ].map(({ dx, dy }, i) => (
        <line
          key={i}
          x1={CX + dx * 32}
          y1={CY + dy * 32}
          x2={CX + dx * 38}
          y2={CY + dy * 38}
          stroke={STROKE}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}

      {/* Hour hand — start fixed at (CX, CY), tip orbits via motion values */}
      <motion.line
        x1={CX}
        y1={CY}
        x2={hourX}
        y2={hourY}
        stroke={FILL}
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Minute hand — same anchoring strategy, longer and in the highlight */}
      <motion.line
        x1={CX}
        y1={CY}
        x2={minuteX}
        y2={minuteY}
        stroke={HILITE}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Center cap — drawn last so it sits above both hands */}
      <circle cx={CX} cy={CY} r={3.25} fill={FILL} />

      {/* Outer dashed orbit — SVG-native rotation around (CX, CY) */}
      <motion.g transform={orbitTransform}>
        <path
          d={`M ${CX} ${CY - 56} A 56 56 0 1 1 ${CX - 56} ${CY}`}
          fill="none"
          stroke={STROKE}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d={`M ${CX - 56} ${CY} l 4 -6 l 2 4 z`}
          fill={STROKE}
        />
      </motion.g>
    </Frame>
  );
}

/**
 * Analytics — minimal bar chart with a trend line above. The tallest bar
 * is highlighted; the trend line slopes downward (less backlog).
 */
export function AnalyticsIllustration() {
  const reduce = useReducedMotion();
  const bars = [
    { x: 30,  h: 50, hi: false },
    { x: 70,  h: 70, hi: false },
    { x: 110, h: 60, hi: false },
    { x: 150, h: 90, hi: true },
    { x: 190, h: 65, hi: false },
    { x: 230, h: 45, hi: false },
    { x: 270, h: 30, hi: false },
  ];
  return (
    <Frame label="Histogramme avec une courbe descendante : moins de backlog">
      {/* axis hairline */}
      <line x1={20} y1={150} x2={300} y2={150} stroke={SOFT} strokeWidth={1} />
      {/* bars */}
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={150 - b.h}
          width={20}
          height={b.h}
          rx={2}
          fill={b.hi ? HILITE : SOFT}
          initial={reduce ? undefined : { scaleY: 0.4, originY: 1 }}
          animate={reduce ? undefined : { scaleY: 1 }}
          transition={
            reduce
              ? undefined
              : { ...SPRING, delay: 0.05 * i }
          }
          style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
        />
      ))}
      {/* descending trend line */}
      <motion.path
        d="M 30 60 Q 110 50 160 65 T 290 110"
        fill="none"
        stroke={FILL}
        strokeWidth={2}
        strokeLinecap="round"
        initial={reduce ? undefined : { pathLength: 0 }}
        animate={reduce ? undefined : { pathLength: 1 }}
        transition={reduce ? undefined : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* end-of-trend dot */}
      <circle cx={290} cy={110} r={4} fill={FILL} />
    </Frame>
  );
}
