import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full flex flex-col px-4 py-8 md:p-10">
      <div>
        <span className="text-white block">Saldo Total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
            <EyeIcon open />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end items-start">
        <div className="w-full flex items-center justify-between">
          <strong className="text-white text-lg">MINHAS CONTAS</strong>
          <div>
            <button className="p-3 rounded-full enabled:hover:bg-black/20 cursor-pointer transition-colors disabled:opacity-40">
              <ChevronLeftIcon className="text-white w-6 h-6" />
            </button>
            <button className="p-3 rounded-full enabled:hover:bg-black/20 cursor-pointer transition-colors disabled:opacity-40">
              <ChevronRightIcon className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="mt-4 w-full flex ">
          <Swiper>
            <AccountCard
              balance={11123.23}
              color="#333"
              name="Nubank"
              type="CASH"
            />
            <AccountCard
              balance={11123.23}
              color="#333"
              name="Nubank"
              type="CASH"
            />
            <AccountCard
              balance={11123.23}
              color="#333"
              name="Nubank"
              type="CASH"
            />
          </Swiper>
        </div>
      </div>
    </div>
  );
}
