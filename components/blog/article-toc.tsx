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
export function ArticleToc({
  headings,
  boundsId,
}: {
  headings: Heading[];
  /** Id of the element the rail should stay within — it hides once you
   *  scroll past this element (e.g. into the related-posts section). */
  boundsId?: string;
}) {
  const [active, setActive] = React.useState<string>(headings[0]?.id ?? "");
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  React.useEffect(() => {
    if (!boundsId) return;
    const onScroll = () => {
      const el = document.getElementById(boundsId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Visible while the article body still occupies the rail's zone;
      // hide once its bottom scrolls above (related posts / footer in view).
      setVisible(rect.bottom > 220);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [boundsId]);

  if (!headings.length) return null;

  return (
    <>
      {/* Desktop sticky rail — hides once you scroll past the article body */}
      <nav
        aria-label="Sommaire"
        className={cn(
          "hidden xl:block fixed top-32 left-8 w-56 max-h-[70vh] overflow-auto",
          "transition-opacity duration-300 ease-soft",
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
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
