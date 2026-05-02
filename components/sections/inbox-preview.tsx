"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { InboxDemo } from "@/components/inbox-demo";

/**
 * InboxPreview — sits directly under the 100vh hero. Hosts an interactive
 * demo of Lever (InboxDemo): clickable Domino actions cycle the Domino,
 * stats tick live, keyboard shortcuts are bound globally.
 *
 * The static InboxMockup component remains for the styleguide; this
 * section runs the interactive variant so visitors can stress-test the
 * triage flow without an account.
 */
export function InboxPreview() {
  const t = copy.fr.inboxDemo;

  return (
    <section
      aria-label="Démo interactive — Domino du jour"
      className="relative bg-white overflow-hidden border-b border-neutral-20"
    >
      {/* Soft ground halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[760px] h-48 rounded-full bg-purple-30/30 blur-3xl"
      />

      <div className="relative container py-section-sm md:py-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[860px] text-center mb-10 lg:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-eyebrow uppercase text-neutral-80 px-3 py-1 rounded-sm border border-neutral-20 bg-neutral-5 mb-6">
            <span className="size-1.5 rounded-full bg-purple-60" />
            {t.eyebrow}
          </span>
          <h2 className="font-display text-h2 tracking-tight text-neutral-90 max-w-[24ch] mx-auto">
            {t.title}
          </h2>
          <p className="mt-5 text-lead text-neutral-80 max-w-[62ch] mx-auto">
            {t.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
        >
          <InboxDemo />
        </motion.div>
      </div>
    </section>
  );
}
