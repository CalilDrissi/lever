import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge — small chip for scores, statuses, eyebrows.
 *   neutral — neutral-5 fill, neutral-20 border (default)
 *   score   — soft green-10 fill for the leverage score
 *   accent  — purple-60 fill (use once: the hero Domino badge)
 */
type BadgeVariant = "neutral" | "score" | "accent";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = ({ className, variant = "neutral", ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-sm px-2 py-1",
      "text-eyebrow uppercase",
      variant === "neutral" && "bg-neutral-5 text-neutral-80 border border-neutral-20",
      variant === "score" && "bg-green-10 text-green-60 border border-green-60/20",
      variant === "accent" && "bg-purple-60 text-white border border-purple-60",
      className
    )}
    {...props}
  />
);
