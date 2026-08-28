import * as React from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";

/**
 * PageShell — the frame every interior (non-landing) page shares.
 *
 * Renders the floating Nav in `forceSolid` mode (interior pages have no
 * dark hero behind the pill, so the pill must stay solid-on-white rather
 * than its translucent over-hero state), the page body, and the Footer.
 *
 * The <main> gets top padding so content clears the fixed nav pill
 * (~56px tall, offset 12–16px from the top).
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav forceSolid />
      <main className="bg-white text-neutral-90">{children}</main>
      <Footer />
    </>
  );
}

/**
 * PageHeader — the title block at the top of an interior page. Mirrors the
 * styleguide header: eyebrow · h1 · lead, on a quiet neutral-5 band with a
 * hairline base border.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-neutral-20 bg-neutral-5">
      <div className="container pt-32 pb-14 sm:pt-36 sm:pb-16">
        <p className="text-eyebrow uppercase text-neutral-80 mb-3">{eyebrow}</p>
        <h1 className="font-display text-h1 tracking-tight max-w-[16ch]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 text-lead text-neutral-80 measure">{lead}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}

/**
 * Section — a padded content band inside an interior page.
 */
export function Section({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`container py-14 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

/**
 * LegalDoc — shared layout for the legal pages (Confidentialité, CGU, DPA,
 * Sous-traitants). Renders a measured single-column document with numbered
 * headings and a "last updated" line, plus a quiet template disclaimer so
 * it's never mistaken for lawyer-reviewed copy.
 */
export type LegalSection = {
  heading: string;
  /** Each string renders as its own paragraph. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
};

export function LegalDoc({
  updated,
  intro,
  sections,
  locale = "fr",
}: {
  updated?: string;
  intro?: string;
  sections: LegalSection[];
  locale?: "fr" | "en";
}) {
  const updatedLabel = locale === "en" ? "Last updated" : "Dernière mise à jour";
  const disclaimer =
    locale === "en"
      ? "Template document provided for guidance — to be reviewed by legal counsel before any real production use."
      : "Modèle de document fourni à titre indicatif — à faire relire par un conseil juridique avant toute mise en production réelle.";

  return (
    <Section>
      <div className="measure">
        {updated && (
          <p className="text-small text-neutral-60">{updatedLabel} · {updated}</p>
        )}

        <div className="mt-4 rounded-sm border border-neutral-20 bg-neutral-10 px-4 py-3">
          <p className="text-small text-neutral-80">
            {disclaimer}
          </p>
        </div>

        {intro ? (
          <p className="mt-8 text-body text-neutral-80">{intro}</p>
        ) : null}

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-display text-h4 tracking-tight text-neutral-90">
                <span className="text-neutral-30 tabular-nums mr-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3 text-body text-neutral-80">
                  {p}
                </p>
              ))}
              {s.bullets ? (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-body text-neutral-80 pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-neutral-30"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-neutral-20">
          <p className="text-small text-neutral-60">
            {locale === "en" ? "A question about this document? " : "Une question sur ce document ? "}
            <Link
              href={locale === "en" ? "/contact" : "/fr/contact"}
              className="text-neutral-90 underline underline-offset-4 hover:text-purple-60"
            >
              {locale === "en" ? "Contact us" : "Contacte-nous"}
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
