import {
  forwardRef,
  useId,
  type ComponentProps,
} from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../../app/utils/cn";
import { useHasMounted } from "../../../app/hooks/useHasMounted";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(({ id, label, error, className, ...props }, ref) => {
  const reactId = useId();
  const inputId = id ?? reactId;
  const hasMounted = useHasMounted();

  return (
    <div>
      <div className="relative">
        <input
          {...props}
          ref={ref}
          id={inputId}
          placeholder=" "
          className={cn(
            "peer h-13 w-full rounded-lg border bg-white px-3.5 pt-3.5 text-gray-800 outline-none transition-colors focus:border-gray-800",
            error ? "border-red-500!" : "border-gray-500",
            className,
          )}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none text-sm absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-700 peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[11px]",
            hasMounted && "transition-all",
          )}
        >
          {label}
        </label>
      </div>

      {error && (
        <div className="flex justify-start items-end gap-2 mt-1 text-red-600">
          <CrossCircledIcon />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
