"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating dropdown used by the nav and footer for language / currency selectors.
 *
 * The trigger renders a compact button showing the current selection.
 * `children` is a render-prop receiving a `close()` callback so each item
 * (Link or button) can dismiss the panel after acting.
 *
 * Prop `onDark` switches the trigger palette to work on dark surfaces
 * (e.g. nav glass-over-hero, footer). The panel itself is always white.
 */
export function NavDropdown({
  trigger,
  children,
  onDark = false,
  openUp = false,
  align = "right",
}: {
  /** Content of the closed trigger button (flag + code + chevron injected). */
  trigger: React.ReactNode;
  /** Panel content — function so each item can call close(). */
  children: (close: () => void) => React.ReactNode;
  /** Use light/white trigger colours (nav over hero, footer, etc.). */
  onDark?: boolean;
  /** Open the panel above the trigger instead of below. */
  openUp?: boolean;
  /** Align the panel to the left or right edge of the trigger. */
  align?: "left" | "right";
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const close = React.useCallback(() => setOpen(false), []);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 h-8 px-2.5 rounded-full text-[11px] font-medium tracking-wide transition-colors duration-150 ease-soft select-none",
          onDark
            ? open
              ? "bg-white/15 text-white"
              : "text-white/75 hover:text-white hover:bg-white/10"
            : open
            ? "bg-neutral-10 text-neutral-90"
            : "text-neutral-70 hover:text-neutral-90 hover:bg-neutral-5"
        )}
      >
        {trigger}
        <ChevronDown
          size={10}
          strokeWidth={2.5}
          aria-hidden="true"
          className={cn(
            "shrink-0 transition-transform duration-200 ease-soft",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute z-[60] min-w-[170px] rounded-xl bg-white",
            "border border-neutral-15",
            "shadow-[0_4px_24px_-4px_rgba(41,40,39,0.18),0_1px_4px_-1px_rgba(41,40,39,0.08)]",
            "py-1 overflow-hidden",
            openUp ? "bottom-full mb-2" : "top-full mt-2",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {children(close)}
        </div>
      )}
    </div>
  );
}

/** Shared styles for items inside a NavDropdown panel. */
export function DropdownItem({
  active,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      {...props}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 text-small text-left transition-colors duration-100 ease-soft",
        active
          ? "text-neutral-90 font-medium bg-neutral-5"
          : "text-neutral-60 hover:text-neutral-90 hover:bg-neutral-5"
      )}
    >
      {children}
    </button>
  );
}
