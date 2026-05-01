import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input — neutral form control. Focus uses plum ring + parchment-dark border.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-sm bg-cream-50 border border-parchment",
        "px-3 text-body text-ink placeholder:text-ink-50",
        "transition-[border-color,box-shadow] duration-200 ease-soft",
        "hover:border-parchment-dark",
        "focus:outline-none focus:border-plum focus:shadow-focus",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-eyebrow uppercase text-ink-70", className)}
    {...props}
  />
));
Label.displayName = "Label";
