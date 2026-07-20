import { useId } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../../components/ui/DropdownMenu";
import { ColorIcon } from "../../../../components/icons/ColorIcon";
import {
  ACCOUNT_COLORS,
  type AccountColor,
} from "../../../../../app/config/accountColors";

interface AccountColorInputProps {
  value: AccountColor | null;
  onValueChange: (color: AccountColor) => void;
}

export function AccountColorInput({
  value,
  onValueChange,
}: AccountColorInputProps) {
  const id = useId();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id={id}
            className="peer flex h-15 w-full p-4 text-sm text-gray-700 cursor-pointer items-center justify-between rounded-lg border border-gray-500 bg-white outline-none transition-colors data-[state=open]:border-gray-800"
          >
            Cor
            {value ? (
              <ColorIcon bg={value.bg} color={value.color} />
            ) : (
              <ChevronDownIcon className="text-gray-800 w-4 h-4" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-64 p-3 z-99">
          <div className="grid grid-cols-4 gap-2">
            {ACCOUNT_COLORS.map((accountColor) => (
              <RadixDropdownMenu.Item
                key={accountColor.color}
                asChild
                onSelect={() => onValueChange(accountColor)}
              >
                <button className="flex cursor-pointer items-center justify-center rounded-full outline-none transition-transform hover:scale-110">
                  <ColorIcon bg={accountColor.bg} color={accountColor.color} />
                </button>
              </RadixDropdownMenu.Item>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
