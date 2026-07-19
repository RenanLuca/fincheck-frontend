import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface TransactionsSliderOptionProps {
  month: string;
  index: number;
  isActive: boolean;
}

export function TransactionsSliderOption({
  month,
  index,
  isActive,
}: TransactionsSliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        "w-full rounded-full h-12 text-sm text-gray-800 font-medium",
        isActive && "bg-white",
      )}
    >
      {month}
    </button>
  );
}
