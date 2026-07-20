import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { useDashboard } from "../useDashboard";

export function Accounts() {
  const { sliderState, setSliderState } = useAccountsController();
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full flex flex-col px-4 py-8 md:p-10">
      <div>
        <span className="text-white block">Saldo Total</span>
        <div className="flex items-center gap-2">
          <strong
            className={cn(
              "text-2xl tracking-[-1px] text-white",
              !areValuesVisible && "blur-sm select-none",
            )}
          >
            {formatCurrency(100000)}
          </strong>

          <button
            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-all hover:scale-110 hover:bg-white/10"
            onClick={toggleValuesVisibility}
          >
            <EyeIcon open={areValuesVisible} />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth <= 500 ? 1 : 2.2}
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
            <div
              className="w-full flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white text-lg">Minhas Contas</strong>
              <AccountsSliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <SwiperSlide>
              <AccountCard
                balance={11123.23}
                color="#333"
                name="Nubank"
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                balance={11123.23}
                color="#333"
                name="Nubank"
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                balance={11123.23}
                color="#333"
                name="Nubank"
                type="CASH"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
