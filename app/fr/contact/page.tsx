import type { Metadata } from "next";
import { Mail, MessageSquare, Shield } from "lucide-react";
import { PageShell, PageHeader, Section } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Contact — Virtus Lever",
  description:
    "Une question, une démo, un partenariat ? Écris à l'équipe Virtus Lever. Réponse sous un jour ouvré.",
  alternates: { canonical: "/fr/contact" },
};

export default function ContactPage() {
  const domain = copy.fr.brand.domain;

  const channels = [
    {
      icon: Mail,
      title: "Écris-nous",
      body: `hello@${domain}`,
      href: `mailto:hello@${domain}`,
    },
    {
      icon: MessageSquare,
      title: "Support & démo",
      body: "On te montre le cockpit en 15 minutes.",
    },
    {
      icon: Shield,
      title: "Sécurité & RGPD",
      body: `privacy@${domain}`,
      href: `mailto:privacy@${domain}`,
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de ton inbox."
        lead="Une question, une démo, un sujet sécurité ou un partenariat — écris-nous. On répond vite, et par un humain."
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
              Autres canaux
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
                Virtus Lever — fait en France 🇫🇷. Données hébergées en Europe.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
