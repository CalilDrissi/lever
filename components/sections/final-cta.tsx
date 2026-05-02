"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { images, px } from "@/lib/images";

/**
 * FinalCta — full-bleed inverted band that breaks out of the white flow.
 *
 * Layout: 16-col grid on lg. Stats sit beside the CTA so the section reads
 * as a confident closing pitch, not a polite ask.
 *
 * Motion:
 *   - Background image gets scroll-linked parallax (translate +60 → -60).
 *   - Stats reveal in a 0.1s stagger when scrolled into view.
 *   - Decorative dot grid drifts on a slow loop in the corner.
 */
export function FinalCta() {
  const t = copy.fr.finalCta;
  const microproof = copy.fr.hero.microproof;
  const bg = images.finalCtaBg;

  const ref = React.useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.4,
  });
  const bgY = useTransform(smooth, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-neutral-90 text-white"
    >
      {/* Background image, charcoal-washed */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <Image
          src={px(bg.id, 1800)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover [filter:saturate(0.4)_contrast(0.95)_brightness(0.55)]"
          unoptimized
          priority={false}
        />
      </motion.div>

      {/* Multi-stop wash so type stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-90/95 via-neutral-90/85 to-purple-90/80"
      />

      {/* Soft purple-60 aura in the top-right — subtle but alive */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full bg-purple-60/30 blur-3xl -z-10"
        animate={
          reduce
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Decorative dot grid — drifts slowly */}
      <DotGrid />

      <div className="relative container max-w-[1320px] py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — eyebrow, title, sub, CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 text-eyebrow uppercase text-white/70 px-3 py-1 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm mb-8">
              <Sparkles size={12} strokeWidth={1.75} aria-hidden="true" />
              {t.eyebrow}
            </span>
            <h2 className="font-display text-h1 tracking-tight text-white max-w-[20ch]">
              {t.title}
            </h2>
            <p className="mt-8 text-lead text-white/70 max-w-[52ch]">
              {t.sub}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              {/* On the dark band, the brand-purple primary keeps its
                  identity and the secondary flips to white-on-transparent
                  so it reads against the charcoal background. */}
              <Button variant="primary" size="lg" className="group">
                {t.cta}
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
            </div>

            <p className="mt-5 text-small text-white/55">{microproof}</p>
          </motion.div>

          {/* Right — stat trio */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
            }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5"
          >
            {t.stats.map((s) => (
              <motion.li
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-h2 tracking-tight text-white tabular-nums">
                    {s.value}
                  </span>
                  <span className="font-display text-h5 tracking-tight text-white/70">
                    {s.unit}
                  </span>
                </div>
                <p className="mt-1 text-small text-white/60">{s.label}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/**
 * DotGrid — slowly drifting dot pattern in the lower-left corner.
 * Pure SVG, repeats via pattern; framer-motion translates the entire grid.
 */
function DotGrid() {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-12 -left-12 w-[520px] h-[260px] opacity-30 -z-10"
      viewBox="0 0 520 260"
      animate={reduce ? undefined : { x: [0, 16, 0], y: [0, -8, 0] }}
      transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
    >
      <defs>
        <pattern
          id="dotgrid"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill="rgba(244,241,235,0.65)" />
        </pattern>
      </defs>
      <rect width="520" height="260" fill="url(#dotgrid)" />
    </motion.svg>
  );
}
