"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { AUTH_LINKS } from "@/lib/links";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/currency-provider";
import { useLocalePath } from "@/components/locale-provider";
import { NavDropdown, DropdownItem } from "@/components/nav-dropdown";
import type { Currency } from "@/lib/currency";
import { FranceFlag } from "@/components/icons/france-flag";
import { GBFlag } from "@/components/icons/gb-flag";
import { EUFlag } from "@/components/icons/eu-flag";
import { USFlag } from "@/components/icons/us-flag";
import { MoroccoFlag } from "@/components/icons/morocco-flag";

const CURRENCIES: { code: Currency; label: string; Flag: React.FC<{ size?: number; className?: string }> }[] = [
  { code: "EUR", label: "EUR — Euro",    Flag: EUFlag },
  { code: "USD", label: "USD — Dollar",  Flag: USFlag },
  { code: "MAD", label: "MAD — Dirham",  Flag: MoroccoFlag },
];

const LANGUAGES = [
  { code: "en" as const, label: "English",  Flag: GBFlag },
  { code: "fr" as const, label: "Français", Flag: FranceFlag },
];

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
 */
export function Nav({ forceSolid = false }: { forceSolid?: boolean } = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.startsWith("/fr") ? "fr" : "en";
  const t = copy[locale].nav;
  const brand = copy[locale].brand;
  const { currency, setCurrency } = useCurrency();
  const lp = useLocalePath();

  // Alternate-locale href (strip or prepend /fr)
  const altHref = React.useMemo(() => {
    if (locale === "fr") {
      const stripped = pathname.replace(/^\/fr/, "") || "/";
      return stripped;
    }
    return "/fr" + (pathname === "/" ? "" : pathname);
  }, [locale, pathname]);

  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 96) setHidden(false);
      else if (y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const inverted = !forceSolid && !scrolled && !open;
  const isHidden = hidden && !open;

  // Currency flag for the trigger
  const currencyEntry = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];
  const CurrencyFlag = currencyEntry.Flag;

  // Language flag for the trigger
  const langEntry = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
  const LangFlag = langEntry.Flag;

  return (
    <header
      className={cn(
        "fixed top-3 sm:top-4 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none",
        "transition-transform duration-300 ease-soft",
        isHidden ? "-translate-y-[150%]" : "translate-y-0"
      )}
    >
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
            href={lp("/")}
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

          {/* Divider */}
          <span
            aria-hidden="true"
            className={cn(
              "hidden lg:block h-5 w-px shrink-0",
              inverted ? "bg-white/20" : "bg-neutral-20"
            )}
          />

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink href={lp("/#product")} inverted={inverted}>{t.product}</NavLink>
            <NavLink href={lp("/#pricing")} inverted={inverted}>{t.pricing}</NavLink>
            <NavLink href={lp("/#manifesto")} inverted={inverted}>{t.manifesto}</NavLink>
            <NavLink href={lp("/#security")} inverted={inverted}>{t.security}</NavLink>
            <NavLink href={lp("/blog")} inverted={inverted}>{t.blog}</NavLink>
          </nav>

          {/* CTA cluster — only at lg+ */}
          <div className="ml-auto hidden lg:flex items-center gap-1">

            {/* Language dropdown */}
            <NavDropdown
              onDark={inverted}
              trigger={
                <>
                  <LangFlag size={14} className="rounded-[1px] shrink-0" />
                  <span>{locale.toUpperCase()}</span>
                </>
              }
            >
              {(close) => (
                <>
                  {LANGUAGES.map(({ code, label, Flag }) => (
                    <DropdownItem
                      key={code}
                      active={code === locale}
                      onClick={() => {
                        close();
                        if (code !== locale) {
                          localStorage.setItem("vl-locale", code);
                          router.push(altHref);
                        }
                      }}
                    >
                      <Flag size={14} className="rounded-[1px] shrink-0" />
                      <span className="flex-1">{label}</span>
                      {code === locale && (
                        <Check size={12} strokeWidth={2.5} className="text-mulberry-60 shrink-0" aria-hidden="true" />
                      )}
                    </DropdownItem>
                  ))}
                </>
              )}
            </NavDropdown>

            {/* Currency dropdown */}
            <NavDropdown
              onDark={inverted}
              trigger={
                <>
                  <CurrencyFlag size={14} className="rounded-[1px] shrink-0" />
                  <span>{currency}</span>
                </>
              }
            >
              {(close) => (
                <>
                  {CURRENCIES.map(({ code, label, Flag }) => (
                    <DropdownItem
                      key={code}
                      active={code === currency}
                      onClick={() => { setCurrency(code); close(); }}
                    >
                      <Flag size={14} className="rounded-[1px] shrink-0" />
                      <span className="flex-1">{label}</span>
                      {code === currency && (
                        <Check size={12} strokeWidth={2.5} className="text-mulberry-60 shrink-0" aria-hidden="true" />
                      )}
                    </DropdownItem>
                  ))}
                </>
              )}
            </NavDropdown>

            <a
              href={AUTH_LINKS.login}
              className={cn(
                "h-9 px-3 inline-flex items-center text-small font-medium rounded-full ml-0.5",
                "transition-colors duration-200 ease-soft",
                inverted
                  ? "text-white/85 hover:text-white hover:bg-white/10"
                  : "text-neutral-80 hover:text-neutral-90 hover:bg-neutral-5"
              )}
            >
              {t.login}
            </a>
            <a href={AUTH_LINKS.signup}>
              <Button variant="primary" size="sm" className="rounded-full px-4">
                {t.cta}
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open
              ? (locale === "fr" ? "Fermer le menu" : "Close menu")
              : (locale === "fr" ? "Ouvrir le menu" : "Open menu")}
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
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      {open && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden pointer-events-auto mx-auto mt-2 max-w-[1180px]"
        >
          <div className="rounded-xl bg-white border border-neutral-20 shadow-card overflow-hidden">
            <nav className="px-5 py-4 flex flex-col">
              <DrawerLink href={lp("/#product")} onSelect={() => setOpen(false)}>{t.product}</DrawerLink>
              <DrawerLink href={lp("/#pricing")} onSelect={() => setOpen(false)}>{t.pricing}</DrawerLink>
              <DrawerLink href={lp("/#manifesto")} onSelect={() => setOpen(false)}>{t.manifesto}</DrawerLink>
              <DrawerLink href={lp("/#security")} onSelect={() => setOpen(false)}>{t.security}</DrawerLink>
              <DrawerLink href={lp("/blog")} onSelect={() => setOpen(false)}>{t.blog}</DrawerLink>

              {/* Language + currency row */}
              <div className="mt-4 pt-4 border-t border-neutral-10">
                <p className="text-[11px] font-medium text-neutral-50 uppercase tracking-wide mb-3">
                  {locale === "fr" ? "Langue & Devise" : "Language & Currency"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(({ code, label, Flag }) => (
                    <Link
                      key={code}
                      href={code === locale ? pathname : altHref}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors duration-150",
                        code === locale
                          ? "bg-neutral-90 text-white border-neutral-90"
                          : "border-neutral-20 text-neutral-60 hover:text-neutral-90"
                      )}
                    >
                      <Flag size={13} className="rounded-[1px]" />
                      {label}
                    </Link>
                  ))}

                  <span className="self-center text-neutral-20 text-[11px]">·</span>

                  {CURRENCIES.map(({ code, label, Flag }) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setCurrency(code)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors duration-150",
                        code === currency
                          ? "bg-neutral-90 text-white border-neutral-90"
                          : "border-neutral-20 text-neutral-60 hover:text-neutral-90"
                      )}
                    >
                      <Flag size={13} className="rounded-[1px]" />
                      {label.split(" — ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <a
                  href={AUTH_LINKS.login}
                  onClick={() => setOpen(false)}
                  className="h-10 px-4 inline-flex items-center text-body font-medium text-neutral-80 hover:text-neutral-90"
                >
                  {t.login}
                </a>
                <a href={AUTH_LINKS.signup} onClick={() => setOpen(false)} className="ml-auto">
                  <Button variant="primary" size="md" className="rounded-full px-5">
                    {t.cta}
                  </Button>
                </a>
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
        inverted ? "text-white/85 hover:text-white" : "text-neutral-80 hover:text-neutral-90"
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
      <path d="M3 15.5 L19 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 18 L11 12 L15 18 Z" fill="currentColor" />
    </svg>
  );
}
