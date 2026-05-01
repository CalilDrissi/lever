"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * Nav — sticky, transparent over cream until scrolled, then a hairline border.
 * No drop shadow; we use a 1px parchment line for separation.
 */
export function Nav() {
  const t = copy.fr.nav;
  const brand = copy.fr.brand;

  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-cream/80 backdrop-blur-[6px]",
        "transition-[border-color,background-color] duration-300 ease-soft",
        scrolled ? "border-b border-parchment" : "border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <LeverMark />
          <span className="font-display text-h6 tracking-tight text-ink">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#product">{t.product}</NavLink>
          <NavLink href="#pricing">{t.pricing}</NavLink>
          <NavLink href="#manifesto">{t.manifesto}</NavLink>
          <NavLink href="#security">{t.security}</NavLink>
          <NavLink href="/styleguide">Styleguide</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            {t.login}
          </Button>
          <Button variant="primary" size="sm">
            {t.cta}
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-small text-ink-70 hover:text-ink transition-colors duration-200 ease-soft"
    >
      {children}
    </Link>
  );
}

/**
 * LeverMark — a quiet glyph: a fulcrum + plank.
 * Small, charcoal, no gradient.
 */
function LeverMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className="text-ink"
    >
      <path
        d="M3 15.5 L19 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M7 18 L11 12 L15 18 Z"
        fill="currentColor"
      />
    </svg>
  );
}
