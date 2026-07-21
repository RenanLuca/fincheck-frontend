import { useId, useState } from "react";
import { format } from "date-fns";
import { CircleX } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./Popover";
import { Calendar } from "./Calendar";
import { cn } from "../../../app/utils/cn";
import { useHasMounted } from "../../../app/hooks/useHasMounted";

interface DateInputProps {
  value: Date | undefined;
  onValueChange: (date: Date | undefined) => void;
  error?: string;
}

export function DateInput({
  value,
  onValueChange,
  error,
}: DateInputProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const hasMounted = useHasMounted();

  return (
    <div>
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              id={id}
              className={cn(
                "flex h-13 w-full cursor-pointer items-center rounded-lg border bg-white px-3.5 pt-3.5 text-left text-gray-800 outline-none transition-colors data-[state=open]:border-gray-800",
                error ? "border-red-500!" : "border-gray-500",
              )}
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
            value && "top-1.5 translate-y-0 text-[11px]",
          )}
        >
          Data
        </label>
      </div>

      {error && (
        <div className="flex justify-start items-end gap-2 mt-1 text-red-600">
          <CircleX className="h-3.5 w-3.5" />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
