import {
  NumericFormat,
  type NumericFormatProps,
} from "react-number-format";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../../app/utils/cn";

interface CurrencyInputProps extends Omit<
  NumericFormatProps,
  "value" | "onValueChange"
> {
  value: number | undefined;
  onValueChange: (value: number | undefined) => void;
  error?: string;
}

export function CurrencyInput({
  value,
  onValueChange,
  className,
  error,
  ...props
}: CurrencyInputProps) {
  return (
    <div>
      <NumericFormat
        value={value}
        onValueChange={(values) =>
          onValueChange(values.floatValue)
        }
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale
        prefix="R$ "
        placeholder="R$ 0,00"
        className={cn(
          "w-full border-none bg-transparent text-center text-3xl font-bold text-gray-800 outline-none",
          className,
        )}
        {...props}
      />

      {error && (
        <div className="flex justify-center items-end gap-2 mt-1 text-red-600">
          <CrossCircledIcon />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
