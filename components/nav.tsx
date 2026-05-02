"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * Nav — floating pill, Superhuman-adjacent.
 *
 * Sits as a rounded-full capsule a few pixels below the top of the
 * viewport. Two visual modes:
 *
 *   - over the hero (no scroll): glass-translucent fill with a faint
 *     white border, white text — blends into the navy hero gradient
 *   - on white sections (scrolled): solid white fill, neutral-20 border,
 *     dark text — reads as a real navigation bar
 *
 * Layout (≥ lg): logo · nav links · ctas
 * Layout (< lg): logo · menu button (drawer holds links + ctas)
 *
 * The pill only reads as "over the hero" while we're at the top of the
 * page. Once the user scrolls past 8px, we switch to the solid mode so
 * the chrome doesn't sit transparent over white sections later.
 */
export function Nav() {
  const t = copy.fr.nav;
  const brand = copy.fr.brand;

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Inverted = floating over the navy hero. Opening the drawer always
  // forces the solid mode so the drawer reads cleanly.
  const inverted = !scrolled && !open;

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-[1180px]">
        <div
          className={cn(
            "pointer-events-auto rounded-full",
            "h-14 pl-5 pr-2 flex items-center gap-6",
            "transition-[background-color,color,border-color,box-shadow,backdrop-filter] duration-300 ease-soft",
            inverted
              ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
              : "bg-white/95 backdrop-blur-md border border-neutral-20 text-neutral-90 shadow-[0_2px_0_rgba(41,40,39,0.04),_0_8px_24px_-12px_rgba(41,40,39,0.18)]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setOpen(false)}
          >
            <LeverMark inverted={inverted} />
            <span
              className={cn(
                "font-display text-h6 tracking-tight transition-colors duration-200 ease-soft",
                inverted ? "text-white" : "text-neutral-90"
              )}
            >
              {brand.name}
            </span>
          </Link>

          {/* Divider — quiet hairline between logo and nav links */}
          <span
            aria-hidden="true"
            className={cn(
              "hidden lg:block h-5 w-px shrink-0",
              inverted ? "bg-white/20" : "bg-neutral-20"
            )}
          />

          {/* Nav links — visible from lg up */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink href="#product" inverted={inverted}>
              {t.product}
            </NavLink>
            <NavLink href="#pricing" inverted={inverted}>
              {t.pricing}
            </NavLink>
            <NavLink href="#manifesto" inverted={inverted}>
              {t.manifesto}
            </NavLink>
            <NavLink href="#security" inverted={inverted}>
              {t.security}
            </NavLink>
          </nav>

          {/* CTA cluster — only at lg+ */}
          <div className="ml-auto hidden lg:flex items-center gap-1.5">
            <Link
              href="#"
              className={cn(
                "h-9 px-3 inline-flex items-center text-small font-medium rounded-full",
                "transition-colors duration-200 ease-soft",
                inverted
                  ? "text-white/85 hover:text-white hover:bg-white/10"
                  : "text-neutral-80 hover:text-neutral-90 hover:bg-neutral-5"
              )}
            >
              {t.login}
            </Link>
            <Button
              variant="primary"
              size="sm"
              className="rounded-full px-4"
            >
              {t.cta}
            </Button>
          </div>

          {/* Mobile / tablet menu button — covers everything < lg */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "ml-auto lg:hidden grid place-items-center size-10 rounded-full shrink-0",
              "transition-colors duration-200 ease-soft",
              inverted
                ? "text-white hover:bg-white/15"
                : "text-neutral-90 hover:bg-neutral-5"
            )}
          >
            {open ? (
              <X size={20} strokeWidth={1.75} />
            ) : (
              <Menu size={20} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer — sits below the pill, full width with
          a clean white panel since the pill switches to solid when open */}
      {open && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden pointer-events-auto mx-auto mt-2 max-w-[1180px]"
        >
          <div className="rounded-xl bg-white border border-neutral-20 shadow-card overflow-hidden">
            <nav className="px-5 py-4 flex flex-col">
              <DrawerLink href="#product" onSelect={() => setOpen(false)}>
                {t.product}
              </DrawerLink>
              <DrawerLink href="#pricing" onSelect={() => setOpen(false)}>
                {t.pricing}
              </DrawerLink>
              <DrawerLink href="#manifesto" onSelect={() => setOpen(false)}>
                {t.manifesto}
              </DrawerLink>
              <DrawerLink href="#security" onSelect={() => setOpen(false)}>
                {t.security}
              </DrawerLink>
              <div className="mt-4 pt-4 border-t border-neutral-20 flex items-center gap-3">
                <Link
                  href="#"
                  className="h-10 px-4 inline-flex items-center text-body font-medium text-neutral-80 hover:text-neutral-90"
                >
                  {t.login}
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  className="ml-auto rounded-full px-5"
                >
                  {t.cta}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  inverted,
  children,
}: {
  href: string;
  inverted: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-small font-medium transition-colors duration-200 ease-soft",
        inverted
          ? "text-white/85 hover:text-white"
          : "text-neutral-80 hover:text-neutral-90"
      )}
    >
      {children}
    </Link>
  );
}

function DrawerLink({
  href,
  onSelect,
  children,
}: {
  href: string;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="block py-3 text-h6 font-medium tracking-tight text-neutral-90 border-b border-neutral-10 last:border-b-0"
    >
      {children}
    </Link>
  );
}

function LeverMark({ inverted }: { inverted: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className={cn(
        "transition-colors duration-200 ease-soft",
        inverted ? "text-white" : "text-neutral-90"
      )}
    >
      <path
        d="M3 15.5 L19 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M7 18 L11 12 L15 18 Z" fill="currentColor" />
    </svg>
  );
}
