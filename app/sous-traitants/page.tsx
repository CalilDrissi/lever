import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader, Section } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Sous-traitants — Virtus Lever",
  description:
    "La liste des sous-traitants ultérieurs de Virtus Lever et leur rôle dans le traitement des données.",
  alternates: { canonical: "/sous-traitants" },
};

type Subprocessor = {
  name: string;
  purpose: string;
  location: string;
};

const SUBPROCESSORS: Subprocessor[] = [
  { name: "Cloudflare", purpose: "Hébergement du site et CDN", location: "UE / mondial" },
  { name: "Hébergeur cloud (UE)", purpose: "Infrastructure applicative et base de données", location: "Union européenne" },
  { name: "Fournisseur d'emails transactionnels", purpose: "Envoi des emails de service", location: "Union européenne" },
  { name: "Outil d'analytics respectueux de la vie privée", purpose: "Mesure d'audience agrégée", location: "Union européenne" },
  { name: "Plateforme de support", purpose: "Gestion des demandes clients", location: "Union européenne" },
];

export default function SousTraitantsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Légal"
        title="Sous-traitants"
        lead="Les prestataires techniques qui nous aident à faire tourner le service — et ce qu'ils traitent."
      />

      <Section>
        <div className="max-w-[70ch]">
          <div className="rounded-sm border border-neutral-20 bg-neutral-10 px-4 py-3">
            <p className="text-small text-neutral-80">
              Modèle de document fourni à titre indicatif — à faire relire par un
              conseil juridique avant toute mise en production réelle.
            </p>
          </div>

          <p className="mt-8 text-body text-neutral-80">
            Conformément à notre{" "}
            <Link
              href="/dpa"
              className="text-neutral-90 underline underline-offset-4 hover:text-purple-60"
            >
              accord de traitement des données
            </Link>
            , nous faisons appel aux sous-traitants ultérieurs suivants. Toute
            évolution de cette liste fait l'objet d'une information préalable.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-neutral-20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-5 border-b border-neutral-20">
                  <th className="px-4 py-3 text-eyebrow uppercase text-neutral-80 font-medium">
                    Sous-traitant
                  </th>
                  <th className="px-4 py-3 text-eyebrow uppercase text-neutral-80 font-medium">
                    Rôle
                  </th>
                  <th className="px-4 py-3 text-eyebrow uppercase text-neutral-80 font-medium">
                    Localisation
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((s) => (
                  <tr
                    key={s.name}
                    className="border-b border-neutral-20 last:border-b-0"
                  >
                    <td className="px-4 py-4 text-body text-neutral-90 font-medium align-top">
                      {s.name}
                    </td>
                    <td className="px-4 py-4 text-body text-neutral-80 align-top">
                      {s.purpose}
                    </td>
                    <td className="px-4 py-4 text-body text-neutral-80 align-top whitespace-nowrap">
                      {s.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-small text-neutral-60">
            Dernière mise à jour · 24 août 2026 · Une question ?{" "}
            <Link
              href="/contact"
              className="text-neutral-90 underline underline-offset-4 hover:text-purple-60"
            >
              Contacte-nous
            </Link>
            .
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
