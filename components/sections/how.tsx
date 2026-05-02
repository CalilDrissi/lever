"use client";

import { motion } from "framer-motion";
import { Plug, Sparkles, CheckCircle2 } from "lucide-react";
import { copy } from "@/lib/copy";

const STEP_ICONS = [Plug, Sparkles, CheckCircle2];

/**
 * How — 3-step horizontal rhythm on desktop, stacked on mobile.
 * The big numerals carry the visual weight; lucide icons sit beside them.
 */
export function How() {
  const t = copy.fr.how;

  return (
    <section className="relative bg-neutral-5 border-y border-neutral-20">
      <div className="container py-section-sm md:py-section">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-h2 tracking-tight text-neutral-90"
        >
          {t.heading}
        </motion.h2>

        <ol className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {t.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
                className="relative pl-0 md:pl-0"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-display text-h3 tabular-nums text-neutral-30 leading-none">
                    {step.n}
                  </span>
                  <span className="grid place-items-center size-9 rounded-sm bg-white border border-neutral-20 text-neutral-90">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-display text-h4 tracking-tight text-neutral-90 mb-3">
                  {step.title}
                </h3>
                <p className="text-body text-neutral-80 max-w-[42ch]">{step.body}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
