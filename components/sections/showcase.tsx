"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/copy";
import { images, px } from "@/lib/images";
import { cn } from "@/lib/utils";

const KEY_TO_IMG = {
  focus: images.useCaseFocus,
  desk: images.useCaseDesk,
  team: images.useCaseTeam,
} as const;

/**
 * Showcase — three image-led cards. The image is the hero of each tile;
 * copy sits below in a calm hierarchy. Tiles lift on hover and the image
 * scales 1.04 for a quiet "alive" feel.
 */
export function Showcase() {
  const t = copy.fr.showcase;

  return (
    <section className="relative bg-neutral-5 border-y border-neutral-20">
      <div className="container py-section-sm md:py-section">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <p className="text-eyebrow uppercase text-neutral-60 mb-4">
              {t.eyebrow}
            </p>
            <h2 className="font-display text-h2 tracking-tight text-neutral-90 max-w-[22ch]">
              {t.heading}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="lg:col-span-4 text-body text-neutral-80 max-w-[42ch]"
          >
            {t.sub}
          </motion.p>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.cards.map((card, i) => (
            <ShowcaseCard
              key={card.key}
              tag={card.tag}
              title={card.title}
              body={card.body}
              imageKey={card.key as keyof typeof KEY_TO_IMG}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({
  tag,
  title,
  body,
  imageKey,
  index,
}: {
  tag: string;
  title: string;
  body: string;
  imageKey: keyof typeof KEY_TO_IMG;
  index: number;
}) {
  const img = KEY_TO_IMG[imageKey];
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={reduce ? undefined : { y: -4 }}
      className={cn(
        "group rounded-xl bg-white border border-neutral-20 overflow-hidden",
        "transition-[border-color,box-shadow] duration-300 ease-soft",
        "hover:border-neutral-30 hover:shadow-card"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-10">
        <Image
          src={px(img.id, 900)}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={cn(
            "object-cover",
            "[filter:saturate(0.7)_contrast(0.96)]",
            "transition-transform duration-700 ease-soft",
            "group-hover:scale-[1.04]"
          )}
          unoptimized
        />
        {/* Cream wash, never harsh */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 text-eyebrow uppercase bg-neutral-5/90 backdrop-blur-sm border border-neutral-20 text-neutral-90 px-2 py-1 rounded-sm">
          {tag}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-display text-h5 tracking-tight text-neutral-90">
          {title}
        </h3>
        <p className="mt-3 text-body text-neutral-80 max-w-[36ch]">{body}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-small text-neutral-80 group-hover:text-neutral-90 transition-colors duration-200 ease-soft">
          En savoir plus
          <ArrowUpRight
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </motion.article>
  );
}
