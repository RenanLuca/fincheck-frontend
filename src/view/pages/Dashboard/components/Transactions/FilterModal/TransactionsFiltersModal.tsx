import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "../../../../../components/ui/Modal";
import { Button } from "../../../../../components/ui/Button";
import { cn } from "../../../../../../app/utils/cn";
import { useTransactionsFiltersController } from "./useTransactionsFiltersController";
import type { TransactionsFilters } from "../../../../../../app/entities/Transaction";

interface TransactionsFiltersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (
    filters: Partial<TransactionsFilters>,
  ) => void;
}

export function TransactionsFiltersModal({
  open,
  onOpenChange,
  onApplyFilters,
}: TransactionsFiltersModalProps) {
  const {
    accounts,
    selectedAccountId,
    selectAccount,
    year,
    goToPreviousYear,
    goToNextYear,
    handleApplyFilters,
  } = useTransactionsFiltersController({ onApplyFilters });

  function handleSubmit() {
    handleApplyFilters();
    onOpenChange(false);
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Filtros"
    >
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-sm font-bold text-gray-800">
            Conta
          </span>
          <div className="mt-2 flex flex-col gap-1">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => selectAccount(account.id)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100",
                  selectedAccountId === account.id &&
                    "bg-gray-100",
                )}
              >
                {account.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-bold text-gray-800">
            Ano
          </span>
          <div className="mt-2 flex w-fit items-center gap-3">
            <button
              onClick={goToPreviousYear}
              className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-900" />
            </button>
            <span className="text-sm font-medium text-gray-800">
              {year}
            </span>
            <button
              onClick={goToNextYear}
              className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-900" />
            </button>
          </div>
        </div>

        <Button onClick={handleSubmit}>
          Aplicar Filtros
        </Button>
      </div>
    </Modal>
  );
}
