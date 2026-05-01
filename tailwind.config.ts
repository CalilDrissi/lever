import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      // -------------------------------------------------------------
      // Color tokens — Superhuman-adjacent: cream, charcoal, parchment.
      // The deep muted purple is reserved for ONE accent in the hero.
      // -------------------------------------------------------------
      colors: {
        cream: {
          DEFAULT: "#E9E5DD", // bg-cream  — page background
          50: "#F4F1EB",      // bg-cream-50 — raised surface
          100: "#EFEBE3",     // bg-cream-100 — card surface
        },
        ink: {
          DEFAULT: "#292827", // text-ink  — primary type
          70: "#5B5957",      // text-ink-70 — secondary type
          50: "#8A8884",      // text-ink-50 — muted / hint
          30: "#B8B5AE",      // text-ink-30 — subtle / divider-strong
        },
        parchment: {
          DEFAULT: "#D9D2C5", // border-parchment — default border
          dark: "#C9C1B1",    // border-parchment-dark — emphasized border
        },
        // The single hero accent. Use sparingly.
        plum: {
          DEFAULT: "#4B3A5A", // bg-plum / text-plum — hero accent
          ink: "#2E2438",     // bg-plum-ink — inverted bg / charcoal-purple
        },
        signal: {
          // For the Domino du jour score badge.
          DEFAULT: "#3F6B4A", // text-signal — score / "good" indicator
          soft: "#E1E8DC",    // bg-signal-soft — score chip background
        },
      },

      // -------------------------------------------------------------
      // Typography — condensed display sans for headlines, neutral body.
      // -------------------------------------------------------------
      fontFamily: {
        display: [
          "InterDisplay",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }]
        eyebrow: ["12px", { lineHeight: "1.2", letterSpacing: "0.14em", fontWeight: "500" }],
        small:   ["14px", { lineHeight: "1.5", letterSpacing: "0",       fontWeight: "400" }],
        body:    ["17px", { lineHeight: "1.6", letterSpacing: "0",       fontWeight: "400" }],
        lead:    ["20px", { lineHeight: "1.55", letterSpacing: "-0.005em", fontWeight: "400" }],
        h6:      ["18px", { lineHeight: "1.4", letterSpacing: "-0.005em", fontWeight: "600" }],
        h5:      ["20px", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4:      ["24px", { lineHeight: "1.3",  letterSpacing: "-0.012em", fontWeight: "600" }],
        h3:      ["32px", { lineHeight: "1.2",  letterSpacing: "-0.018em", fontWeight: "600" }],
        h2:      ["44px", { lineHeight: "1.08", letterSpacing: "-0.022em", fontWeight: "600" }],
        // Hero H1 uses fluid clamp so it scales 48 → 88px.
        h1:      ["clamp(48px, 7vw, 88px)", { lineHeight: "1.02", letterSpacing: "-0.028em", fontWeight: "600" }],
      },

      // -------------------------------------------------------------
      // Spacing — 4px base. Adds named tokens beyond Tailwind defaults.
      // -------------------------------------------------------------
      spacing: {
        "section": "96px",       // py-section — major vertical rhythm
        "section-sm": "64px",    // py-section-sm — minor vertical rhythm
        "gutter": "32px",        // px-gutter — inner gutter
        "measure": "65ch",       // max-w-measure — readable measure
      },

      // -------------------------------------------------------------
      // Radii — 8 / 16 / 24.
      // -------------------------------------------------------------
      borderRadius: {
        sm: "8px",   // rounded-sm — inputs, chips
        DEFAULT: "16px", // rounded — cards, buttons-lg
        lg: "16px",  // rounded-lg — cards
        xl: "24px",  // rounded-xl — featured surfaces
        "2xl": "24px",
      },

      // -------------------------------------------------------------
      // Shadows — minimal. No shadow-2xl. No glow.
      // -------------------------------------------------------------
      boxShadow: {
        // shadow-hairline — single hairline border feel
        hairline: "0 0 0 1px rgba(41,40,39,0.06)",
        // shadow-card — barely-there elevation for the inbox mockup
        card: "0 1px 0 rgba(41,40,39,0.04), 0 8px 24px -16px rgba(41,40,39,0.18)",
        // shadow-focus — focus ring for buttons/inputs
        focus: "0 0 0 3px rgba(75,58,90,0.18)",
      },

      // -------------------------------------------------------------
      // Animations — subtle, no neon.
      // -------------------------------------------------------------
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
