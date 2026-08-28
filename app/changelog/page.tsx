import type { Metadata } from "next";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Changelog — Virtus Lever",
  description:
    "What's new in Virtus Lever, version by version. What we've shipped, without the noise.",
  alternates: { canonical: "/changelog" },
};

type Entry = {
  version: string;
  date: string;
  tag: "New" | "Improved" | "Fixed";
  title: string;
  items: string[];
};

const ENTRIES: Entry[] = [
  {
    version: "0.4",
    date: "August 2026",
    tag: "New",
    title: "Explainable leverage score",
    items: [
      "Each Domino now shows the three signals that pushed it to the top.",
      "New keyboard shortcut to defer to tomorrow.",
      "CSV export of your priority history.",
    ],
  },
  {
    version: "0.3",
    date: "July 2026",
    tag: "Improved",
    title: "Faster triage",
    items: [
      "Ranking recalculates in the background without reloading the inbox.",
      "Mark as read / archive directly from the cockpit.",
    ],
  },
  {
    version: "0.2",
    date: "June 2026",
    tag: "Fixed",
    title: "Follow-up reliability",
    items: [
      "Scheduled follow-ups no longer duplicate after reconnection.",
      "Better timezone handling for deferred sends.",
    ],
  },
  {
    version: "0.1",
    date: "May 2026",
    tag: "New",
    title: "First private beta",
    items: [
      "Gmail & Outlook connection via read-only OAuth.",
      "Domino algorithm: one priority per day.",
    ],
  },
];

const TAG_VARIANT = {
  New: "accent",
  Improved: "score",
  Fixed: "neutral",
} as const;

export default function ChangelogPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Changelog"
        title="What we've shipped."
        lead="Updates, version by version. We move in small, solid steps — no noisy announcements."
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
