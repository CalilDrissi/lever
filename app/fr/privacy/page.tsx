import type { Metadata } from "next";
import { PageShell, PageHeader, LegalDoc, type LegalSection } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Virtus Lever",
  description:
    "Comment Virtus Lever collecte, utilise et protège tes données personnelles. Hébergement européen, RGPD.",
  alternates: { canonical: "/fr/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Responsable du traitement",
    paragraphs: [
      "Virtus Lever (« nous ») est responsable du traitement des données personnelles collectées via le service et le site virtuslever.com. Pour toute question, écris à privacy@virtuslever.com.",
    ],
  },
  {
    heading: "Données que nous collectons",
    paragraphs: [
      "Nous collectons les données strictement nécessaires au fonctionnement du service :",
    ],
    bullets: [
      "Données de compte : nom, adresse email, mot de passe chiffré.",
      "Données de messagerie : métadonnées et contenu nécessaires au calcul du score de levier, via une connexion OAuth en lecture seule.",
      "Données d'usage : logs techniques, préférences, statistiques agrégées.",
    ],
  },
  {
    heading: "Finalités et bases légales",
    paragraphs: [
      "Tes données sont traitées pour fournir le service (exécution du contrat), améliorer le produit (intérêt légitime) et respecter nos obligations légales. Aucune donnée n'est utilisée pour entraîner un modèle externe.",
    ],
  },
  {
    heading: "Hébergement et durée de conservation",
    paragraphs: [
      "Les données sont hébergées au sein de l'Union européenne. Elles sont conservées le temps de ton utilisation du service, puis supprimées sous 24 heures après la fermeture de ton compte.",
    ],
  },
  {
    heading: "Partage avec des tiers",
    paragraphs: [
      "Nous ne vendons jamais tes données. Nous faisons appel à des sous-traitants techniques (hébergement, envoi d'emails) listés sur notre page Sous-traitants, encadrés par des accords conformes au RGPD.",
    ],
  },
  {
    heading: "Tes droits",
    paragraphs: [
      "Conformément au RGPD, tu disposes d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition. Tu peux exporter ou supprimer l'ensemble de tes données en une action depuis ton compte, ou nous écrire à privacy@virtuslever.com.",
    ],
  },
  {
    heading: "Sécurité",
    paragraphs: [
      "Chiffrement AES-256 au repos, TLS 1.3 en transit, accès restreints et journalisés. La sécurité est traitée comme une exigence, pas une option.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Le site utilise des cookies strictement nécessaires et, avec ton consentement, des cookies de mesure d'audience. Tu peux ajuster tes préférences à tout moment.",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Légal"
        title="Politique de confidentialité"
        lead="Ce que nous collectons, pourquoi, et comment tu gardes le contrôle."
      />
      <LegalDoc
        updated="24 août 2026"
        intro="Chez Virtus Lever, tes emails restent les tiens. Cette politique explique en clair comment nous traitons tes données personnelles."
        sections={SECTIONS}
      />
    </PageShell>
  );
}
