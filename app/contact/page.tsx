import type { Metadata } from "next";
import { Mail, MessageSquare, Shield } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Contact — Virtus Lever",
  description:
    "A question, a demo, a partnership? Write to the Virtus Lever team. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const domain = copy.en.brand.domain;

  const channels = [
    {
      icon: Mail,
      title: "Write to us",
      body: `hello@${domain}`,
      href: `mailto:hello@${domain}`,
    },
    {
      icon: MessageSquare,
      title: "Support & demo",
      body: "We'll show you the cockpit in 15 minutes.",
    },
    {
      icon: Shield,
      title: "Security & privacy",
      body: `privacy@${domain}`,
      href: `mailto:privacy@${domain}`,
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your inbox."
        lead="A question, a demo, a security topic or a partnership — write to us. We reply fast, and by a human."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Channels */}
          <div className="lg:col-span-5 lg:border-l lg:border-neutral-20 lg:pl-12">
            <p className="text-eyebrow uppercase text-neutral-80 mb-6">
              Other channels
            </p>
            <ul className="space-y-8">
              {channels.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <div className="flex gap-4">
                    <span className="grid place-items-center size-10 shrink-0 rounded-sm bg-neutral-5 border border-neutral-20 text-neutral-90">
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-h6 font-display tracking-tight text-neutral-90">
                        {c.title}
                      </p>
                      <p className="mt-1 text-body text-neutral-80">{c.body}</p>
                    </div>
                  </div>
                );
                return (
                  <li key={c.title}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="block transition-opacity hover:opacity-80"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 pt-8 border-t border-neutral-20">
              <p className="text-small text-neutral-60">
                Virtus Lever — built in France 🇫🇷. Data hosted in Europe.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
