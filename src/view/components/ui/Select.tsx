import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useId } from "react";
import { cn } from "../../../app/utils/cn";
import { useHasMounted } from "../../../app/hooks/useHasMounted";

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

export function Select({
  label,
  value,
  onValueChange,
  options,
}: SelectProps) {
  const id = useId();
  const hasMounted = useHasMounted();

  return (
    <div className="relative">
      <RadixSelect.Root
        value={value}
        onValueChange={onValueChange}
      >
        <RadixSelect.Trigger
          id={id}
          className="peer relative flex h-13 w-full cursor-pointer items-center rounded-lg border border-gray-500 bg-white px-3.5 pt-3.5 text-left text-gray-800 outline-none transition-colors data-[state=open]:border-gray-800"
        >
          <RadixSelect.Value placeholder=" " />
          <RadixSelect.Icon className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <ChevronDownIcon className="h-3.5 w-3.5 text-gray-800" />
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
                  className="flex cursor-pointer select-none items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-800 outline-none data-highlighted:bg-gray-100 "
                >
                  <RadixSelect.ItemText>
                    {option.label}
                  </RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none text-sm absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-700 peer-data-[state=open]:top-2.5 peer-data-[state=open]:translate-y-0 peer-data-[state=open]:text-xs",
          hasMounted && "transition-all",
          value && "top-2.5 translate-y-0 text-xs",
        )}
      >
        {label}
      </label>
    </div>
  );
}
