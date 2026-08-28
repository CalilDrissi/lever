export type Currency = "MAD" | "EUR" | "USD";

export const CURRENCY_LABEL: Record<Currency, string> = {
  MAD: "MAD",
  EUR: "EUR",
  USD: "USD",
};

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  MAD: "DH",
  EUR: "€",
  USD: "$",
};

// Prefix the symbol before the amount (USD style) or suffix (EUR / MAD style)
export const CURRENCY_PREFIX: Record<Currency, boolean> = {
  MAD: false,
  EUR: false,
  USD: true,
};

// EU27 + EEA (IS/NO/LI) + CH + GB → show EUR
const EU_COUNTRIES = new Set([
  "AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GR","HR",
  "HU","IE","IT","LT","LU","LV","MT","NL","PL","PT","RO","SE","SI",
  "SK","IS","LI","NO","CH","GB",
]);

export function detectCurrency(countryCode: string): Currency {
  const cc = (countryCode || "").toUpperCase();
  if (cc === "MA") return "MAD";
  if (EU_COUNTRIES.has(cc)) return "EUR";
  return "USD";
}

/** Monthly prices per plan per currency (null = custom / contact sales). */
export const MONTHLY_PRICES: Record<string, Record<Currency, number | null>> = {
  free:      { MAD: 0,    EUR: 0,    USD: 0    },
  founding:  { MAD: 59,   EUR: 7,    USD: 8    },
  pro:       { MAD: 99,   EUR: 12,   USD: 13   },
  power:     { MAD: 149,  EUR: 19,   USD: 21   },
  enterprise:{ MAD: null, EUR: null, USD: null  },
};

/** Annual prices (monthly equivalent) — null means plan is monthly-only or custom. */
export const ANNUAL_PRICES: Record<string, Record<Currency, number | null>> = {
  free:      { MAD: 0,    EUR: 0,    USD: 0    },
  founding:  { MAD: null, EUR: null, USD: null  }, // monthly-only
  pro:       { MAD: 79,   EUR: 9,    USD: 10   },
  power:     { MAD: 129,  EUR: 15,   USD: 17   },
  enterprise:{ MAD: null, EUR: null, USD: null  },
};

export function annualSavings(plan: string, currency: Currency): number | null {
  const mo = MONTHLY_PRICES[plan]?.[currency];
  const an = ANNUAL_PRICES[plan]?.[currency];
  if (mo == null || an == null) return null;
  return (mo - an) * 12;
}

/** Feature matrix: value is true | false | "basique" | "limité" | "avancé" | "custom" | a string. */
export type FeatureValue = boolean | "basique" | "limité" | "avancé" | "custom" | string;

export type FeatureRow = {
  label: string;
  labelEn: string;
  values: Record<"free" | "founding" | "pro" | "power" | "enterprise", FeatureValue>;
};

export const FEATURE_MATRIX: FeatureRow[] = [
  {
    label: "Boîtes mail",       labelEn: "Mailboxes",
    values: { free: "1", founding: "3", pro: "3", power: "10", enterprise: "custom" },
  },
  {
    label: "Actions IA / jour", labelEn: "AI actions / day",
    values: { free: "5", founding: "50", pro: "50", power: "500", enterprise: "custom" },
  },
  {
    label: "Inbox intelligence", labelEn: "Inbox intelligence",
    values: { free: "basique", founding: true, pro: true, power: true, enterprise: true },
  },
  {
    label: "Tâches / GTD",      labelEn: "Tasks / GTD",
    values: { free: "basique", founding: true, pro: true, power: true, enterprise: true },
  },
  {
    label: "Weekly summary",    labelEn: "Weekly summary",
    values: { free: "basique", founding: true, pro: true, power: "avancé", enterprise: "avancé" },
  },
  {
    label: "Auto-scheduling",   labelEn: "Auto-scheduling",
    values: { free: false, founding: true, pro: true, power: true, enterprise: true },
  },
  {
    label: "Memory",            labelEn: "Memory",
    values: { free: false, founding: true, pro: true, power: true, enterprise: true },
  },
  {
    label: "RAG / Knowledge Base", labelEn: "RAG / Knowledge Base",
    values: { free: false, founding: "limité", pro: "limité", power: "avancé", enterprise: "custom" },
  },
  {
    label: "Pareto / Analytics avancée", labelEn: "Pareto / Advanced analytics",
    values: { free: false, founding: false, pro: false, power: true, enterprise: true },
  },
  {
    label: "Domino",            labelEn: "Domino",
    values: { free: false, founding: false, pro: false, power: true, enterprise: true },
  },
  {
    label: "Teams / Sièges",   labelEn: "Teams / Seats",
    values: { free: false, founding: false, pro: false, power: false, enterprise: true },
  },
];

/** Translate a French feature cell value to English. */
export function localizeFeatureValue(value: FeatureValue, locale: "fr" | "en"): FeatureValue {
  if (locale === "fr" || typeof value !== "string") return value;
  const map: Record<string, string> = { basique: "basic", limité: "limited", avancé: "advanced" };
  return map[value] ?? value;
}
