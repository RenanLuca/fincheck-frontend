import { useId, useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Calendar } from "./Calendar";
import { cn } from "../../../app/utils/cn";

interface DateInputProps {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
}

export function DateInput({ value, onValueChange }: DateInputProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            className="flex h-15 w-full cursor-pointer items-center rounded-lg border border-gray-500 bg-white px-4 pt-4 text-left text-gray-800 outline-none transition-colors data-[state=open]:border-gray-800"
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
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-all",
          value && "top-3 translate-y-0 text-xs",
        )}
      >
        Data
      </label>
    </div>
  );
}
