"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * FAQ — controlled single-open accordion. Hairline dividers between rows;
 * the open row darkens its title slightly. No heavy chevrons, just plus/minus.
 */
export function FAQ() {
  const t = copy.fr.faq;
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-neutral-5 border-y border-neutral-20">
      <div className="container py-section-sm md:py-section grid lg:grid-cols-12 gap-8 lg:gap-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 font-display text-h2 tracking-tight text-neutral-90"
        >
          {t.heading}
        </motion.h2>

        <ul className="lg:col-span-8 divide-y divide-neutral-20 border-y border-neutral-20">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 sm:gap-6 py-5 sm:py-6 text-left",
                    "focus-visible:outline-none focus-visible:bg-neutral-10 rounded-sm",
                    "transition-colors duration-200 ease-soft"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-h5 tracking-tight",
                      isOpen ? "text-neutral-90" : "text-neutral-90/90"
                    )}
                  >
                    {item.q}
                  </span>
                  <span className="grid place-items-center size-8 rounded-sm border border-neutral-20 text-neutral-80 shrink-0">
                    {isOpen ? (
                      <Minus size={16} strokeWidth={1.75} aria-hidden="true" />
                    ) : (
                      <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-2 sm:pr-12 text-body text-neutral-80 max-w-[62ch]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
