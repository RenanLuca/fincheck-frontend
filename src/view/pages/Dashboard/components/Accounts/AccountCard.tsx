import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import type { iconsMap } from "../../../../components/icons/BankAccountTypeIcon/iconsMap";
import { useDashboard } from "../DashboardContext/useDashboard";
interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: keyof typeof iconsMap;
}

export function AccountCard({ color, name, balance, type }: AccountCardProps) {
  const { areValuesVisible } = useDashboard();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-50 flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium mt-4 block">{name}</span>
      </div>
      <div>
        <span
          className={cn(
            "text-gray-800 font-medium block",
            !areValuesVisible && "blur-sm select-none",
          )}
        >
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo Atual</small>
      </div>
    </div>
  );
}
