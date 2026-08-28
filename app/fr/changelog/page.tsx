import type { Metadata } from "next";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Changelog — Virtus Lever",
  description:
    "Les nouveautés de Virtus Lever, version après version. Ce qu'on a expédié, sans bruit.",
  alternates: { canonical: "/fr/changelog" },
};

type Entry = {
  version: string;
  date: string;
  tag: "Nouveau" | "Amélioré" | "Corrigé";
  title: string;
  items: string[];
};

const ENTRIES: Entry[] = [
  {
    version: "0.4",
    date: "Août 2026",
    tag: "Nouveau",
    title: "Score de levier explicable",
    items: [
      "Chaque Domino affiche les trois signaux qui l'ont fait remonter.",
      "Nouveau raccourci clavier pour reporter au lendemain.",
      "Export CSV de ton historique de priorités.",
    ],
  },
  {
    version: "0.3",
    date: "Juillet 2026",
    tag: "Amélioré",
    title: "Triage plus rapide",
    items: [
      "Le classement se recalcule en tâche de fond, sans recharger la boîte.",
      "Marque comme lu / archivé directement depuis le cockpit.",
    ],
  },
  {
    version: "0.2",
    date: "Juin 2026",
    tag: "Corrigé",
    title: "Fiabilité des relances",
    items: [
      "Les relances programmées ne se dédoublent plus après une reconnexion.",
      "Meilleure gestion des fuseaux horaires sur les envois différés.",
    ],
  },
  {
    version: "0.1",
    date: "Mai 2026",
    tag: "Nouveau",
    title: "Première bêta privée",
    items: [
      "Connexion Gmail & Outlook en OAuth lecture seule.",
      "Algorithme Domino : une priorité par jour.",
    ],
  },
];

const TAG_VARIANT = {
  Nouveau: "accent",
  Amélioré: "score",
  Corrigé: "neutral",
} as const;

export default function ChangelogPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Changelog"
        title="Ce qu'on a expédié."
        lead="Les nouveautés, version après version. On avance par petits pas solides, sans annonce tapageuse."
      />

      <Section>
        <div className="measure">
          <ol className="relative border-l border-neutral-20 space-y-12 pl-8">
            {ENTRIES.map((e) => (
              <li key={e.version} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-1 grid place-items-center size-4 rounded-full border border-neutral-30 bg-white"
                >
                  <span className="size-1.5 rounded-full bg-purple-60" />
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={TAG_VARIANT[e.tag]}>{e.tag}</Badge>
                  <span className="text-small text-neutral-60 tabular-nums">
                    v{e.version} · {e.date}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-h4 tracking-tight text-neutral-90">
                  {e.title}
                </h2>

                <ul className="mt-3 space-y-2">
                  {e.items.map((it) => (
                    <li
                      key={it}
                      className="text-body text-neutral-80 pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-neutral-30"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </PageShell>
  );
}
