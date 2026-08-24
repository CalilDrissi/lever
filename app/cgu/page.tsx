import type { Metadata } from "next";
import { PageShell, PageHeader, LegalDoc, type LegalSection } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — Virtus Lever",
  description:
    "Les conditions générales d'utilisation du service Virtus Lever.",
  alternates: { canonical: "/cgu" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Objet",
    paragraphs: [
      "Les présentes conditions générales d'utilisation (« CGU ») régissent l'accès et l'usage du service Virtus Lever. En créant un compte, tu acceptes ces conditions.",
    ],
  },
  {
    heading: "Accès au service",
    paragraphs: [
      "Le service est accessible via une connexion OAuth à ta boîte Gmail ou Outlook. Tu es responsable de la confidentialité de tes identifiants et des activités réalisées depuis ton compte.",
    ],
  },
  {
    heading: "Essai et abonnement",
    paragraphs: [
      "Le service propose un essai gratuit de 14 jours, sans carte bancaire. À l'issue de l'essai, l'accès complet nécessite un abonnement actif, facturé selon la grille tarifaire en vigueur. Tu peux résilier à tout moment.",
    ],
  },
  {
    heading: "Usage acceptable",
    paragraphs: [
      "Tu t'engages à ne pas détourner le service, tenter d'en compromettre la sécurité, ni l'utiliser à des fins illicites. Nous nous réservons le droit de suspendre un compte en cas de manquement.",
    ],
  },
  {
    heading: "Propriété intellectuelle",
    paragraphs: [
      "Le service, sa marque et son contenu restent la propriété de Virtus Lever. Tes données et le contenu de ta messagerie restent ta propriété exclusive.",
    ],
  },
  {
    heading: "Disponibilité et responsabilité",
    paragraphs: [
      "Nous mettons tout en œuvre pour assurer la continuité du service sans pouvoir en garantir une disponibilité ininterrompue. Notre responsabilité ne saurait être engagée pour les dommages indirects liés à l'usage du service.",
    ],
  },
  {
    heading: "Résiliation",
    paragraphs: [
      "Tu peux fermer ton compte à tout moment. Tes données sont alors supprimées sous 24 heures, conformément à notre politique de confidentialité.",
    ],
  },
  {
    heading: "Droit applicable",
    paragraphs: [
      "Les présentes CGU sont régies par le droit français. Tout litige relève de la compétence des tribunaux français, à défaut de résolution amiable.",
    ],
  },
];

export default function CguPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Légal"
        title="Conditions générales d'utilisation"
        lead="Les règles du jeu, écrites simplement."
      />
      <LegalDoc updated="24 août 2026" sections={SECTIONS} />
    </PageShell>
  );
}
