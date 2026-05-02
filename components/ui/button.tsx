import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — three variants on the Superhuman palette.
 *   primary   — solid purple-60 with white text. The brand action color.
 *   secondary — transparent fill with a neutral-90 outline (visible on
 *               white pages where a white-fill button would blend).
 *   ghost     — text-only, underline-on-hover.
 *
 * Sizes follow the 8/16/24 radius rule via rounded utilities.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 select-none",
    "font-medium tracking-tight",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-soft",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:shadow-focus",
  ],
  {
    variants: {
      variant: {
        primary: [
          // Solid brand purple. White text on #714cb6 hits ~5.6:1 contrast,
          // passing WCAG AA for body. Purple-tinted shadow gives elevation
          // without graying out the fill.
          "rounded font-semibold text-white",
          "bg-purple-60",
          "shadow-[0_2px_0_rgba(40,22,71,0.18),_0_14px_30px_-12px_rgba(113,76,182,0.45)]",
          "hover:bg-purple-80",
          "hover:shadow-[0_2px_0_rgba(40,22,71,0.24),_0_18px_36px_-14px_rgba(113,76,182,0.6)]",
          "active:translate-y-px",
        ],
        secondary: [
          // True outline: transparent fill, dark border, dark text. Stays
          // legible on a white page bg; hover fills with neutral-90.
          "bg-transparent text-neutral-90 rounded border-2 border-neutral-90 font-semibold",
          "hover:bg-neutral-90 hover:text-white",
          "active:translate-y-px",
        ],
        ghost: [
          "bg-transparent text-neutral-90 rounded-sm",
          "hover:text-purple-60",
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
