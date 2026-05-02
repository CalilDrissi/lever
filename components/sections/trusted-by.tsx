"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  KeyRound,
  ServerCog,
  Plug,
  Infinity as InfinityIcon,
  Mail,
} from "lucide-react";
import { copy } from "@/lib/copy";

const PILL_ICONS = {
  key: KeyRound,
  server: ServerCog,
  plug: Plug,
  infinity: InfinityIcon,
} as const;

/**
 * Compatibility band — replaces the per-provider logo strip.
 * Calmly states that Lever works with any inbox, then lists the protocols
 * (OAuth, IMAP, API) without naming specific providers.
 *
 * The decorative envelope cluster on the right has a slow drift to keep the
 * section feeling alive without ever being loud.
 */
export function TrustedBy() {
  const t = copy.fr.compatibility;
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-neutral-20 bg-neutral-5 overflow-hidden relative">
      <div className="container py-section-sm md:py-section grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="text-eyebrow uppercase text-neutral-60 mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-h3 tracking-tight text-neutral-90 max-w-[18ch]">
            {t.title}
          </h2>
          <p className="mt-5 text-body text-neutral-80 max-w-[52ch]">{t.sub}</p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {t.pills.map((pill, i) => {
              const Icon = PILL_ICONS[pill.icon as keyof typeof PILL_ICONS];
              return (
                <motion.li
                  key={pill.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05 + i * 0.05,
                  }}
                  className="inline-flex items-center gap-2 rounded-sm border border-neutral-20 bg-white px-3 py-2 text-small text-neutral-90"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="text-neutral-80"
                    aria-hidden="true"
                  />
                  <span>{pill.label}</span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Right — envelope cluster illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative h-48 lg:h-56"
        >
          <EnvelopeCluster reduce={Boolean(reduce)} />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * EnvelopeCluster — a fan of three envelopes representing different
 * inboxes. The middle one (the focal Lever inbox) is filled charcoal;
 * the other two are paper-toned siblings that drift on a slow loop.
 */
function EnvelopeCluster({ reduce }: { reduce: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative size-48">
        {/* Soft halo */}
        <div className="absolute inset-0 rounded-full bg-neutral-10 blur-2xl scale-110" aria-hidden="true" />

        {/* Back-left envelope */}
        <motion.div
          className="absolute top-6 left-2 w-32 h-20 rounded-md bg-white border border-neutral-30 grid place-items-center -rotate-12"
          animate={reduce ? undefined : { y: [0, -4, 0], rotate: [-12, -10, -12] }}
          transition={
            reduce
              ? undefined
              : { duration: 6, ease: "easeInOut", repeat: Infinity }
          }
        >
          <Mail size={28} strokeWidth={1.5} className="text-neutral-80" aria-hidden="true" />
        </motion.div>

        {/* Back-right envelope */}
        <motion.div
          className="absolute top-6 right-2 w-32 h-20 rounded-md bg-white border border-neutral-30 grid place-items-center rotate-12"
          animate={reduce ? undefined : { y: [0, -4, 0], rotate: [12, 14, 12] }}
          transition={
            reduce
              ? undefined
              : { duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.6 }
          }
        >
          <Mail size={28} strokeWidth={1.5} className="text-neutral-80" aria-hidden="true" />
        </motion.div>

        {/* Front envelope — the focal Lever inbox */}
        <motion.div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-36 h-24 rounded-md bg-neutral-90 text-white grid place-items-center shadow-card"
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 4.5, ease: "easeInOut", repeat: Infinity }
          }
        >
          <Mail size={32} strokeWidth={1.5} aria-hidden="true" />
          {/* Domino dot */}
          <span className="absolute top-2 right-2 size-2 rounded-full bg-green-60" />
        </motion.div>
      </div>
    </div>
  );
}
