import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { InboxMockup } from "@/components/inbox-mockup";

/**
 * /styleguide — visible reference for all tokens & components.
 * Each item is annotated with its Tailwind utility name in monospace
 * so the design tokens can be referenced verbatim during iteration.
 */
export default function StyleGuidePage() {
  return (
    <main className="bg-white text-neutral-90">
      <header className="border-b border-neutral-20">
        <div className="container py-12">
          <p className="text-eyebrow uppercase text-neutral-80 mb-3">
            Virtus Lever — Style Guide
          </p>
          <h1 className="font-display text-h2 tracking-tight">
            Tokens, type, composants.
          </h1>
          <p className="mt-3 text-lead text-neutral-80 measure">
            Référence vivante. Chaque élément est annoté avec son token Tailwind
            (<Code>bg-white</Code>, <Code>text-neutral-90</Code>, <Code>rounded-xl</Code>…)
            pour pouvoir y faire référence pendant les itérations.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/" className="text-small text-neutral-80 hover:text-neutral-90 underline-offset-4 hover:underline">
              ← Retour à la landing
            </Link>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------- */}
      <Section
        n="01"
        title="Couleurs"
        sub="Échelle Superhuman — neutral, purple, green. Le purple-60 est l'unique accent (utilisé une fois dans le hero)."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Swatch token="bg-white"            hex="#ffffff" use="Fond global page" />
          <Swatch token="bg-neutral-5"        hex="#f7f5f2" use="Surface en relief" />
          <Swatch token="bg-neutral-10"       hex="#f2f0eb" use="Surface carte" />
          <Swatch token="bg-neutral-90"       hex="#292827" use="Encre principale / sections inversées" inverted />
          <Swatch token="text-neutral-80"     hex="#474543" use="Type secondaire" />
          <Swatch token="text-neutral-60"     hex="#73716d" use="Hint / muted" />
          <Swatch token="text-neutral-30"     hex="#bfbcb6" use="Diviseur appuyé" />
          <Swatch token="border-neutral-20"   hex="#dedbd5" use="Bordure par défaut" />
          <Swatch token="border-neutral-30"   hex="#bfbcb6" use="Bordure soulignée" />
          <Swatch token="bg-purple-60"        hex="#714cb6" use="Accent hero (1×)" inverted />
          <Swatch token="bg-purple-90"        hex="#3f256f" use="Hover bouton primaire" inverted />
          <Swatch token="text-green-60"       hex="#148072" use="Score de levier" />
          <Swatch token="bg-green-10"         hex="#d5f7eb" use="Chip score" />
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="02"
        title="Typographie"
        sub="Inter Display pour les titres (condensed feel). Inter pour le corps. Tracking serré, line-height aérée."
      >
        <div className="space-y-8 border-t border-neutral-20 pt-8">
          <TypeRow
            token="text-h1 / clamp(48px, 7vw, 88px)"
            sample="Transforme ton inbox en 1 priorité claire par jour."
            className="font-display text-h1"
          />
          <TypeRow
            token="text-h2 / 44px"
            sample="Quatre leviers, un seul cockpit."
            className="font-display text-h2"
          />
          <TypeRow
            token="text-h3 / 32px"
            sample="Un email. Le bon. Chaque jour."
            className="font-display text-h3"
          />
          <TypeRow
            token="text-h4 / 24px"
            sample="Devis signé — prochaines étapes"
            className="font-display text-h4"
          />
          <TypeRow
            token="text-h5 / 20px"
            sample="Tu fermes le Domino, puis le reste — ou pas."
            className="font-display text-h5"
          />
          <TypeRow
            token="text-h6 / 18px"
            sample="Aujourd'hui · 8 emails à enjeu"
            className="font-display text-h6"
          />
          <TypeRow
            token="text-lead / 20px"
            sample="10 minutes par jour. -30% de backlog en deux semaines."
            className="text-lead text-neutral-80"
          />
          <TypeRow
            token="text-body / 17px line-height 1.6"
            sample="L'algorithme Domino combine Pareto et One Thing pour classer ta boîte par effet de levier — un email par jour, le bon, et tu fais le reste à ton rythme."
            className="text-body text-neutral-80 measure"
          />
          <TypeRow
            token="text-small / 14px"
            sample="Sans carte bancaire · Compatible avec toutes les boîtes"
            className="text-small text-neutral-80"
          />
          <TypeRow
            token="text-eyebrow / 12px tracking 0.14em uppercase"
            sample="Cockpit de productivité — email"
            className="text-eyebrow uppercase text-neutral-60"
          />
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="03"
        title="Boutons"
        sub="Trois variantes. Le primaire (charcoal) est la seule CTA. Pas de boutons néon."
      >
        <div className="grid gap-8">
          <ButtonRow label="primary" variant="primary" />
          <ButtonRow label="secondary" variant="secondary" />
          <ButtonRow label="ghost" variant="ghost" />
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="04"
        title="Cartes"
        sub="Trois surfaces : surface (par défaut), raised (hairline shadow), inverted (charcoal — section sécurité)."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <TokenLabel>variant=&quot;surface&quot;</TokenLabel>
            <Card variant="surface">
              <CardHeader>
                <Badge variant="neutral">Domino</Badge>
                <CardTitle>Un email. Le bon.</CardTitle>
              </CardHeader>
              <CardContent>
                Score de 0 à 100, justification en une phrase, apprend de tes décisions.
              </CardContent>
            </Card>
          </div>
          <div>
            <TokenLabel>variant=&quot;raised&quot;</TokenLabel>
            <Card variant="raised">
              <CardHeader>
                <Badge variant="score">Score 92</Badge>
                <CardTitle>Devis signé — prochaines étapes</CardTitle>
              </CardHeader>
              <CardContent>
                Camille — Atelier Verso. On valide le périmètre…
              </CardContent>
            </Card>
          </div>
          <div>
            <TokenLabel>variant=&quot;inverted&quot;</TokenLabel>
            <Card variant="inverted">
              <CardHeader>
                <p className="text-eyebrow uppercase text-white/60">Sécurité</p>
                <CardTitle className="text-white">Tes emails restent les tiens.</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                OAuth read-only, AES-256, TLS 1.3.
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="05"
        title="Mockup inbox"
        sub="Le composant central du hero. Carte Domino du jour scorée 92. HTML/CSS pur — aucun screenshot."
      >
        <div className="flex justify-center">
          <InboxMockup />
        </div>
        <div className="mt-4 text-center">
          <TokenLabel inline>{`<InboxMockup />`} — components/inbox-mockup.tsx</TokenLabel>
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="06"
        title="Formulaires"
        sub="Inputs sur fond neutral-5, bordure neutral-20. Focus = ring purple-60, pas de glow."
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
          <div className="space-y-1.5">
            <Label htmlFor="sg-email">Email</Label>
            <Input id="sg-email" placeholder="prenom@domaine.com" />
            <p className="text-small text-neutral-60 mt-1">État par défaut — <Code>border-neutral-20</Code></p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sg-email-focus">Email · focus</Label>
            <Input id="sg-email-focus" placeholder="prenom@domaine.com" autoFocus />
            <p className="text-small text-neutral-60 mt-1"><Code>focus:shadow-focus</Code> + <Code>focus:border-purple-60</Code></p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sg-email-disabled">Email · disabled</Label>
            <Input id="sg-email-disabled" placeholder="prenom@domaine.com" disabled />
            <p className="text-small text-neutral-60 mt-1"><Code>disabled:opacity-50</Code></p>
          </div>
          <div className="space-y-1.5">
            <Label>Badges</Label>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="score">Score 92</Badge>
              <Badge variant="accent">Domino du jour</Badge>
            </div>
            <p className="text-small text-neutral-60 mt-1"><Code>variant=&quot;neutral|score|accent&quot;</Code></p>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="07"
        title="Espacement"
        sub="Base 4px. Les tokens nommés gouvernent le rythme vertical."
      >
        <div className="space-y-3">
          {[
            ["p-1",  "4px"],
            ["p-2",  "8px"],
            ["p-3",  "12px"],
            ["p-4",  "16px"],
            ["p-6",  "24px"],
            ["p-8",  "32px (= px-gutter)"],
            ["p-12", "48px"],
            ["py-section-sm", "64px"],
            ["py-section",    "96px"],
            ["max-w-measure", "65ch — body measure"],
          ].map(([token, value]) => (
            <div key={token} className="flex items-center gap-4">
              <div className="w-44 shrink-0">
                <Code>{token}</Code>
              </div>
              <div className="flex-1 h-2 rounded-sm bg-neutral-20 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-neutral-90 rounded-sm"
                  style={{ width: tokenToWidth(token) }}
                />
              </div>
              <div className="w-44 text-small text-neutral-80 text-right">{value}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="08"
        title="Rayons"
        sub="8 / 16 / 24px. Les inputs sont rounded-sm (8). Cartes et boutons rounded (16). Surfaces vedettes rounded-xl (24)."
      >
        <div className="grid grid-cols-3 gap-6">
          <RadiusSwatch token="rounded-sm" radius="8px" />
          <RadiusSwatch token="rounded"    radius="16px" />
          <RadiusSwatch token="rounded-xl" radius="24px" />
        </div>
      </Section>

      {/* ----------------------------------------------------------- */}
      <Section
        n="09"
        title="Ombres"
        sub="Minimales. Aucune lueur, aucun shadow-2xl. La hairline porte la séparation."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ShadowSwatch token="shadow-hairline" />
          <ShadowSwatch token="shadow-card" />
          <ShadowSwatch token="shadow-focus" />
        </div>
      </Section>

      <footer className="border-t border-neutral-20">
        <div className="container py-10 flex items-center justify-between text-small text-neutral-80">
          <p>Virtus Lever · Style guide — référence vivante.</p>
          <Link href="/" className="hover:text-neutral-90 underline-offset-4 hover:underline">
            Voir la landing →
          </Link>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================== */
/* Local helpers — kept inside the page so they're easy to scan.   */
/* ============================================================== */

function Section({
  n,
  title,
  sub,
  children,
}: {
  n: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-neutral-20">
      <div className="container py-section-sm">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-eyebrow uppercase text-neutral-60 tabular-nums">{n}</span>
          <h2 className="font-display text-h3 tracking-tight">{title}</h2>
        </div>
        <p className="text-body text-neutral-80 measure mb-10">{sub}</p>
        {children}
      </div>
    </section>
  );
}

function Swatch({
  token,
  hex,
  use,
  inverted,
}: {
  token: string;
  hex: string;
  use: string;
  inverted?: boolean;
}) {
  return (
    <div className="rounded-lg border border-neutral-20 overflow-hidden bg-neutral-5">
      <div
        className="h-24 flex items-end p-3"
        style={{ backgroundColor: hex }}
      >
        <span
          className="text-eyebrow uppercase tabular-nums"
          style={{ color: inverted ? "#ffffff" : "#292827", opacity: 0.8 }}
        >
          {hex}
        </span>
      </div>
      <div className="p-3">
        <Code>{token}</Code>
        <p className="text-small text-neutral-80 mt-1">{use}</p>
      </div>
    </div>
  );
}

function TypeRow({
  token,
  sample,
  className,
}: {
  token: string;
  sample: string;
  className: string;
}) {
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 md:gap-8 items-baseline">
      <Code className="self-start mt-2">{token}</Code>
      <p className={className}>{sample}</p>
    </div>
  );
}

function ButtonRow({
  label,
  variant,
}: {
  label: string;
  variant: "primary" | "secondary" | "ghost";
}) {
  return (
    <div className="grid md:grid-cols-[160px_1fr] gap-4 md:gap-8 items-center">
      <div>
        <TokenLabel>variant=&quot;{label}&quot;</TokenLabel>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant={variant} size="sm">Petit</Button>
        <Button variant={variant} size="md">Moyen — défaut</Button>
        <Button variant={variant} size="lg">Grand</Button>
        <Button variant={variant} size="md" disabled>Disabled</Button>
        <Code>size=&quot;sm|md|lg&quot;</Code>
      </div>
    </div>
  );
}

function RadiusSwatch({ token, radius }: { token: string; radius: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-full h-24 bg-neutral-5 border border-neutral-30"
        style={{ borderRadius: radius }}
      />
      <div className="text-center">
        <Code>{token}</Code>
        <p className="text-small text-neutral-80 mt-1">{radius}</p>
      </div>
    </div>
  );
}

function ShadowSwatch({ token }: { token: string }) {
  const shadowClass =
    token === "shadow-hairline"
      ? "shadow-hairline"
      : token === "shadow-card"
      ? "shadow-card"
      : "shadow-focus";
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`w-full h-24 bg-neutral-5 rounded-lg ${shadowClass}`} />
      <Code>{token}</Code>
    </div>
  );
}

function Code({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <code
      className={`font-mono text-[12px] px-1.5 py-0.5 rounded-sm bg-neutral-10 border border-neutral-20 text-neutral-80 ${className}`}
    >
      {children}
    </code>
  );
}

function TokenLabel({
  children,
  inline = false,
}: {
  children: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <p className={`text-eyebrow uppercase text-neutral-60 ${inline ? "" : "mb-2"}`}>
      {children}
    </p>
  );
}

// Visual-only mapping for the spacing scale bar.
function tokenToWidth(token: string): string {
  const map: Record<string, string> = {
    "p-1": "4px",
    "p-2": "8px",
    "p-3": "12px",
    "p-4": "16px",
    "p-6": "24px",
    "p-8": "32px",
    "p-12": "48px",
    "py-section-sm": "64px",
    "py-section": "96px",
    "max-w-measure": "120px",
  };
  return map[token] ?? "16px";
}
