import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import { cn } from "../../../app/utils/cn";

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export function DropdownMenuContent({
  className,
  sideOffset = 8,
  align = "end",
  ...props
}: ComponentProps<typeof RadixDropdownMenu.Content>) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "min-w-40 origin-(--radix-dropdown-menu-content-transform-origin) z-50 rounded-xl border border-gray-200 bg-white p-1 shadow-lg outline-none data-[state=open]:animate-dropdown-show data-[state=closed]:animate-dropdown-hide",
          className,
        )}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  );
}

export function DropdownMenuItem({
  className,
  children,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.Item>) {
  return (
    <RadixDropdownMenu.Item
      className={cn(
        "flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-800 outline-none transition-colors data-highlighted:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}
