"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/copy";

const LocaleContext = createContext<Locale>("fr");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/**
 * Returns a function that prefixes any internal path with /fr when the
 * current locale is French. Pass any href and get back the locale-aware
 * equivalent. External URLs, anchors, and already-prefixed paths pass through.
 *
 * Usage: const lp = useLocalePath(); ... href={lp("/about")}
 */
export function useLocalePath(): (path: string) => string {
  const locale = useLocale();
  return (path: string): string => {
    if (locale === "en") return path;
    // External, mailto, anchor-only, already /fr → pass through
    if (
      !path.startsWith("/") ||
      path.startsWith("/fr") ||
      path.startsWith("//")
    )
      return path;
    if (path === "/") return "/fr";
    return "/fr" + path.replace(/\/$/, "");
  };
}
