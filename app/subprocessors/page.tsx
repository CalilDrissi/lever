import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader, Section } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Subprocessors — Virtus Lever",
  description:
    "The list of Virtus Lever subprocessors and their role in data processing.",
  alternates: { canonical: "/subprocessors" },
};

type Subprocessor = {
  name: string;
  purpose: string;
  location: string;
};

const SUBPROCESSORS: Subprocessor[] = [
  { name: "Cloudflare", purpose: "Website hosting and CDN", location: "EU / global" },
  { name: "EU cloud provider", purpose: "Application infrastructure and database", location: "European Union" },
  { name: "Transactional email provider", purpose: "Sending service emails", location: "European Union" },
  { name: "Privacy-respecting analytics", purpose: "Aggregated audience measurement", location: "European Union" },
  { name: "Support platform", purpose: "Customer request management", location: "European Union" },
];

export default function SubprocessorsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Subprocessors"
        lead="The technical providers that help us run the service — and what they process."
      />

      <Section>
        <div className="max-w-[70ch]">
          <div className="rounded-sm border border-neutral-20 bg-neutral-10 px-4 py-3">
            <p className="text-small text-neutral-80">
              Template document provided for guidance — to be reviewed by legal
              counsel before any real production use.
            </p>
          </div>

          <p className="mt-8 text-body text-neutral-80">
            In accordance with our{" "}
            <Link
              href="/dpa"
              className="text-neutral-90 underline underline-offset-4 hover:text-purple-60"
            >
              Data Processing Agreement
            </Link>
            , we engage the following subprocessors. Any change to this list
            will be communicated in advance.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-neutral-20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-5 border-b border-neutral-20">
                  <th className="px-4 py-3 text-eyebrow uppercase text-neutral-80 font-medium">
                    Subprocessor
                  </th>
                  <th className="px-4 py-3 text-eyebrow uppercase text-neutral-80 font-medium">
                    Role
                  </th>
                  <th className="px-4 py-3 text-eyebrow uppercase text-neutral-80 font-medium">
                    Location
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
            Last updated · 24 August 2026 · Questions?{" "}
            <Link
              href="/contact"
              className="text-neutral-90 underline underline-offset-4 hover:text-purple-60"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
