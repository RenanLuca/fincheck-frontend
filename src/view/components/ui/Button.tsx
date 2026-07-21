import type { ComponentProps } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "h-13 w-full flex items-center justify-center rounded-2xl cursor-pointer bg-teal-900 font-medium text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {isLoading ? (
        <LoaderCircle className="h-5 w-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
