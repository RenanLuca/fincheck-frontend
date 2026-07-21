import { useId, useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Calendar } from "./Calendar";
import { cn } from "../../../app/utils/cn";
import { useHasMounted } from "../../../app/hooks/useHasMounted";

interface DateInputProps {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
}

export function DateInput({ value, onValueChange }: DateInputProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const hasMounted = useHasMounted();

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            className="flex h-13 w-full cursor-pointer items-center rounded-lg border border-gray-500 bg-white px-3.5 pt-3.5 text-left text-gray-800 outline-none transition-colors data-[state=open]:border-gray-800"
          >
            {value ? format(value, "dd/MM/yyyy") : ""}
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onValueChange(date);
              setIsOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600",
          hasMounted && "transition-all",
          value && "top-2.5 translate-y-0 text-xs",
        )}
      >
        Data
      </label>
    </div>
  );
}
