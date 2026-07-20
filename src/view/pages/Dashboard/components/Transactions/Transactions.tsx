import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/months";
import { TransactionsSliderOption } from "./TransactionsSliderOption";
import { TransactionsSliderNavigation } from "./TransactionsSliderNavigation";
import { useTransactionsController } from "./useTransactionsController";
import { TransactionItem } from "./TransactionItem";

export function Transactions() {
  const { sliderState, setSliderState } = useTransactionsController();

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      <header>
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 font-medium">
              Transações
            </span>
            <ChevronDownIcon className="text-gray-900" />
          </button>
          <button>
            <FilterIcon />
          </button>
        </div>
        <div className="mt-6 relative">
          <Swiper
            slidesPerView={3}
            centeredSlides
            allowTouchMove={false}
            onSwiper={(swiper) =>
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              })
            }
            onSlideChange={(swiper) =>
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              })
            }
          >
            <TransactionsSliderNavigation
              isBeginning={sliderState.isBeginning}
              isEnd={sliderState.isEnd}
            />

            {MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <TransactionsSliderOption
                    month={month}
                    index={index}
                    isActive={isActive}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>
      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
        <TransactionItem
          name="Almoço"
          date="14/06/2026"
          value={1222}
          categoryType="income"
        />
        <TransactionItem
          name="Almoço"
          date="14/06/2026"
          value={1222}
          categoryType="income"
        />
      </div>
    </div>
  );
}
