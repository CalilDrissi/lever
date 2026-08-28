import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUTH_LINKS } from "@/lib/links";

export const metadata: Metadata = {
  title: "À propos — Virtus Lever",
  description:
    "Pourquoi Virtus Lever existe : rendre l'email calme et décidé. Une priorité par jour, le reste à ton rythme. Fait en France.",
  alternates: { canonical: "/fr/about" },
};

const VALUES = [
  {
    eyebrow: "Levier",
    title: "L'effort au bon endroit.",
    body:
      "Un email par jour, le bon. On refuse la course au « tout traiter » : on cherche le geste qui débloque le plus, et on s'arrête là.",
  },
  {
    eyebrow: "Calme",
    title: "Moins de bruit, plus de signal.",
    body:
      "Un outil bien construit rend des après-midis. Pas de badges rouges, pas de culpabilité — juste la prochaine décision claire.",
  },
  {
    eyebrow: "Sobriété",
    title: "Ce qui compte, rien de plus.",
    body:
      "Une offre, tout inclus. Pas de fausse urgence, pas de dark patterns. Tu peux exporter ou tout supprimer en une action.",
  },
  {
    eyebrow: "Confiance",
    title: "Tes emails restent les tiens.",
    body:
      "OAuth en lecture par défaut, chiffrement au repos et en transit, hébergement européen. La sécurité n'est pas une option.",
  },
];

const STATS = [
  { value: "10 min", label: "par jour, en moyenne" },
  { value: "−30 %", label: "de backlog en deux semaines" },
  { value: "1", label: "priorité claire chaque matin" },
];

export default function AProposPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="À propos"
        title="On construit l'inbox la plus calme du web."
        lead="Virtus Lever transforme ta boîte de réception en une décision claire par jour. Le reste attend — et ce n'est pas grave."
      >
        <div className="flex flex-wrap gap-3">
          <a href={AUTH_LINKS.signup}>
            <Button variant="primary" size="md" className="rounded">
              Essayer Lever
            </Button>
          </a>
          <Link href="/fr/contact">
            <Button variant="secondary" size="md" className="rounded">
              Parler à l'équipe
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-eyebrow uppercase text-neutral-80">Notre histoire</p>
          </div>
          <div className="lg:col-span-8 measure">
            <h2 className="font-display text-h2 tracking-tight">
              Ta boîte n'est pas une to-do list. C'est une arène de décisions.
            </h2>
            <p className="mt-6 text-body text-neutral-80">
              On a passé des années à voir des équipes brillantes se noyer dans
              leur inbox. Le problème n'était pas le volume — c'était l'absence
              de hiérarchie. Tout paraît urgent, donc rien ne l'est vraiment.
            </p>
            <p className="mt-4 text-body text-neutral-80">
              Virtus Lever est né d'une conviction simple : la plupart de la
              valeur se cache dans une poignée d'emails. L'algorithme Domino
              combine Pareto et la logique du « One Thing » pour trouver
              celui-là — le geste à plus haut levier — et te le présenter en
              premier. Tu le traites, et tu fais le reste à ton rythme.
            </p>
            <p className="mt-4 text-body text-neutral-80">
              Pas de magie, pas de promesse en « 10x ». Juste un outil sobre qui
              te rend tes matinées.
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
          <p className="text-eyebrow uppercase text-neutral-80 mb-3">Ce qui nous guide</p>
          <h2 className="font-display text-h2 tracking-tight">
            Quatre principes, un seul cap.
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
              Fait en France
            </p>
            <h2 className="font-display text-h2 tracking-tight text-white max-w-[20ch]">
              Une équipe discrète, à Paris.
            </h2>
            <p className="mt-5 text-body text-white/70 measure">
              On est une petite équipe qui préfère les produits solides aux
              annonces bruyantes. Hébergement européen, données maîtrisées, et
              une exigence : que Lever te fasse gagner du temps sans jamais
              t'enfermer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={AUTH_LINKS.signup}>
                <Button variant="primary" size="md" className="rounded">
                  Commencer — 14 jours offerts
                </Button>
              </a>
              <Link href="/fr/contact">
                <Button
                  variant="secondary"
                  size="md"
                  className="rounded border-white/30 text-white hover:bg-white hover:text-neutral-90"
                >
                  Nous écrire
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
