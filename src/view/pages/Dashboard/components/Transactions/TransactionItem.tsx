import { format } from "date-fns";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

interface TransactionItemProps {
  name: string;
  date: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  categoryIcon?: string;
  onClick?: () => void;
}

export function TransactionItem({
  name,
  date,
  value,
  type,
  categoryIcon,
  onClick,
}: TransactionItemProps) {
  const { areValuesVisible } = useDashboard();
  const isExpense = type === "EXPENSE";

  return (
    <button
      onClick={onClick}
      className="bg-white p-4 rounded-2xl flex w-full cursor-pointer items-center justify-between gap-4 text-left"
    >
      <div className="flex-1 flex items-center gap-3">
        <CategoryIcon
          type={isExpense ? "expense" : "income"}
          category={categoryIcon}
        />
        <div>
          <strong className="font-bold tracking-[-0.5px] block">
            {name}
          </strong>
          <span className="text-sm text-gray-600">
            {format(new Date(date), "dd/MM/yyyy")}
          </span>
        </div>
      </div>
      <span
        className={cn(
          "tracking-[-0.5px] font-medium",
          isExpense ? "text-red-800" : "text-green-700",
          !areValuesVisible && "blur-sm select-none",
        )}
      >
        {isExpense ? "-" : "+"} {formatCurrency(value)}
      </span>
    </button>
  );
}
