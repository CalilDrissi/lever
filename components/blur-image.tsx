"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * BlurImage — lazy-loaded <img> with a visible loading effect.
 *
 * While the image loads, an animated shimmer sweeps across a skeleton
 * placeholder (always instant — no network placeholder that could arrive late).
 * Once the image decodes, the shimmer fades out and the image fades in from a
 * soft blur to sharp. Static-export friendly (plain <img>).
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

  // If cached/complete before hydration, skip straight to loaded.
  React.useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <span className={cn("relative block overflow-hidden bg-neutral-10", wrapperClassName)}>
      {!loaded ? (
        <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <span className="img-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent animate-[shimmer_1.4s_ease-in-out_infinite]" />
        </span>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "relative transition-[opacity,filter,transform] duration-700 ease-soft",
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.03]",
          className
        )}
      />
    </span>
  );
}
