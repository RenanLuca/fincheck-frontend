import { useId } from "react";
import {
  ChevronDownIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { ColorIcon } from "../icons/ColorIcon";
import { ACCOUNT_COLORS } from "../../../app/config/accountColors";
import { cn } from "../../../app/utils/cn";

interface AccountColorInputProps {
  value: string | null;
  onValueChange: (color: string) => void;
  error?: string;
}

export function AccountColorInput({
  value,
  onValueChange,
  error,
}: AccountColorInputProps) {
  const id = useId();
  const selectedColor = ACCOUNT_COLORS.find(
    (accountColor) => accountColor.color === value,
  );

  return (
    <div>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id={id}
              className={cn(
                "peer flex h-13 w-full p-3.5 text-sm text-gray-700 cursor-pointer items-center justify-between rounded-lg border bg-white outline-none transition-colors data-[state=open]:border-gray-800",
                error ? "border-red-500!" : "border-gray-500",
              )}
            >
              Cor
              {selectedColor ? (
                <ColorIcon
                  bg={selectedColor.bg}
                  color={selectedColor.color}
                />
              ) : (
                <ChevronDownIcon className="text-gray-800 w-3.5 h-3.5" />
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="w-64 p-3 z-99"
          >
            <div className="grid grid-cols-4 gap-2">
              {ACCOUNT_COLORS.map((accountColor) => (
                <RadixDropdownMenu.Item
                  key={accountColor.color}
                  asChild
                  onSelect={() =>
                    onValueChange(accountColor.color)
                  }
                >
                  <button className="flex cursor-pointer items-center justify-center rounded-full outline-none transition-transform hover:scale-110">
                    <ColorIcon
                      bg={accountColor.bg}
                      color={accountColor.color}
                    />
                  </button>
                </RadixDropdownMenu.Item>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {error && (
        <div className="flex justify-start items-end gap-2 mt-1 text-red-600">
          <CrossCircledIcon />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
