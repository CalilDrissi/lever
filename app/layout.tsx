import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtus Lever — Transforme ton inbox en 1 priorité claire par jour.",
  description:
    "Cockpit de productivité pour l'email. L'algorithme Domino trouve l'email à plus haut levier — 10 min/jour, -30% de backlog.",
  metadataBase: new URL("https://virtuslever.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
