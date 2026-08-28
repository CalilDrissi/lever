import type { Metadata } from "next";
import { PageShell, PageHeader, LegalDoc, type LegalSection } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service — Virtus Lever",
  description:
    "Terms of service for the Virtus Lever product.",
  alternates: { canonical: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Purpose",
    paragraphs: [
      "These Terms of Service ('Terms') govern access to and use of the Virtus Lever service. By creating an account, you accept these Terms.",
    ],
  },
  {
    heading: "Access to the service",
    paragraphs: [
      "Virtus Lever is a subscription-based SaaS service. Access is personal and non-transferable. You must be at least 18 years old to create an account.",
    ],
  },
  {
    heading: "Your obligations",
    bullets: [
      "Provide accurate information when registering.",
      "Keep your credentials confidential.",
      "Not share your account with third parties.",
      "Use the service in compliance with applicable laws.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The service, its algorithms, interfaces, and content are the exclusive property of Virtus Lever. No licence is granted to reproduce, distribute, or create derivative works.",
    ],
  },
  {
    heading: "Availability",
    paragraphs: [
      "We aim for 99.9% uptime. Planned maintenance is notified 48 hours in advance. We exclude liability for interruptions due to causes beyond our control.",
    ],
  },
  {
    heading: "Subscription and billing",
    paragraphs: [
      "Subscriptions are billed monthly or annually. You can cancel at any time; your access continues until the end of the period paid for. No partial refunds.",
    ],
  },
  {
    heading: "Termination",
    paragraphs: [
      "We reserve the right to suspend or terminate an account that materially breaches these Terms, after notice where possible.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These Terms are governed by French law. Any dispute shall be subject to the exclusive jurisdiction of the Paris courts.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        lead="Last updated: January 2026."
      />
      <LegalDoc updated="January 2026" sections={SECTIONS} locale="en" />
    </PageShell>
  );
}
