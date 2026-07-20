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

export function TransactionsTypeDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="select-none">
        <button className="flex items-center gap-2 cursor-pointer outline-none">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 font-medium ">Transações</span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-70">
        <DropdownMenuItem className="gap-2">
          <IncomeIcon />
          Receitas
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <TransactionsIcon />
          Transações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
