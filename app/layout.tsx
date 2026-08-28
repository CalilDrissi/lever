import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/components/currency-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { LocaleSync } from "@/components/locale-sync";

export const metadata: Metadata = {
  title: "Virtus Lever — Turn your inbox into one clear priority a day.",
  description:
    "Email productivity cockpit. The Domino algorithm finds the highest-leverage email — 10 min/day, −30% backlog.",
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
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-90 antialiased">
        <LocaleProvider locale="en">
          <CurrencyProvider>
            <LocaleSync />
            {children}
          </CurrencyProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
