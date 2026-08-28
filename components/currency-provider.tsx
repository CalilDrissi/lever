"use client";

import * as React from "react";
import { type Currency, detectCurrency } from "@/lib/currency";

type Ctx = { currency: Currency; setCurrency: (c: Currency) => void };
const CurrencyContext = React.createContext<Ctx>({ currency: "EUR", setCurrency: () => {} });

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<Currency>("EUR");

  React.useEffect(() => {
    const cached = localStorage.getItem("vl-currency") as Currency | null;
    if (cached && ["MAD", "EUR", "USD"].includes(cached)) {
      setCurrencyState(cached);
      return;
    }
    // Use the Cloudflare Pages Function that reads CF-IPCountry — no third-party,
    // no rate limits, always accurate on the deployed edge.
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d) => {
        const detected = detectCurrency(d.country_code || "");
        setCurrencyState(detected);
        localStorage.setItem("vl-currency", detected);
      })
      .catch(() => {
        // Local dev or fetch failure — stay on EUR default.
      });
  }, []);

  const setCurrency = React.useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("vl-currency", c);
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return React.useContext(CurrencyContext);
}
