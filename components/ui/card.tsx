import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card — three surface treatments. Borders do most of the work; shadow is optional.
 *   surface  — cream-50 fill, parchment border (default)
 *   raised   — cream-100 fill, parchment border + hairline shadow
 *   inverted — charcoal/ink fill (used in the security section)
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
          "bg-cream-50 border border-parchment text-ink",
        variant === "raised" &&
          "bg-cream-100 border border-parchment shadow-card text-ink",
        variant === "inverted" &&
          "bg-ink text-cream border border-ink",
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
  <p className={cn("text-body text-ink-70", className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-body text-ink-70", className)} {...props} />
);
