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
      // Color tokens — Superhuman's design-system scales.
      // Pulled directly from superhuman.com's CSS custom properties:
      //   neutral, purple, mulberry, green, red, blue, sky, orange.
      // White is kept as the page-background default; purple-60 is the
      // brand accent; mulberry is the deep-tone for inverted surfaces.
      // -------------------------------------------------------------
      colors: {
        neutral: {
          0:   "#fcfaf7",
          5:   "#f7f5f2",
          10:  "#f2f0eb",
          20:  "#dedbd5",
          30:  "#bfbcb6",
          40:  "#8d8a86",
          60:  "#73716d",
          80:  "#474543",
          90:  "#292827",
          95:  "#1f1e1d",
          100: "#141413",
        },
        purple: {
          0:   "#f7f5ff",
          10:  "#e8e0ff",
          20:  "#d4c7ff",
          30:  "#bea1f5",
          40:  "#9e7be0",
          50:  "#8861ca",
          60:  "#714cb6",
          80:  "#533192",
          90:  "#3f256f",
          100: "#281647",
        },
        mulberry: {
          0:   "#fff2fa",
          10:  "#ffdcf3",
          20:  "#f6aadd",
          30:  "#da7cb4",
          40:  "#bf6193",
          60:  "#8d3d62",
          80:  "#792d4b",
          90:  "#602639",
          100: "#421d24",
        },
        green: {
          0:   "#f4fdfa",
          10:  "#d5f7eb",
          20:  "#98ebcd",
          30:  "#3ac7a1",
          40:  "#26a28b",
          60:  "#148072",
          80:  "#005c54",
          90:  "#0c4243",
          100: "#17261f",
        },
        red: {
          0:   "#fff0f0",
          10:  "#fedbdb",
          20:  "#ffa8aa",
          30:  "#ff565e",
          40:  "#f72a42",
          60:  "#cd0037",
          80:  "#9f182d",
          90:  "#860628",
          100: "#5b051c",
        },
        blue: {
          0:   "#eff8fd",
          10:  "#daedfb",
          20:  "#bbdff7",
          30:  "#8dcaf2",
          40:  "#4198d2",
          60:  "#1173a8",
          80:  "#0c5683",
          90:  "#0a476d",
          100: "#16293d",
        },
        sky: {
          30: "#b2cffe",
          40: "#62abff",
          60: "#0163c6",
        },
        orange: {
          0:   "#fff3e1",
          10:  "#ffe9c9",
          20:  "#fdc298",
          30:  "#ff9d56",
          40:  "#f18333",
          60:  "#c25000",
          80:  "#a64500",
          90:  "#812d00",
          100: "#611a00",
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
        // Headings ≥ h4 use clamp() so they scale fluidly across viewports.
        // Lower bounds tuned so the page reads cleanly on a 360-px viewport
        // without long words breaking out of the column.
        eyebrow: ["12px", { lineHeight: "1.2", letterSpacing: "0.14em", fontWeight: "500" }],
        small:   ["14px", { lineHeight: "1.5", letterSpacing: "0",       fontWeight: "400" }],
        body:    ["17px", { lineHeight: "1.6", letterSpacing: "0",       fontWeight: "400" }],
        lead:    ["clamp(17px, 1.5vw + 12px, 20px)", { lineHeight: "1.55", letterSpacing: "-0.005em", fontWeight: "400" }],
        h6:      ["clamp(16px, 1.2vw + 11px, 18px)", { lineHeight: "1.4", letterSpacing: "-0.005em", fontWeight: "600" }],
        h5:      ["clamp(18px, 1.3vw + 13px, 20px)", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4:      ["clamp(20px, 1.8vw + 14px, 24px)", { lineHeight: "1.3",  letterSpacing: "-0.012em", fontWeight: "600" }],
        h3:      ["clamp(24px, 2.6vw + 14px, 32px)", { lineHeight: "1.2",  letterSpacing: "-0.018em", fontWeight: "600" }],
        h2:      ["clamp(30px, 3.5vw + 14px, 44px)", { lineHeight: "1.08", letterSpacing: "-0.022em", fontWeight: "600" }],
        // Hero H1 uses fluid clamp; min lowered to 40 so it fits a 360-px
        // viewport with the 18ch container.
        h1:      ["clamp(40px, 7vw, 88px)", { lineHeight: "1.02", letterSpacing: "-0.028em", fontWeight: "600" }],
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
        // shadow-hairline — single hairline border feel (neutral-90 @ 6%)
        hairline: "0 0 0 1px rgba(41,40,39,0.06)",
        // shadow-card — barely-there elevation (neutral-90 @ 4 / 18%)
        card: "0 1px 0 rgba(41,40,39,0.04), 0 8px 24px -16px rgba(41,40,39,0.18)",
        // shadow-focus — focus ring (purple-60 @ 22%)
        focus: "0 0 0 3px rgba(113,76,182,0.22)",
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
