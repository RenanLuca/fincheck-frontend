import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { cn } from "../../../app/utils/cn";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  rightAction?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  title,
  rightAction,
  className,
  children,
}: ModalProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide" />

        <RadixDialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-lg outline-none data-[state=open]:animate-dropdown-show data-[state=closed]:animate-dropdown-hide",
            className,
          )}
        >
          <header className="grid grid-cols-[1fr_auto_1fr] items-center">
            <RadixDialog.Close asChild>
              <button className="justify-self-start cursor-pointer outline-none">
                <Cross2Icon className="w-5 h-5 text-gray-800" />
              </button>
            </RadixDialog.Close>

            <RadixDialog.Title className="text-center text-lg font-bold text-gray-800">
              {title}
            </RadixDialog.Title>

            {rightAction && (
              <div className="justify-self-end">{rightAction}</div>
            )}
          </header>

          <div className="mt-8">{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
