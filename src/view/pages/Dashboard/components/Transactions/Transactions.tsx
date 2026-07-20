import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsTypeDropdown } from "./TransactionsTypeDropdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/months";
import { TransactionsSliderOption } from "./TransactionsSliderOption";
import { TransactionsSliderNavigation } from "./TransactionsSliderNavigation";
import { useTransactionsController } from "./useTransactionsController";
import { TransactionItem } from "./TransactionItem";
import { TransactionsFiltersModal } from "./FilterModal/TransactionsFiltersModal";
import { Spinner } from "../../../../components/ui/Spinner";
import emptyStateImg from "../../../../../assets/empty-state.svg";

export function Transactions() {
  const {
    sliderState,
    setSliderState,
    initialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    setIsFiltersModalOpen,
    handleApplyFilters,
  } = useTransactionsController();

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {initialLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="text-gray-800" />
        </div>
      ) : (
        <>
          <header>
            <div className="flex items-center justify-between">
              <TransactionsTypeDropdown />
              <button
                onClick={() => setIsFiltersModalOpen(true)}
                className="cursor-pointer"
              >
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

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Spinner className="text-gray-800" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <img src={emptyStateImg} alt="" className="w-40" />
              <p className="text-gray-700 font-medium text-center">
                Não encontramos nenhuma transação!
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  name={transaction.name}
                  date={transaction.date}
                  value={transaction.value}
                  categoryType={transaction.categoryType}
                />
              ))}
            </div>
          )}

          <TransactionsFiltersModal
            open={isFiltersModalOpen}
            onOpenChange={setIsFiltersModalOpen}
            onApplyFilters={handleApplyFilters}
          />
        </>
      )}
    </div>
  );
}
