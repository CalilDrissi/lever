"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * ProviderMarquee — full-bleed strip directly under the hero.
 *
 * Visual proof that Lever connects to every common inbox. Logos render in
 * their real brand colors. The compatibility band that follows handles the
 * "any inbox" headline — this section is the wallpaper.
 *
 * Marquee mechanics:
 *   - 3 copies of the list, each item carrying `mr-12` (no flex gap), so
 *     the seam between cycles has identical spacing.
 *   - Track translates `-33.333%` (one full cycle) per loop; with three
 *     copies, two full cycles always fill the viewport.
 *   - Edge fade masks anchor to the section so the fade reaches the page
 *     edge rather than the inner container.
 *   - reduced-motion users get a static centered grid instead.
 */
export function ProviderMarquee() {
  const t = copy.fr.providers;
  const reduce = useReducedMotion();

  return (
    <section
      aria-label={t.label}
      className="relative bg-white border-b border-neutral-20 overflow-hidden"
    >
      <div className="container pt-section-sm">
        <p className="text-eyebrow uppercase text-neutral-60 text-center">
          {t.label}
        </p>
      </div>

      {reduce ? (
        <div className="container pt-8 pb-section-sm">
          <ul className="grid grid-cols-3 sm:grid-cols-6 gap-x-10 gap-y-8 items-center justify-items-center">
            {t.list.map((logo) => (
              <ProviderLogo
                key={logo.name}
                name={logo.name}
                file={logo.file}
                inMarquee={false}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="relative pt-8 pb-section-sm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-white via-white/90 to-transparent z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-white via-white/90 to-transparent z-10"
          />
          <motion.ul
            className="flex items-center will-change-transform"
            animate={{ x: ["0%", "-33.3333%"] }}
            transition={{
              duration: 38,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {Array.from({ length: 3 }).flatMap((_, c) =>
              t.list.map((logo, i) => (
                <ProviderLogo
                  key={`${logo.name}-${c}-${i}`}
                  name={logo.name}
                  file={logo.file}
                  inMarquee
                  ariaHidden={c > 0}
                />
              ))
            )}
          </motion.ul>
        </div>
      )}
    </section>
  );
}

function ProviderLogo({
  name,
  file,
  inMarquee,
  ariaHidden,
}: {
  name: string;
  file: string;
  inMarquee: boolean;
  ariaHidden?: boolean;
}) {
  return (
    <li
      aria-hidden={ariaHidden || undefined}
      className={cn(
        "shrink-0 flex items-center gap-3",
        // Per-item right margin instead of flex gap — preserves the same
        // spacing across the seam between marquee cycles.
        inMarquee && "mr-12"
      )}
    >
      <Image
        src={asset(file)}
        alt={name}
        width={56}
        height={32}
        className="h-8 w-auto object-contain"
        unoptimized
      />
      <span className="font-display text-h6 tracking-tight text-neutral-90 whitespace-nowrap">
        {name}
      </span>
    </li>
  );
}
