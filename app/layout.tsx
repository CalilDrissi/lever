import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtus Lever — Transforme ton inbox en 1 priorité claire par jour.",
  description:
    "Cockpit de productivité pour l'email. L'algorithme Domino trouve l'email à plus haut levier — 10 min/jour, -30% de backlog.",
  metadataBase: new URL("https://virtuslever.com"),
  // Canonical URL — points every page back to virtuslever.com so search
  // engines never treat the *.pages.dev preview hosts as the source of
  // truth, even if those URLs were crawled before the redirect middleware
  // shipped. The Pages function in /functions/_middleware.js handles the
  // 301-redirect at the HTTP layer; this metadata is the in-page belt &
  // braces.
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-neutral-90 antialiased">
        {children}
      </body>
    </html>
  );
}
