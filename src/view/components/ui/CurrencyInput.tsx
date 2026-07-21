import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { cn } from "../../../app/utils/cn";

interface CurrencyInputProps extends Omit<
  NumericFormatProps,
  "value" | "onValueChange"
> {
  value: number | undefined;
  onValueChange: (value: number | undefined) => void;
}

export function CurrencyInput({
  value,
  onValueChange,
  className,
  ...props
}: CurrencyInputProps) {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => onValueChange(values.floatValue)}
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
  );
}
