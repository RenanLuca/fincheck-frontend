import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

interface TransactionItemProps {
  name: string;
  date: string;
  value: number;
  categoryType: "income" | "expense";
}

export function TransactionItem({
  name,
  date,
  value,
  categoryType,
}: TransactionItemProps) {
  const { areValuesVisible } = useDashboard();

  return (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
      <div className="flex-1 flex items-center gap-3">
        <CategoryIcon type={categoryType} />
        <div>
          <strong className="font-bold tracking-[-0.5px] block">
            {name}
          </strong>
          <span className="text-sm text-gray-600">{date}</span>
        </div>
      </div>
      <span
        className={cn(
          "text-red-800 tracking-[-0.5px] font-medium",
          !areValuesVisible && "blur-sm select-none",
        )}
      >
        - {formatCurrency(value)}
      </span>
    </div>
  );
}
