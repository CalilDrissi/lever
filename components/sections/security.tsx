"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  KeyRound,
  ServerCog,
  MapPin,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { copy } from "@/lib/copy";

/**
 * Security — inverted card section. Charcoal background, white type.
 * The only place on the landing where we flip the palette, used to
 * green-60 "this is the serious part".
 */
const POINT_ICONS = [
  KeyRound,
  Lock,
  ShieldCheck,
  Shield,
  MapPin,
  Trash2,
];

export function Security() {
  const t = copy.fr.security;

  return (
    <section id="security" className="relative">
      <div className="container py-section-sm md:py-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl bg-neutral-90 text-white border border-neutral-90 p-7 sm:p-10 lg:p-16 overflow-hidden relative"
        >
          {/* Subtle purple-60 wash in the corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-purple-60/30 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="grid place-items-center size-10 rounded-sm bg-white/5 border border-white/10 text-white">
                  <ServerCog size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-eyebrow uppercase text-white/60">
                  {t.eyebrow}
                </span>
              </div>
              <h2 className="font-display text-h2 tracking-tight text-white">
                {t.title}
              </h2>
              <p className="mt-6 text-lead text-white/70 max-w-[42ch]">
                {t.body}
              </p>
            </div>

            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 self-center">
              {t.points.map((point, i) => {
                const Icon = POINT_ICONS[i] ?? Shield;
                return (
                  <li
                    key={point}
                    className="flex items-start gap-3 py-3 border-b border-white/10 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.75}
                      className="text-white/80 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-body text-white/90">{point}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
