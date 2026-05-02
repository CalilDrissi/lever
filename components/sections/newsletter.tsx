"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";
import { copy } from "@/lib/copy";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Newsletter — light buffer between FinalCta (charcoal) and Footer
 * (mulberry-100). The two dark sections were stacking with no breathing
 * room; this calm, light-toned band gives the page a clean exhale before
 * the closing footer.
 *
 * Form is a stub — submit shows a success state but doesn't send.
 */
export function Newsletter() {
  const t = copy.fr.newsletter;
  const reduce = useReducedMotion();
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <section className="relative bg-neutral-5 border-y border-neutral-20 overflow-hidden">
      {/* Soft purple wash in the corner — quiet brand whisper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full bg-purple-30/30 blur-3xl"
      />

      <div className="relative container py-section-sm md:py-section">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 text-eyebrow uppercase text-neutral-80 px-3 py-1 rounded-sm border border-neutral-20 bg-white mb-6">
              <Mail
                size={12}
                strokeWidth={1.75}
                aria-hidden="true"
                className="text-neutral-60"
              />
              {t.eyebrow}
            </span>
            <h2 className="font-display text-h2 tracking-tight text-neutral-90 max-w-[20ch]">
              {t.title}
            </h2>
            <p className="mt-5 text-lead text-neutral-80 max-w-[52ch]">
              {t.sub}
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
            className="lg:col-span-5"
          >
            <form
              onSubmit={onSubmit}
              className={cn(
                "rounded-xl border border-neutral-20 bg-white p-5 sm:p-6 lg:p-8",
                "shadow-card"
              )}
            >
              {submitted ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <span className="grid place-items-center size-10 rounded-full bg-green-10 text-green-60">
                    <Check size={18} strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-h6 tracking-tight text-neutral-90">
                      Inscription confirmée.
                    </p>
                    <p className="text-small text-neutral-80">
                      Première lettre dans deux semaines.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <label
                    htmlFor="newsletter-email"
                    className="block text-eyebrow uppercase text-neutral-60 mb-3"
                  >
                    Email
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder={t.placeholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="group shrink-0"
                    >
                      {t.cta}
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                  <p className="mt-3 text-small text-neutral-60">
                    {t.microproof}
                  </p>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
