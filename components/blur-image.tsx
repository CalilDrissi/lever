"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Derive a tiny, low-quality version of an image URL to use as a blurred
 * placeholder (blur-up). Works for Contentful and Pexels CDN URLs; returns
 * null for unknown hosts (a shimmer is shown instead).
 */
function lowResUrl(src: string): string | null {
  if (!src) return null;
  if (src.includes("images.ctfassets.net")) {
    return src + (src.includes("?") ? "&" : "?") + "w=32&q=20";
  }
  if (src.includes("images.pexels.com")) {
    const base = src.split("?")[0];
    return `${base}?auto=compress&cs=tinysrgb&w=32`;
  }
  return null;
}

/**
 * BlurImage — lazy-loaded <img> with a blur-up load effect.
 *
 * A tiny blurred placeholder (or a shimmer, if none can be derived) sits
 * behind the real image, which is native-lazy-loaded and fades from
 * blurred→sharp once decoded. Static-export friendly (plain <img>).
 *
 * `className`        styles the real image (object-fit, sizing, rounding).
 * `wrapperClassName` styles the wrapper box (aspect ratio, radius, position).
 */
export function BlurImage({
  src,
  alt,
  className,
  wrapperClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}) {
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef<HTMLImageElement | null>(null);
  const low = lowResUrl(src);

  // If the image is already cached/complete before hydration, skip the fade.
  React.useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <span className={cn("relative block overflow-hidden bg-neutral-10", wrapperClassName)}>
      {low ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={low}
          alt=""
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover scale-110 blur-2xl transition-opacity duration-700 ease-soft",
            loaded ? "opacity-0" : "opacity-100"
          )}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn("absolute inset-0 bg-neutral-10", !loaded && "animate-pulse")}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "relative transition-[opacity,filter,transform] duration-700 ease-soft",
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.02]",
          className
        )}
      />
    </span>
  );
}
