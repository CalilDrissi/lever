import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card — three surface treatments. Borders do most of the work; shadow is optional.
 *   surface  — neutral-5 fill, neutral-20 border (default)
 *   raised   — neutral-10 fill, neutral-20 border + hairline shadow
 *   inverted — charcoal/neutral-90 fill (used in the security section)
 */
type CardVariant = "surface" | "raised" | "inverted";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "surface", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg p-6",
        variant === "surface" &&
          "bg-neutral-5 border border-neutral-20 text-neutral-90",
        variant === "raised" &&
          "bg-neutral-10 border border-neutral-20 shadow-card text-neutral-90",
        variant === "inverted" &&
          "bg-neutral-90 text-white border border-neutral-90",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-1.5 mb-4", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("font-display text-h4 tracking-tight", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-body text-neutral-80", className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-body text-neutral-80", className)} {...props} />
);
