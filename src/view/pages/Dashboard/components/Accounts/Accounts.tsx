import { PlusIcon } from "@radix-ui/react-icons";
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
import { Spinner } from "../../../../components/ui/Spinner";

export function Accounts() {
  const { sliderState, setSliderState, isLoading, accounts } =
    useAccountsController();
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  return (
    <div className="bg-teal-900 rounded-2xl w-full justify-between h-full flex flex-col px-4 py-8 md:p-10">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="text-white" />
        </div>
      ) : (
        <>
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

          {accounts.length === 0 ? (
            <div className="flex flex-col mt-10 md:mt-0">
              <strong className="text-white text-lg block mb-4">
                Minhas Contas
              </strong>
              <div className="h-50 flex items-center justify-center rounded-2xl border border-dashed border-white/90">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="text-white w-6 h-6" />
                  </div>
                  <span className="text-white font-medium text-center">
                    Cadastre uma
                    <br />
                    nova conta
                  </span>
                </div>
              </div>
            </div>
          ) : (
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
                    <strong className="text-white text-lg">
                      Minhas Contas
                    </strong>
                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard
                        balance={account.balance}
                        color={account.color}
                        name={account.name}
                        type={account.type}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
