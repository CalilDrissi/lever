import type { Metadata } from "next";
import { LocaleProvider } from "@/components/locale-provider";

export const metadata: Metadata = {
  title: "Virtus Lever — Transforme ton inbox en 1 priorité claire par jour.",
  description:
    "Cockpit de productivité pour l'email. L'algorithme Domino trouve l'email à plus haut levier — 10 min/jour, -30% de backlog.",
  alternates: {
    canonical: "/fr",
  },
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider locale="fr">{children}</LocaleProvider>;
}
