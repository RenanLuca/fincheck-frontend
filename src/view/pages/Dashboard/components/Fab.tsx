import { useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Expense } from "../../../components/icons/categories/expense/Expense";
import { Income } from "../../../components/icons/categories/income/Income";
import { BankAccountIcon } from "../../../components/icons/BankAccountIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/DropdownMenu";
import { useDashboard } from "./DashboardContext/useDashboard";

export function Fab() {
  const [isOpen, setIsOpen] = useState(false);
  const { openAccountModal, openTransactionModal } = useDashboard();

  const options = [
    {
      label: "Nova Despesa",
      Icon: Expense,
      onClick: () => openTransactionModal("EXPENSE"),
    },
    {
      label: "Nova Receita",
      Icon: Income,
      onClick: () => openTransactionModal("INCOME"),
    },
    {
      label: "Nova Conta",
      Icon: BankAccountIcon,
      onClick: () => openAccountModal(),
    },
  ];

  return (
    <div className="fixed bottom-4 right-4">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="w-14 h-14 rounded-full bg-teal-900 flex items-center justify-center cursor-pointer transition-colors hover:bg-teal-800">
            {isOpen ? (
              <Cross2Icon className="text-white w-6 h-6" />
            ) : (
              <PlusIcon className="text-white w-6 h-6" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" align="end" className="w-56">
          {options.map(({ label, Icon, onClick }) => (
            <DropdownMenuItem key={label} className="gap-3" onSelect={onClick}>
              <Icon />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
