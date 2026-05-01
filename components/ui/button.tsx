import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — three variants tuned for the cream/charcoal palette.
 *   primary   — charcoal solid on cream (the only call-to-action style)
 *   secondary — parchment-bordered, transparent fill
 *   ghost     — text-only, underline-on-hover
 *
 * Sizes follow the 8/16/24 radius rule via rounded utilities.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 select-none",
    "font-medium tracking-tight",
    "transition-[background-color,color,border-color,transform] duration-200 ease-soft",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:shadow-focus",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-ink text-cream rounded",
          "hover:bg-plum-ink",
          "active:translate-y-px",
        ],
        secondary: [
          "bg-transparent text-ink rounded border border-parchment-dark",
          "hover:bg-cream-50",
          "active:translate-y-px",
        ],
        ghost: [
          "bg-transparent text-ink rounded-sm",
          "hover:text-plum",
          "underline-offset-4 hover:underline",
        ],
      },
      size: {
        sm: "h-9 px-3 text-small",
        md: "h-11 px-5 text-body",
        lg: "h-12 px-6 text-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
