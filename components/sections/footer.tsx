"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Linkedin, Twitter, Github, Mail, ArrowRight, Check } from "lucide-react";
import { copy } from "@/lib/copy";
import { useLocale, useLocalePath } from "@/components/locale-provider";
import { AUTH_LINKS } from "@/lib/links";
import { FranceFlag } from "@/components/icons/france-flag";
import { GBFlag } from "@/components/icons/gb-flag";
import { NavDropdown, DropdownItem } from "@/components/nav-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en" as const, label: "English",  Flag: GBFlag },
  { code: "fr" as const, label: "Français", Flag: FranceFlag },
];

/**
 * Footer — bold edition.
 *
 * Top band: a confident logo + tagline + CTA cluster on the left, with the
 * three link columns on the right. The legal row sits between the top band
 * and the bottom wordmark.
 *
 * Bottom: a giant brand wordmark spans the full footer width as a near-
 * invisible ghost (mulberry-90 over mulberry-100) — borrowed verbatim from
 * Superhuman's `footer_wordmark` pattern.
 */
export function Footer() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const f = copy[locale].footer;
  const brand = copy[locale].brand;

  const altHref = React.useMemo(() => {
    if (locale === "fr") {
      const stripped = pathname.replace(/^\/fr/, "") || "/";
      return stripped;
    }
    return "/fr" + (pathname === "/" ? "" : pathname);
  }, [locale, pathname]);

  const langEntry = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
  const LangFlag = langEntry.Flag;
  const lp = useLocalePath();

  return (
    <footer className="relative bg-mulberry-100 text-white overflow-hidden">
      <div className="container pt-16 sm:pt-20 lg:pt-28 pb-6">
        {/* Top band */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5 lg:col-span-6">
            <Link href={lp("/")} className="inline-flex items-center gap-3 mb-6 sm:mb-8">
              <FooterMark />
              <span className="font-display text-h3 tracking-tight text-white">
                {brand.name}
              </span>
            </Link>
            <h3 className="font-display text-h2 tracking-tight text-white max-w-[18ch]">
              {f.pitch}
            </h3>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a href={AUTH_LINKS.signup}>
                <Button variant="primary" size="lg" className="group">
                  {f.cta}
                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </a>
              <Link
                href={lp("/contact")}
                className="text-small text-white/70 hover:text-white underline-offset-4 hover:underline transition-colors duration-200 ease-soft sm:self-center"
              >
                {locale === "fr" ? "Parler à l'équipe →" : "Talk to the team →"}
              </Link>
            </div>
          </div>

          {/* Link columns — 2 cols on tiny screens, 3 from sm+ */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8">
            {f.columns.map((col) => (
              <div key={col.heading}>
                <h4 className="font-display text-h6 tracking-tight text-white mb-4 sm:mb-5">
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={lp(link.href)}
                        className="text-body text-white/70 hover:text-white transition-colors duration-200 ease-soft"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-14 sm:mt-20 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-small text-white/60 inline-flex items-center gap-2">
              <span>{f.copyright}</span>
              <FranceFlag size={12} className="rounded-[1px] shrink-0" />
            </p>
            {/* Language switcher */}
            <NavDropdown
              onDark
              openUp
              align="left"
              trigger={
                <>
                  <LangFlag size={13} className="rounded-[1px] shrink-0" />
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
          </div>
          <ul className="flex items-center gap-3">
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <Linkedin size={16} strokeWidth={1.75} aria-hidden="true" />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" label="Twitter / X">
              <Twitter size={16} strokeWidth={1.75} aria-hidden="true" />
            </SocialIcon>
            <SocialIcon href="https://github.com" label="GitHub">
              <Github size={16} strokeWidth={1.75} aria-hidden="true" />
            </SocialIcon>
            <SocialIcon href={`mailto:hello@${brand.domain}`} label="Email">
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
            </SocialIcon>
          </ul>
        </div>
      </div>

      {/* Giant ghost wordmark — single line, sized so "Virtus Lever" fits
          the viewport edge to edge. Color sits one tone above mulberry-100
          (mulberry-90 = #602639) so it reads as a watermark, not a heading.
          The footer's overflow-hidden clips any sub-pixel overshoot. */}
      <div
        aria-hidden="true"
        className="select-none pointer-events-none whitespace-nowrap leading-[0.85] tracking-[-0.04em] font-display font-semibold text-mulberry-90 text-center"
        style={{
          // 17vw × 11 chars ≈ viewport width on a 1440px screen, scales
          // smoothly down to phones via the clamp lower bound.
          fontSize: "clamp(64px, 17vw, 240px)",
          paddingBottom: "clamp(8px, 2vw, 24px)",
        }}
      >
        {brand.name}
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="grid place-items-center size-9 rounded-sm border border-white/15 text-white/75 hover:text-mulberry-100 hover:bg-white hover:border-white transition-colors duration-200 ease-soft"
      >
        {children}
      </a>
    </li>
  );
}

function FooterMark() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className="text-white"
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
