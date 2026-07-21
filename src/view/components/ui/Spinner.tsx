import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";

type SpinnerProps = ComponentProps<typeof LoaderCircle>;

export function Spinner({
  className,
  ...props
}: SpinnerProps) {
  return (
    <LoaderCircle
      {...props}
      className={cn("h-6 w-6 animate-spin", className)}
    />
  );
}
