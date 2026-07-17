import type { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "h-13 w-full rounded-2xl cursor-pointer bg-teal-900 font-medium text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}
