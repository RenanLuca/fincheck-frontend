import * as RadixSelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useId } from "react";
import { cn } from "../../../app/utils/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
}

export function Select({ label, value, onValueChange, options }: SelectProps) {
  const id = useId();

  return (
    <div className="relative">
      <RadixSelect.Root value={value} onValueChange={onValueChange}>
        <RadixSelect.Trigger
          id={id}
          className="flex h-15 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-500 bg-white px-4 pt-4 text-left text-gray-800 outline-none transition-colors data-[state=open]:border-gray-800"
        >
          <RadixSelect.Value placeholder=" " />
          <RadixSelect.Icon>
            <ChevronDownIcon className="text-gray-600" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={8}
            className="z-99 w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
          >
            <RadixSelect.Viewport>
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className="flex cursor-pointer select-none items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-800 outline-none data-[highlighted]:bg-gray-100"
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator>
                    <CheckIcon />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 transition-all",
          value && "top-3 translate-y-0 text-xs",
        )}
      >
        {label}
      </label>
    </div>
  );
}
