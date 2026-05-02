"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * Pricing — two plans (Lever + Enterprise) with a shared Mensuel / Annuel
 * toggle. Lever is the featured plan (slightly raised, "Recommandé"
 * ribbon, brand-purple primary CTA). Enterprise is custom-priced and
 * ignores the toggle — it shows "Sur mesure" instead of a number.
 *
 * Layout:
 *   - md+: two cards side by side at equal height
 *   - < md: cards stack with the featured plan on top
 */
export function Pricing() {
  const t = copy.fr.pricing;
  const reduce = useReducedMotion();
  const [annual, setAnnual] = React.useState(true);

  return (
    <section
      id="pricing"
      className="relative bg-white border-y border-neutral-20 overflow-hidden"
    >
      {/* Soft purple wash anchored to the cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[720px] rounded-full bg-purple-30/25 blur-3xl"
      />

      <div className="relative container py-section-sm md:py-section">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[680px] mx-auto mb-10 lg:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-eyebrow uppercase text-neutral-80 px-3 py-1 rounded-sm border border-neutral-20 bg-neutral-5 mb-6">
            <span className="size-1.5 rounded-full bg-purple-60" />
            {t.eyebrow}
          </span>
          <h2 className="font-display text-h2 tracking-tight text-neutral-90">
            {t.title}
          </h2>
          <p className="mt-5 text-lead text-neutral-80">{t.sub}</p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="flex justify-center mb-10"
        >
          <BillingToggle annual={annual} onChange={setAnnual} t={t} />
        </motion.div>

        {/* Plans grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
          className="mx-auto max-w-[1080px] grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch"
        >
          {t.plans.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              annual={annual}
              reduce={Boolean(reduce)}
            />
          ))}
        </motion.div>

        {/* Trust marks */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {t.trust.map((label, i) => {
            const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
            return (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-neutral-20 bg-neutral-5 text-eyebrow uppercase text-neutral-80"
              >
                <Icon
                  size={12}
                  strokeWidth={1.75}
                  className="text-neutral-60"
                  aria-hidden="true"
                />
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const TRUST_ICONS = [Lock, ShieldCheck, ShieldCheck, Server];

type Plan = (typeof copy.fr.pricing.plans)[number];

function PlanCard({
  plan,
  annual,
  reduce,
}: {
  plan: Plan;
  annual: boolean;
  reduce: boolean;
}) {
  const t = copy.fr.pricing;

  return (
    <article
      className={cn(
        "relative rounded-xl bg-white p-6 sm:p-8 lg:p-10 flex flex-col",
        plan.featured
          ? "border-2 border-neutral-90 shadow-[0_2px_0_rgba(41,40,39,0.06),_0_18px_36px_-16px_rgba(41,40,39,0.25)]"
          : "border border-neutral-20 shadow-card"
      )}
    >
      {plan.highlightLabel ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-90 text-white text-eyebrow uppercase">
          <span className="size-1.5 rounded-full bg-purple-30" />
          {plan.highlightLabel}
        </span>
      ) : null}

      {/* Plan title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-6">
        <span className="font-display text-h3 tracking-tight text-neutral-90">
          {plan.name}
        </span>
        <span className="text-small text-neutral-60 mt-1 sm:mt-0">
          {plan.tagline}
        </span>
      </div>

      {/* Price */}
      {plan.key === "enterprise" ? (
        <div className="flex items-end gap-2 flex-wrap leading-none">
          <span
            className="font-display text-neutral-90"
            style={{
              fontSize: "clamp(40px, 4.5vw, 56px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            {plan.customLabel}
          </span>
          <span className="text-small text-neutral-60 mb-2">
            {plan.customSub}
          </span>
        </div>
      ) : (
        <PriceBlock
          monthlyPrice={plan.monthlyPrice}
          annualPrice={plan.annualPrice}
          monthlyNote={plan.monthlyNote}
          annualNote={plan.annualNote}
          unit={plan.unit}
          cadence={plan.cadence}
          annual={annual}
          reduce={reduce}
        />
      )}

      {/* CTA */}
      <div className="mt-7">
        {plan.featured ? (
          <Button variant="primary" size="lg" className="group w-full">
            {plan.cta}
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
        ) : (
          <Button variant="secondary" size="lg" className="group w-full">
            {plan.cta}
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Button>
        )}
        {plan.featured ? (
          <p className="mt-3 text-small text-neutral-60 text-center">
            {t.microproof}
          </p>
        ) : null}
      </div>

      {/* Features list */}
      <div className="mt-8 pt-7 border-t border-neutral-20 flex-1">
        <p className="text-eyebrow uppercase text-neutral-60 mb-4">
          {t.includes}
        </p>
        <ul className="space-y-3">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-body text-neutral-80"
            >
              <Check
                size={16}
                strokeWidth={2.25}
                className={cn(
                  "mt-1 shrink-0",
                  plan.featured ? "text-green-60" : "text-neutral-90"
                )}
                aria-hidden="true"
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PriceBlock({
  monthlyPrice,
  annualPrice,
  monthlyNote,
  annualNote,
  unit,
  cadence,
  annual,
  reduce,
}: {
  monthlyPrice: number;
  annualPrice: number;
  monthlyNote: string;
  annualNote: string;
  unit: string;
  cadence: string;
  annual: boolean;
  reduce: boolean;
}) {
  const price = annual ? annualPrice : monthlyPrice;
  const note = annual ? annualNote : monthlyNote;
  const savings = annual
    ? `Économise ${(monthlyPrice - annualPrice) * 12} € / an`
    : null;

  return (
    <div>
      <div className="flex items-end gap-3 flex-wrap">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={annual ? "annual" : "monthly"}
            initial={
              reduce ? false : { opacity: 0, y: 10, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end gap-1 leading-none"
          >
            <span
              className="font-display text-neutral-90 tabular-nums"
              style={{
                fontSize: "clamp(56px, 6vw, 88px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              {price}
            </span>
            <span className="font-display text-h3 text-neutral-90 mb-1">
              {unit}
            </span>
            <span className="text-body text-neutral-60 ml-1 mb-2">
              {cadence}
            </span>
          </motion.div>
        </AnimatePresence>
        {savings ? (
          <span className="inline-flex items-center gap-1 mb-2 px-2 py-1 rounded-sm bg-green-10 text-green-60 border border-green-60/20 text-eyebrow uppercase">
            {savings}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-small text-neutral-60">{note}</p>
    </div>
  );
}

function BillingToggle({
  annual,
  onChange,
  t,
}: {
  annual: boolean;
  onChange: (next: boolean) => void;
  t: typeof copy.fr.pricing;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Choisir la fréquence de facturation"
      className="relative inline-flex items-center p-1 rounded-full border border-neutral-20 bg-white shadow-card"
    >
      <ToggleOption
        selected={!annual}
        onClick={() => onChange(false)}
        label={t.monthly.label}
      />
      <ToggleOption
        selected={annual}
        onClick={() => onChange(true)}
        label={t.annual.label}
        badge={t.annual.savings ?? undefined}
      />
    </div>
  );
}

function ToggleOption({
  selected,
  onClick,
  label,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-2 px-4 h-9 rounded-full",
        "text-small font-medium transition-colors duration-200 ease-soft",
        selected ? "text-white" : "text-neutral-80 hover:text-neutral-90"
      )}
    >
      {selected && (
        <motion.span
          layoutId="billing-toggle-bg"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
          className="absolute inset-0 rounded-full bg-neutral-90"
        />
      )}
      <span className="relative">{label}</span>
      {badge ? (
        <span
          className={cn(
            "relative px-1.5 py-0.5 rounded-sm text-[10px] uppercase tracking-[0.14em]",
            selected
              ? "bg-white/15 text-white"
              : "bg-green-10 text-green-60 border border-green-60/20"
          )}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}
