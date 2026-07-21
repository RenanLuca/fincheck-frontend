import {
  DayPicker,
  type DayPickerProps,
} from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Calendar(props: DayPickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={false}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      classNames={{
        months: "relative",
        month_caption:
          "flex h-9 items-center px-1 text-base font-bold capitalize text-gray-800",
        nav: "absolute right-0 top-0 flex items-center gap-1",
        button_previous:
          "flex h-8 w-8 cursor-pointer font-bold items-center justify-center rounded-full text-teal-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30",
        button_next:
          "flex h-8 w-8 cursor-pointer font-bold items-center justify-center rounded-full text-teal-800 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30",
        month_grid: "mt-4 w-full border-collapse",
        weekday:
          "pb-2 text-xs font-medium uppercase text-gray-400",
        day: "p-0.5 text-center",
        day_button:
          "mx-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm text-gray-800 transition-colors hover:bg-gray-100 [.rdp-selected_&]:bg-teal-900 [.rdp-selected_&]:font-medium [.rdp-selected_&]:text-white [.rdp-selected_&]:hover:bg-teal-900",
      }}
      {...props}
    />
  );
}
