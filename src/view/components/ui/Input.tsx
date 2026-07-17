import { forwardRef, useId, type ComponentProps, } from "react";

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, ...props }, ref) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div>
        <div className="relative">
          <input
            {...props}
            ref={ref}
            id={inputId}
            placeholder=" "
            className={`peer h-15 w-full rounded-lg border bg-white px-4 pt-4 text-gray-800 outline-none transition-colors focus:border-gray-800 ${error ? "border-red-500" : "border-gray-500"}`}
          />

          <label
            htmlFor={inputId}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
          >
            {label}
          </label>
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
