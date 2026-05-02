import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input — neutral form control. Focus uses purple-60 ring + neutral-30 border.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-sm bg-neutral-5 border border-neutral-20",
        "px-3 text-body text-neutral-90 placeholder:text-neutral-60",
        "transition-[border-color,box-shadow] duration-200 ease-soft",
        "hover:border-neutral-30",
        "focus:outline-none focus:border-purple-60 focus:shadow-focus",
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
    className={cn("text-eyebrow uppercase text-neutral-80", className)}
    {...props}
  />
));
Label.displayName = "Label";
