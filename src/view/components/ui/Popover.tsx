import * as RadixPopover from "@radix-ui/react-popover";
import type { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;

export function PopoverContent({
  className,
  sideOffset = 8,
  align = "start",
  ...props
}: ComponentProps<typeof RadixPopover.Content>) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-999 rounded-xl border border-gray-200 bg-white p-3 shadow-lg outline-none data-[state=open]:animate-dropdown-show data-[state=closed]:animate-dropdown-hide",
          className,
        )}
        {...props}
      />
    </RadixPopover.Portal>
  );
}
