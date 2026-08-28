import type { Metadata } from "next";
import { PageShell, PageHeader, LegalDoc, type LegalSection } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Accord de traitement des données (DPA) — Virtus Lever",
  description:
    "L'accord de traitement des données (Data Processing Agreement) de Virtus Lever, conforme au RGPD.",
  alternates: { canonical: "/fr/dpa" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Cadre et rôles",
    paragraphs: [
      "Le présent accord de traitement des données (« DPA ») fait partie du contrat entre le client (responsable de traitement) et Virtus Lever (sous-traitant), au sens de l'article 28 du RGPD.",
    ],
  },
  {
    heading: "Objet du traitement",
    paragraphs: [
      "Virtus Lever traite les données personnelles pour le seul compte du client, aux fins de fournir le service de priorisation d'emails : analyse, scoring et présentation de la priorité quotidienne.",
    ],
  },
  {
    heading: "Durée",
    paragraphs: [
      "Le traitement dure le temps de la relation contractuelle. À son terme, les données sont supprimées ou restituées selon le choix du client, sous 24 heures.",
    ],
  },
  {
    heading: "Obligations du sous-traitant",
    bullets: [
      "Traiter les données uniquement sur instruction documentée du client.",
      "Garantir la confidentialité des personnes autorisées à traiter les données.",
      "Mettre en œuvre les mesures de sécurité techniques et organisationnelles appropriées.",
      "Assister le client pour répondre aux demandes d'exercice des droits des personnes.",
      "Notifier toute violation de données dans les meilleurs délais.",
    ],
  },
  {
    heading: "Sous-traitants ultérieurs",
    paragraphs: [
      "Le client autorise le recours aux sous-traitants ultérieurs listés sur la page Sous-traitants. Toute nouvelle addition fait l'objet d'une information préalable, permettant au client de s'y opposer.",
    ],
  },
  {
    heading: "Transferts hors UE",
    paragraphs: [
      "Les données sont hébergées dans l'Union européenne. Aucun transfert hors UE n'est réalisé sans garanties appropriées (clauses contractuelles types).",
    ],
  },
  {
    heading: "Sécurité",
    paragraphs: [
      "Chiffrement AES-256 au repos, TLS 1.3 en transit, cloisonnement des accès et journalisation. Les mesures sont revues régulièrement.",
    ],
  },
  {
    heading: "Audit",
    paragraphs: [
      "Virtus Lever met à disposition les informations nécessaires pour démontrer le respect de l'article 28 et se soumet à des audits raisonnables, sous préavis.",
    ],
  },
];

export default function DpaPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Légal"
        title="Accord de traitement des données"
        lead="Le DPA qui encadre le traitement de tes données, conforme à l'article 28 du RGPD."
      />
      <LegalDoc updated="24 août 2026" sections={SECTIONS} />
    </PageShell>
  );
}
