import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge — small chip for scores, statuses, eyebrows.
 *   neutral — cream-50 + parchment border
 *   signal  — soft green for the Domino score
 *   plum    — accent (use once)
 */
type BadgeVariant = "neutral" | "signal" | "plum";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = ({ className, variant = "neutral", ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-sm px-2 py-1",
      "text-eyebrow uppercase",
      variant === "neutral" && "bg-cream-50 text-ink-70 border border-parchment",
      variant === "signal" && "bg-signal-soft text-signal border border-signal/20",
      variant === "plum" && "bg-plum text-cream border border-plum",
      className
    )}
    {...props}
  />
);
