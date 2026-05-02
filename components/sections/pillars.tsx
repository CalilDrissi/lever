"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target, Filter, BellRing, BarChart3, Check } from "lucide-react";
import { copy } from "@/lib/copy";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DominoIllustration,
  TriageIllustration,
  FollowupsIllustration,
  AnalyticsIllustration,
} from "@/components/illustrations/pillars";

const ICONS = {
  domino: Target,
  triage: Filter,
  followups: BellRing,
  analytics: BarChart3,
} as const;

const ILLUSTRATIONS = {
  domino: DominoIllustration,
  triage: TriageIllustration,
  followups: FollowupsIllustration,
  analytics: AnalyticsIllustration,
} as const;

/**
 * Pillars — wider 2x2 grid on lg, with an inline-SVG illustration at the
 * top of each card. The illustration carries the pillar's metaphor; the
 * copy below stays compact. Cards lift on hover.
 */
export function Pillars() {
  const t = copy.fr.pillars;
  const reduce = useReducedMotion();

  return (
    <section id="product" className="relative">
      <div className="container py-section-sm md:py-section">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 lg:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 font-display text-h2 tracking-tight text-neutral-90"
          >
            {t.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
            className="lg:col-span-5 text-body text-neutral-80 max-w-[44ch]"
          >
            Une seule interface, quatre angles d'attaque pour que ta boîte
            redevienne un terrain de décisions calmes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {t.items.map((item, i) => {
            const Icon = ICONS[item.key as keyof typeof ICONS];
            const Illustration =
              ILLUSTRATIONS[item.key as keyof typeof ILLUSTRATIONS];
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.06,
                }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="group"
              >
                <Card
                  variant="surface"
                  className="h-full flex flex-col p-0 overflow-hidden transition-[border-color,box-shadow] duration-300 ease-soft group-hover:border-neutral-30 group-hover:shadow-card"
                >
                  {/* Illustration band */}
                  <div className="relative aspect-[16/9] bg-neutral-10 border-b border-neutral-20 overflow-hidden">
                    <div className="absolute inset-0">
                      <Illustration />
                    </div>
                    {/* Eyebrow + icon — anchored top-left over the illustration */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="grid place-items-center size-9 rounded-sm bg-white/90 backdrop-blur-sm border border-neutral-20 text-neutral-90 transition-colors duration-300 ease-soft group-hover:bg-neutral-90 group-hover:text-white group-hover:border-neutral-90">
                        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="text-eyebrow uppercase bg-white/90 backdrop-blur-sm border border-neutral-20 text-neutral-80 px-2 py-1 rounded-sm">
                        {item.eyebrow}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6 sm:p-8">
                    <CardTitle className="text-h3 mb-4 max-w-[20ch]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-body mb-6 max-w-[48ch]">
                      {item.body}
                    </CardDescription>
                    <ul className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 pt-5 border-t border-neutral-20">
                      {item.bullet.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-small text-neutral-80"
                        >
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="text-green-60 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
