"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Countries where we default to the French locale
const FR_COUNTRIES = new Set([
  "FR", // France
  "MA", // Morocco
  "BE", // Belgium
  "LU", // Luxembourg
  "MC", // Monaco
  "CH", // Switzerland
  "SN", // Senegal
  "CI", // Côte d'Ivoire
  "CM", // Cameroon
  "DZ", // Algeria
  "TN", // Tunisia
  "CD", // DR Congo
  "MG", // Madagascar
  "BF", // Burkina Faso
  "ML", // Mali
  "NE", // Niger
  "GN", // Guinea
  "BJ", // Benin
  "HT", // Haiti
]);

/**
 * Runs once on mount (client-only).
 *
 * Priority order:
 *   1. If localStorage["vl-locale"] = "fr" and URL is English → redirect to /fr/…
 *   2. If localStorage["vl-locale"] is set → respect it, do nothing
 *   3. No preference yet → call /api/geo → if Francophone country, save "fr" and redirect
 *   4. Otherwise save "en" and do nothing
 *
 * Never redirects away from an already-French URL so that explicit /fr/
 * links (e.g. from search engines) always work regardless of preference.
 */
export function LocaleSync() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isFrPath = pathname.startsWith("/fr");
    const saved = localStorage.getItem("vl-locale") as "fr" | "en" | null;

    if (saved === "fr" && !isFrPath) {
      // Saved preference is FR but landed on an EN page → redirect
      const frPath = "/fr" + (pathname === "/" ? "" : pathname);
      router.replace(frPath);
      return;
    }

    if (saved !== null) {
      // Explicit preference exists and matches current locale → nothing to do
      return;
    }

    // No preference yet — detect from the geo endpoint
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d) => {
        const cc = (d.country_code || "").toUpperCase();
        if (FR_COUNTRIES.has(cc) && !isFrPath) {
          localStorage.setItem("vl-locale", "fr");
          const frPath = "/fr" + (pathname === "/" ? "" : pathname);
          router.replace(frPath);
        } else {
          // Non-Francophone, or already on /fr/ — save preference and stay
          localStorage.setItem("vl-locale", isFrPath ? "fr" : "en");
        }
      })
      .catch(() => {
        // Geo unavailable (local dev, network error) — default EN, no redirect
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
