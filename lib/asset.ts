/**
 * Prefix a public-folder path with the configured basePath.
 *
 * Use this for asset references that bypass next/image / next/link —
 * e.g. plain `<img>`, `<source>`, `<video poster>`, CSS background-image
 * URLs in inline styles. next/image and next/link already prepend the
 * basePath automatically.
 *
 *   <source src={asset('/hero-bg.mp4')} type="video/mp4" />
 *
 * In local dev, NEXT_PUBLIC_BASE_PATH is empty so this is a no-op.
 * In the GitHub Pages build it becomes "/lever".
 */
export function asset(path: string): string {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // Guard against double slashes if a caller passed "/" themselves.
  if (path.startsWith("/")) return `${prefix}${path}`;
  return `${prefix}/${path}`;
}
