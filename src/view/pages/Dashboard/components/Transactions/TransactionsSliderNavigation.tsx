import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface TransactionsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function TransactionsSliderNavigation({
  isBeginning,
  isEnd,
}: TransactionsSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 p-3 h-12 w-12 flex items-center justify-center z-999 bg-linear-to-r from-gray-100 to-transparent rounded-full enabled:hover:bg-black/5 cursor-pointer transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="text-gray-900 w-6 h-6" />
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 h-12 w-12 flex items-center justify-center z-999 bg-linear-to-l from-gray-100 to-transparent rounded-full enabled:hover:bg-black/5 cursor-pointer transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="text-gray-900 w-6 h-6" />
      </button>
    </>
  );
}
