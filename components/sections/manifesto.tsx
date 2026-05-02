"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { copy } from "@/lib/copy";
import { images, px } from "@/lib/images";
import { FranceFlag } from "@/components/icons/france-flag";

/**
 * Manifesto — quiet two-column layout. The image side gets a gentle scroll
 * parallax (translateY 0 → -32px) and a slow scale-in on first reveal so the
 * section breathes without ever drawing attention to the motion itself.
 */
export function Manifesto() {
  const t = copy.fr.manifesto;
  const img = images.manifesto;

  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative overflow-hidden"
    >
      <div className="container py-section-sm md:py-section grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 order-2 lg:order-1"
        >
          <p className="text-eyebrow uppercase text-neutral-60 mb-6">
            {t.eyebrow}
          </p>
          <h2 className="font-display text-h2 tracking-tight text-neutral-90 max-w-[22ch]">
            {t.title}
          </h2>
          <p className="mt-8 text-lead text-neutral-80 max-w-[58ch]">{t.body}</p>

          <div className="mt-10 flex items-center gap-4">
            <span className="block h-px w-12 bg-neutral-30" aria-hidden="true" />
            <span className="text-small text-neutral-60 italic inline-flex items-center gap-2">
              Virtus Lever — France
              <FranceFlag size={12} className="rounded-[1px] shrink-0" />
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 order-1 lg:order-2"
        >
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-neutral-20 bg-neutral-10 shadow-card">
            <Image
              src={px(img.id, 1100)}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover [filter:saturate(0.65)_contrast(0.96)_brightness(1.02)]"
              unoptimized
            />
            {/* Cream wash bottom for legibility of caption */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-small text-neutral-90/80 italic">
              « L'effet de levier ne vient pas de la force — il vient du point d'appui. »
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
