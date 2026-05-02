"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/hero-video";
import { HeroDecorations } from "@/components/hero-decorations";
import { copy } from "@/lib/copy";

/**
 * Hero — exactly 100vh, centered single-column copy.
 *
 * The InboxMockup that used to sit alongside the copy now lives in its own
 * dedicated preview section right below the hero, so the hero can stay
 * focused on the headline and the CTAs without overflowing the viewport.
 *
 * Motion behavior:
 *   - Tagline reveals word-by-word
 *   - Copy fades + drifts on scroll (parallax tied to hero progress)
 *   - A subtle scroll-down chevron pulses at the bottom of the hero to
 *     hint at the preview waiting below
 */
export function Hero() {
  const t = copy.fr.hero;
  const ref = React.useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Lower stiffness + higher damping + a touch more mass = smoother,
  // more inertial scroll feel. The previous values (80/20/0.4) tracked
  // the wheel too tightly, which read as jittery on trackpads.
  const SPRING = { stiffness: 50, damping: 28, mass: 0.7 };
  const smooth = useSpring(scrollYProgress, SPRING);

  const copyY = useTransform(smooth, [0, 1], reduce ? [0, 0] : [0, 60]);
  const copyOpacity = useTransform(smooth, [0, 0.7], [1, 0.25]);
  const chevronOpacity = useTransform(smooth, [0, 0.25], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate h-screen min-h-[640px] overflow-hidden text-white"
      // Superhuman's actual hero gradient (.hero-background-video).
      style={{
        background:
          "linear-gradient(to bottom left, rgba(168,164,216,0.5), rgba(107,165,232,0.5), rgba(176,112,192,0.6), rgba(144,136,208,0.5)), linear-gradient(180deg, #7c9ad3, #314682)",
      }}
    >
      <HeroVideo />
      <HeroDecorations />

      {/* Centered copy — fills the section, vertically centered. */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative container h-full flex flex-col items-center justify-center text-center"
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.15 },
            },
          }}
          className="font-display tracking-tight text-white max-w-[18ch]"
          style={{
            // Lower bound 40 px so the headline fits a 360-px viewport
            // alongside the 18ch container; upper bound unchanged.
            fontSize: "clamp(40px, 7.5vw, 104px)",
            lineHeight: "0.98",
            letterSpacing: "-0.035em",
          }}
        >
          <SplitWords text={t.tagline} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.5,
          }}
          className="mt-5 sm:mt-7 text-body sm:text-lead text-white/75 mx-auto max-w-[58ch]"
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6,
          }}
          className="mt-7 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto"
        >
          <Button variant="primary" size="lg" className="group">
            {t.ctaPrimary}
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="bg-transparent text-white border-white hover:bg-white hover:text-neutral-90"
          >
            {t.ctaSecondary}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-5 text-small text-white/55"
        >
          {t.microproof}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: chevronOpacity }}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 2, ease: "easeInOut", repeat: Infinity }
          }
          className="grid place-items-center size-9 rounded-full border border-white/20 text-white/70"
        >
          <ChevronDown size={18} strokeWidth={1.75} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * SplitWords — reveals each word with a small translateY + opacity.
 * Words use inline-block so wrapping behaves like normal text.
 */
function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: "0.4em" },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="inline-block whitespace-pre"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
