import type { Metadata } from "next";
import { PageShell, PageHeader, LegalDoc, type LegalSection } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — Virtus Lever",
  description:
    "How Virtus Lever collects, uses, and protects your personal data. European hosting, GDPR compliant.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Data controller",
    paragraphs: [
      "Virtus Lever ('we') is the data controller for personal data collected via the service and the website virtuslever.com. For any question, write to privacy@virtuslever.com.",
    ],
  },
  {
    heading: "Data we collect",
    paragraphs: [
      "We collect only the data strictly necessary to operate the service:",
    ],
    bullets: [
      "Account data: name, email address, encrypted password.",
      "Inbox data: metadata and content needed to calculate the leverage score, via a read-only OAuth connection.",
      "Usage data: technical logs, preferences, aggregated statistics.",
    ],
  },
  {
    heading: "Purposes and legal bases",
    paragraphs: [
      "Your data is processed to provide the service (contract performance), improve the product (legitimate interest), and fulfil our legal obligations. No data is used to train an external model.",
    ],
  },
  {
    heading: "Hosting and retention",
    paragraphs: [
      "Data is hosted within the European Union. It is retained for the duration of your use of the service, then deleted within 24 hours of account closure.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You have the right to access, rectify, erase, restrict, and port your data, as well as to object to processing. You can exercise these rights by writing to privacy@virtuslever.com. You may also lodge a complaint with the supervisory authority in your country (CNIL in France).",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use strictly necessary technical cookies only. No advertising or tracking cookies. No third-party analytics without your consent.",
    ],
  },
  {
    heading: "Updates to this policy",
    paragraphs: [
      "We may update this policy. Any significant change will be notified by email or in-app notification at least 15 days before taking effect.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lead="Last updated: January 2026."
      />
      <LegalDoc updated="January 2026" sections={SECTIONS} locale="en" />
    </PageShell>
  );
}
