"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InboxMockup } from "@/components/inbox-mockup";
import { copy } from "@/lib/copy";

/**
 * Hero — left column carries the tagline, sub, and dual CTA.
 * Right column shows the InboxMockup.
 *
 * The single use of plum on this page lives here, in the "Domino du jour" badge
 * inside the mockup. Don't add a second one elsewhere on the landing.
 */
export function Hero() {
  const t = copy.fr.hero;

  return (
    <section className="relative">
      <div className="container py-section grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left — copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="text-eyebrow uppercase text-ink-70 mb-6">
            {t.eyebrow}
          </p>
          <h1 className="font-display text-h1 tracking-tight text-ink">
            {t.tagline}
          </h1>
          <p className="mt-6 text-lead text-ink-70 max-w-[58ch]">{t.sub}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg">
              {t.ctaPrimary}
            </Button>
            <Button variant="secondary" size="lg">
              {t.ctaSecondary}
            </Button>
          </div>
          <p className="mt-4 text-small text-ink-50">{t.microproof}</p>
        </motion.div>

        {/* Right — inbox mockup */}
        <div className="lg:col-span-6 flex lg:justify-end">
          <InboxMockup />
        </div>
      </div>
    </section>
  );
}
