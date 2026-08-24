/**
 * External auth destinations for the Virtus Lever app.
 *
 * The marketing site is a static export; account creation and login live on
 * the app host. Centralised here so every CTA points at one place — swap the
 * host when staging graduates to production.
 */
export const AUTH_LINKS = {
  login: "https://staging.virtuslever.com/login",
  signup: "https://staging.virtuslever.com/onboarding",
} as const;
