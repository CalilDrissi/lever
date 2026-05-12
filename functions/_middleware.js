/**
 * Cloudflare Pages middleware — canonical-host redirect.
 *
 * Every request that lands on a `*.pages.dev` host (the project's
 * production URL or any preview deployment URL) gets a 301 redirect to
 * `virtuslever.com`. After the custom domain is live, the only hostname
 * a visitor or search bot can reach the site through is the canonical
 * one — the `.pages.dev` URLs return a redirect and never serve HTML.
 *
 * Localhost / dev hosts pass through untouched.
 */

const CANONICAL_HOST = "virtuslever.com";

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const host = url.hostname;

  // Already on the canonical host — nothing to do.
  if (host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`) {
    return next();
  }

  // Catch every Cloudflare Pages-issued host (project + preview deploys).
  if (host.endsWith(".pages.dev")) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }

  return next();
}
