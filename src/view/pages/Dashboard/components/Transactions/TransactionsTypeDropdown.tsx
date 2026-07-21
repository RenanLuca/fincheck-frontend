import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/DropdownMenu";

type TransactionType = "INCOME" | "EXPENSE" | null;

interface TransactionsTypeDropdownProps {
  value: TransactionType;
  onValueChange: (value: TransactionType) => void;
}

const OPTIONS: {
  value: TransactionType;
  label: string;
  Icon: typeof IncomeIcon;
}[] = [
  { value: "INCOME", label: "Receitas", Icon: IncomeIcon },
  { value: "EXPENSE", label: "Despesas", Icon: ExpensesIcon },
  { value: null, label: "Transações", Icon: TransactionsIcon },
];

export function TransactionsTypeDropdown({
  value,
  onValueChange,
}: TransactionsTypeDropdownProps) {
  const selected =
    OPTIONS.find((option) => option.value === value) ??
    OPTIONS[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="select-none">
        <button className="flex items-center gap-2 cursor-pointer outline-none">
          <selected.Icon />
          <span className="text-sm text-gray-800 font-medium ">
            {selected.label}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-70">
        {OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="gap-2"
            onSelect={() => onValueChange(option.value)}
          >
            <option.Icon />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
