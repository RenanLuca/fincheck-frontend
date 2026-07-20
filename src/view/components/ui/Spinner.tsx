import { ReloadIcon } from "@radix-ui/react-icons";
import type { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";

interface SpinnerProps extends ComponentProps<typeof ReloadIcon> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <ReloadIcon {...props} className={cn("h-6 w-6 animate-spin", className)} />
  );
}
