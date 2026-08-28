import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUTH_LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "About — Virtus Lever",
  description:
    "Why Virtus Lever exists: making email calm and decisive. One priority a day, the rest at your pace. Built in France.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    eyebrow: "Leverage",
    title: "Effort in the right place.",
    body:
      "One email a day, the right one. We reject the race to 'handle everything': we look for the move that unblocks the most, and stop there.",
  },
  {
    eyebrow: "Calm",
    title: "Less noise, more signal.",
    body:
      "A well-built tool gives back your afternoons. No red badges, no guilt — just the next clear decision.",
  },
  {
    eyebrow: "Simplicity",
    title: "What matters, nothing more.",
    body:
      "One plan, everything included. No false urgency, no dark patterns. You can export or delete everything in one action.",
  },
  {
    eyebrow: "Trust",
    title: "Your emails stay yours.",
    body:
      "OAuth read-only by default, encrypted at rest and in transit, European hosting. Security is not a feature — it's the baseline.",
  },
];

const STATS = [
  { value: "10 min", label: "per day, on average" },
  { value: "−30%", label: "backlog reduction in two weeks" },
  { value: "1", label: "clear priority every morning" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="We're building the calmest inbox on the web."
        lead="Virtus Lever turns your inbox into one clear decision a day. The rest can wait — and that's fine."
      >
        <div className="flex flex-wrap gap-3">
          <a href={AUTH_LINKS.signup}>
            <Button variant="primary" size="md" className="rounded">
              Try Lever
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="secondary" size="md" className="rounded">
              Talk to the team
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-eyebrow uppercase text-neutral-80">Our story</p>
          </div>
          <div className="lg:col-span-8 measure">
            <h2 className="font-display text-h2 tracking-tight">
              Your inbox isn't a to-do list. It's a decision arena.
            </h2>
            <p className="mt-6 text-body text-neutral-80">
              We spent years watching brilliant teams drown in their inboxes.
              The problem wasn't volume — it was the absence of hierarchy.
              Everything feels urgent, so nothing really is.
            </p>
            <p className="mt-4 text-body text-neutral-80">
              Virtus Lever was born from a simple conviction: most of the value
              hides in a handful of emails. The Domino algorithm combines Pareto
              and the One Thing logic to find that email — the highest-leverage
              move — and surface it first. You handle it, then do the rest at
              your own pace.
            </p>
            <p className="mt-4 text-body text-neutral-80">
              No magic, no "10x" promises. Just a focused tool that gives back
              your mornings.
            </p>
          </div>
        </div>
      </Section>

      {/* Stats band */}
      <section className="border-y border-neutral-20 bg-neutral-5">
        <div className="container py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-h1 tracking-tight text-neutral-90">
                {s.value}
              </p>
              <p className="mt-1 text-body text-neutral-80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <Section>
        <div className="max-w-[46ch]">
          <p className="text-eyebrow uppercase text-neutral-80 mb-3">What guides us</p>
          <h2 className="font-display text-h2 tracking-tight">
            Four principles, one direction.
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <Card key={v.eyebrow} variant="surface" className="p-8">
              <Badge variant="neutral" className="mb-4">
                {v.eyebrow}
              </Badge>
              <h3 className="font-display text-h4 tracking-tight text-neutral-90">
                {v.title}
              </h3>
              <p className="mt-3 text-body text-neutral-80">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Made in France + CTA */}
      <section className="border-t border-neutral-20">
        <div className="container py-16 sm:py-20">
          <Card variant="inverted" className="p-10 sm:p-14">
            <p className="text-eyebrow uppercase text-white/60 mb-4">
              Built in France
            </p>
            <h2 className="font-display text-h2 tracking-tight text-white max-w-[20ch]">
              A quiet team, in Paris.
            </h2>
            <p className="mt-5 text-body text-white/70 measure">
              We're a small team that prefers solid products to loud announcements.
              European hosting, data you control, and one non-negotiable: Lever
              should save you time without ever locking you in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={AUTH_LINKS.signup}>
                <Button variant="primary" size="md" className="rounded">
                  Start — 14 days free
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="md"
                  className="rounded border-white/30 text-white hover:bg-white hover:text-neutral-90"
                >
                  Write to us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
