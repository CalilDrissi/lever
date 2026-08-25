"use client";

import * as React from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

/**
 * ArticleToc — table of contents. A sticky rail beside the centered column on
 * large screens (with scroll-spy highlighting), and a collapsible block inline
 * on smaller screens.
 */
export function ArticleToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = React.useState<string>(headings[0]?.id ?? "");

  React.useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <>
      {/* Desktop sticky rail */}
      <nav
        aria-label="Sommaire"
        className="hidden xl:block fixed top-32 left-8 w-56 max-h-[70vh] overflow-auto"
      >
        <p className="text-eyebrow uppercase text-neutral-60 mb-3">Sommaire</p>
        <ul className="border-l border-neutral-20">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "block -ml-px border-l pl-3 py-1 text-small transition-colors duration-200 ease-soft",
                  active === h.id
                    ? "border-purple-60 text-neutral-90 font-medium"
                    : "border-transparent text-neutral-60 hover:text-neutral-90"
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile / tablet collapsible */}
      <details className="xl:hidden mb-8 rounded-lg border border-neutral-20 bg-neutral-5 p-4">
        <summary className="flex items-center gap-2 text-small font-medium text-neutral-90 cursor-pointer select-none">
          <List size={15} strokeWidth={1.75} aria-hidden="true" />
          Sommaire
        </summary>
        <ul className="mt-3 space-y-2 pl-1">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="text-small text-neutral-70 hover:text-purple-60 transition-colors duration-200 ease-soft"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
