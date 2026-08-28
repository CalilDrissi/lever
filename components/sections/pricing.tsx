"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Minus, ArrowRight, ArrowUpRight, Lock, ShieldCheck, Server, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AUTH_LINKS } from "@/lib/links";
import { useCurrency } from "@/components/currency-provider";
import {
  MONTHLY_PRICES,
  ANNUAL_PRICES,
  CURRENCY_SYMBOL,
  CURRENCY_PREFIX,
  annualSavings,
  FEATURE_MATRIX,
  type Currency,
} from "@/lib/currency";

const PLANS = [
  {
    key: "free",
    name: "Free",
    tagline: "Tester Lever",
    badge: null,
    scarcity: null,
    featured: false,
    monthlyOnly: false,
    cta: "Commencer gratuitement",
    ctaHref: AUTH_LINKS.signup,
    ctaVariant: "secondary" as const,
    features: [
      "1 boîte mail connectée",
      "5 actions IA par jour",
      "Inbox intelligence basique",
      "Tâches et GTD basiques",
      "Weekly summary basique",
    ],
  },
  {
    key: "founding",
    name: "Founding",
    tagline: "Offre de lancement",
    badge: "Offre de lancement",
    scarcity: "200 places · mensuel uniquement",
    featured: true,
    monthlyOnly: true,
    cta: "Rejoindre les premiers",
    ctaHref: AUTH_LINKS.signup,
    ctaVariant: "primary" as const,
    features: [
      "3 boîtes mail connectées",
      "50 actions IA par jour",
      "Inbox intelligence complète",
      "Auto-scheduling + Memory",
      "RAG / Knowledge Base limité",
      "Même périmètre que Pro",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "Usage quotidien",
    badge: null,
    scarcity: null,
    featured: false,
    monthlyOnly: false,
    cta: "Commencer — 14 jours",
    ctaHref: AUTH_LINKS.signup,
    ctaVariant: "secondary" as const,
    features: [
      "3 boîtes mail connectées",
      "50 actions IA par jour",
      "Inbox intelligence complète",
      "Auto-scheduling + Memory",
      "RAG / Knowledge Base limité",
      "Support FR/EN sous 24 h",
    ],
  },
  {
    key: "power",
    name: "Power",
    tagline: "Solo premium",
    badge: null,
    scarcity: null,
    featured: false,
    monthlyOnly: false,
    cta: "Passer à Power",
    ctaHref: AUTH_LINKS.signup,
    ctaVariant: "secondary" as const,
    features: [
      "10 boîtes mail connectées",
      "500 actions IA par jour",
      "RAG / Knowledge Base avancé",
      "Pareto / Analytics avancée",
      "Algorithme Domino complet",
      "Weekly summary avancé",
    ],
  },
] as const;

const TRUST_ITEMS = [
  { icon: Lock,        label: "OAuth read-only" },
  { icon: ShieldCheck, label: "AES-256" },
  { icon: ShieldCheck, label: "TLS 1.3" },
  { icon: Server,      label: "Hébergement UE" },
];

const PLAN_COLS = ["free", "founding", "pro", "power", "enterprise"] as const;

export function Pricing() {
  const reduce = useReducedMotion();
  const [annual, setAnnual] = React.useState(true);

  return (
    <section id="pricing" className="relative bg-white border-y border-neutral-20 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[760px] rounded-full bg-purple-30/20 blur-3xl" />

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
            Tarifs
          </span>
          <h2 className="font-display text-h2 tracking-tight text-neutral-90">
            Des abonnements simples pour reprendre le contrôle.
          </h2>
          <p className="mt-5 text-lead text-neutral-80">
            Essai 14 jours, sans carte. Change ou annule à tout moment.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <BillingToggle annual={annual} onChange={setAnnual} />
        </motion.div>

        {/* Plan cards — 4 self-serve */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-4 lg:mb-5"
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.key} plan={plan} annual={annual} reduce={Boolean(reduce)} />
          ))}
        </motion.div>

        {/* Enterprise band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <EnterpriseBand />
        </motion.div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-14"
        >
          <FeatureTable />
        </motion.div>

        {/* Trust marks */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-neutral-20 bg-neutral-5 text-eyebrow uppercase text-neutral-80">
              <Icon size={12} strokeWidth={1.75} className="text-neutral-60" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PlanCard
// ---------------------------------------------------------------------------

type Plan = (typeof PLANS)[number];

function PlanCard({ plan, annual, reduce }: { plan: Plan; annual: boolean; reduce: boolean }) {
  const { currency } = useCurrency();
  const sym = CURRENCY_SYMBOL[currency];
  const prefix = CURRENCY_PREFIX[currency];

  const monthlyAmt = MONTHLY_PRICES[plan.key]?.[currency] ?? 0;
  const annualAmt = ANNUAL_PRICES[plan.key]?.[currency];
  const isMonthlyOnly = plan.monthlyOnly || annualAmt == null;
  const displayAmt = (annual && !isMonthlyOnly) ? (annualAmt ?? monthlyAmt) : monthlyAmt;
  const savings = annual && !isMonthlyOnly ? annualSavings(plan.key, currency) : null;
  const isFree = monthlyAmt === 0;

  return (
    <article
      className={cn(
        "relative rounded-xl bg-white flex flex-col",
        plan.featured
          ? "border-2 border-purple-60 shadow-[0_2px_0_rgba(113,76,182,0.08),_0_18px_36px_-16px_rgba(113,76,182,0.28)] p-5 sm:p-6"
          : "border border-neutral-20 shadow-card p-5 sm:p-6"
      )}
    >
      {plan.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-60 text-white text-eyebrow uppercase">
          <Zap size={10} strokeWidth={2} aria-hidden="true" />
          {plan.badge}
        </span>
      ) : null}

      {/* Name + tagline */}
      <div className="mb-4">
        <p className="font-display text-h4 tracking-tight text-neutral-90">{plan.name}</p>
        <p className="text-small text-neutral-60 mt-0.5">{plan.tagline}</p>
      </div>

      {/* Price */}
      {isFree ? (
        <div className="mb-1">
          <span className="font-display text-neutral-90" style={{ fontSize: "clamp(36px, 3.5vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
            Gratuit
          </span>
        </div>
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${plan.key}-${annual ? "an" : "mo"}-${currency}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end gap-1 flex-wrap leading-none mb-1"
          >
            {prefix && <span className="font-display text-h3 text-neutral-90 mb-0.5">{sym}</span>}
            <span
              className="font-display text-neutral-90 tabular-nums"
              style={{ fontSize: "clamp(36px, 3.5vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em" }}
            >
              {displayAmt}
            </span>
            {!prefix && <span className="font-display text-h4 text-neutral-90 mb-0.5">{sym}</span>}
            <span className="text-small text-neutral-60 mb-1 ml-0.5">/ mois</span>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Note / scarcity */}
      <p className="text-small text-neutral-60 mb-5 min-h-[1.25rem]">
        {plan.scarcity ? (
          <span className="text-purple-60 font-medium">{plan.scarcity}</span>
        ) : isFree ? (
          "Pour découvrir Lever"
        ) : isMonthlyOnly ? (
          "mensuel uniquement"
        ) : annual ? (
          savings
            ? `Économise ${prefix ? sym : ""}${savings}${!prefix ? " " + sym : ""} / an`
            : "facturé annuellement"
        ) : (
          "facturé chaque mois"
        )}
      </p>

      {/* CTA */}
      <a href={plan.ctaHref} className="block">
        <Button variant={plan.ctaVariant} size="md" className={cn("w-full group whitespace-nowrap justify-center", plan.featured && "shadow-[0_6px_16px_-6px_rgba(113,76,182,0.5)]")}>
          {plan.cta}
          {plan.featured
            ? <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5" aria-hidden="true" />
            : null
          }
        </Button>
      </a>

      {/* Features */}
      <div className="mt-6 pt-5 border-t border-neutral-20 flex-1">
        <p className="text-eyebrow uppercase text-neutral-60 mb-3">Inclus :</p>
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-small text-neutral-80">
              <Check
                size={14}
                strokeWidth={2.25}
                className={cn("mt-0.5 shrink-0", plan.featured ? "text-purple-60" : "text-neutral-60")}
                aria-hidden="true"
              />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Enterprise band
// ---------------------------------------------------------------------------

function EnterpriseBand() {
  return (
    <div className="rounded-xl border border-neutral-20 bg-neutral-5 px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-display text-h5 tracking-tight text-neutral-90">Team / Enterprise</p>
          <span className="text-small text-neutral-60">· Organisation</span>
        </div>
        <p className="text-small text-neutral-60 max-w-[540px]">
          Multi-sièges, SSO/SAML, audit logs, hébergement dédié, SLA et DPA personnalisés.
          Pour les équipes qui ont des besoins sur mesure.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-display text-h4 text-neutral-90">Sur devis</span>
        <a href="/contact">
          <Button variant="secondary" size="md" className="group whitespace-nowrap">
            Parler à l'équipe
            <ArrowUpRight size={15} strokeWidth={2} className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Button>
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feature comparison table
// ---------------------------------------------------------------------------

function FeatureCell({ value }: { value: import("@/lib/currency").FeatureValue }) {
  if (value === true) return <Check size={16} strokeWidth={2.25} className="text-green-60 mx-auto" aria-label="Inclus" />;
  if (value === false) return <Minus size={14} strokeWidth={1.75} className="text-neutral-30 mx-auto" aria-label="Non inclus" />;
  return (
    <span className={cn(
      "inline-block px-1.5 py-0.5 rounded text-[11px] font-medium",
      value === "avancé" ? "bg-purple-10 text-purple-60" :
      value === "limité" ? "bg-neutral-10 text-neutral-60" :
      value === "basique" ? "bg-neutral-10 text-neutral-60" :
      value === "custom" ? "bg-green-10 text-green-60" :
      "text-neutral-80"
    )}>
      {value}
    </span>
  );
}

const COL_LABELS: Record<(typeof PLAN_COLS)[number], string> = {
  free: "Free",
  founding: "Founding",
  pro: "Pro",
  power: "Power",
  enterprise: "Team",
};

function FeatureTable() {
  return (
    <div>
      <p className="font-display text-h5 tracking-tight text-neutral-90 mb-6 text-center">Comparer les plans</p>
      <div className="overflow-x-auto rounded-xl border border-neutral-20">
        <table className="w-full min-w-[620px] text-small">
          <thead>
            <tr className="border-b border-neutral-20">
              <th className="text-left px-4 py-3 text-eyebrow uppercase text-neutral-60 font-medium w-[200px]">Fonctionnalité</th>
              {PLAN_COLS.map((col) => (
                <th key={col} className={cn(
                  "text-center px-3 py-3 text-eyebrow uppercase font-medium",
                  col === "founding" ? "text-purple-60" : "text-neutral-60"
                )}>
                  {COL_LABELS[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_MATRIX.map((row, i) => (
              <tr key={row.label} className={cn("border-b border-neutral-10 last:border-b-0", i % 2 === 0 ? "bg-white" : "bg-neutral-5/50")}>
                <td className="px-4 py-2.5 text-neutral-80">{row.label}</td>
                {PLAN_COLS.map((col) => (
                  <td key={col} className={cn(
                    "px-3 py-2.5 text-center",
                    col === "founding" ? "bg-purple-10/30" : ""
                  )}>
                    <FeatureCell value={row.values[col]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Billing toggle
// ---------------------------------------------------------------------------

function BillingToggle({ annual, onChange }: { annual: boolean; onChange: (v: boolean) => void }) {
  return (
    <div role="radiogroup" aria-label="Fréquence de facturation" className="relative inline-flex items-center p-1 rounded-full border border-neutral-20 bg-white shadow-card">
      {(["monthly", "annual"] as const).map((mode) => {
        const isAnnual = mode === "annual";
        const selected = isAnnual ? annual : !annual;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(isAnnual)}
            className={cn(
              "relative inline-flex items-center gap-2 px-4 h-9 rounded-full",
              "text-small font-medium transition-colors duration-200 ease-soft",
              selected ? "text-white" : "text-neutral-80 hover:text-neutral-90"
            )}
          >
            {selected && (
              <motion.span
                layoutId="billing-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-neutral-90"
              />
            )}
            <span className="relative">{isAnnual ? "Annuel" : "Mensuel"}</span>
            {isAnnual && (
              <span className={cn(
                "relative px-1.5 py-0.5 rounded-sm text-[10px] uppercase tracking-[0.14em]",
                selected ? "bg-white/15 text-white" : "bg-green-10 text-green-60 border border-green-60/20"
              )}>
                −17 %
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
