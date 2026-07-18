import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../components/icons/BankAccountTypeIcon";
import type { iconsMap } from "../../../components/icons/BankAccountTypeIcon/iconsMap";
interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: keyof typeof iconsMap;
}

export function AccountCard({ color, name, balance, type }: AccountCardProps) {
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
        <span className="text-gray-800 font-medium block">
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo Atual</small>
      </div>
    </div>
  );
}
