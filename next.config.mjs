/** @type {import('next').NextConfig} */
//
// Static export for GitHub Pages.
//
// `output: "export"` writes the site to /out at build time so it can be
// hosted from any static-file server (no Node runtime needed).
//
// Base path:
//   When `GITHUB_PAGES=true` is set in CI, the site is published at
//   https://<user>.github.io/lever/, so every URL needs a `/lever` prefix.
//   In local dev (`npm run dev`) the env var is unset and the basePath
//   stays empty, so URLs work as before.
//
// Image optimizer is disabled (no Node runtime) — `next/image` falls back
// to a plain <img>. The `unoptimized` prop on individual <Image>s in the
// codebase becomes a no-op.

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/lever" : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  // Exposed to the client so manual asset references (HeroVideo source,
  // poster, etc.) can prefix paths with the helper in lib/asset.ts.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // GitHub Pages serves trailing-slash style URLs cleanly (each route
  // becomes its own folder/index.html).
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;
