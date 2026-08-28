import type { Metadata } from "next";
import { PageShell, PageHeader, LegalDoc, type LegalSection } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA) — Virtus Lever",
  description:
    "Virtus Lever's Data Processing Agreement, GDPR-compliant under Article 28.",
  alternates: { canonical: "/dpa" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Framework and roles",
    paragraphs: [
      "This Data Processing Agreement ('DPA') forms part of the contract between the customer (data controller) and Virtus Lever (data processor), within the meaning of Article 28 of the GDPR.",
    ],
  },
  {
    heading: "Subject of processing",
    paragraphs: [
      "Virtus Lever processes personal data solely on behalf of the customer, for the purpose of providing the email prioritisation service: analysis, scoring, and presentation of the daily priority.",
    ],
  },
  {
    heading: "Duration",
    paragraphs: [
      "Processing lasts for the duration of the contractual relationship. Upon termination, data is deleted or returned at the customer's choice, within 24 hours.",
    ],
  },
  {
    heading: "Processor obligations",
    bullets: [
      "Process data only on documented instructions from the customer.",
      "Ensure confidentiality of persons authorised to process the data.",
      "Implement appropriate technical and organisational security measures.",
      "Assist the customer in responding to data subject rights requests.",
      "Notify any data breach without undue delay.",
    ],
  },
  {
    heading: "Subprocessors",
    paragraphs: [
      "The customer authorises the use of subprocessors listed on the Subprocessors page. Any new addition will be communicated in advance, giving the customer the opportunity to object.",
    ],
  },
  {
    heading: "Transfers outside the EU",
    paragraphs: [
      "Data is hosted within the European Union. No transfer outside the EU is made without appropriate safeguards (standard contractual clauses).",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "AES-256 encryption at rest, TLS 1.3 in transit, access compartmentalisation and logging. Measures are reviewed regularly.",
    ],
  },
  {
    heading: "Audit",
    paragraphs: [
      "Virtus Lever makes available the information necessary to demonstrate compliance with Article 28 and submits to reasonable audits, with reasonable notice.",
    ],
  },
];

export default function DpaPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Data Processing Agreement"
        lead="The DPA governing the processing of your data, compliant with Article 28 of the GDPR."
      />
      <LegalDoc updated="24 August 2026" sections={SECTIONS} locale="en" />
    </PageShell>
  );
}
