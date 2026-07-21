import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwiper } from "swiper/react";

interface AccountsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountsSliderNavigation({
  isBeginning,
  isEnd,
}: AccountsSliderNavigationProps) {
  const swiper = useSwiper();
  return (
    <div>
      <button
        className="p-3 rounded-full enabled:hover:bg-black/20 cursor-pointer transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button
        className="p-3 rounded-full enabled:hover:bg-black/20 cursor-pointer transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
