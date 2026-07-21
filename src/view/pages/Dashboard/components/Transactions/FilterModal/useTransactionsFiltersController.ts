import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import type { TransactionsFilters } from "../../../../../../app/entities/Transaction";

interface UseTransactionsFiltersControllerParams {
  onApplyFilters: (
    filters: Partial<TransactionsFilters>,
  ) => void;
}

export function useTransactionsFiltersController({
  onApplyFilters,
}: UseTransactionsFiltersControllerParams) {
  const { accounts } = useBankAccounts();
  const [selectedAccountId, setSelectedAccountId] =
    useState<string | null>(null);
  const [year, setYear] = useState(() =>
    new Date().getFullYear(),
  );

  function selectAccount(accountId: string) {
    setSelectedAccountId((prev) =>
      prev === accountId ? null : accountId,
    );
  }

  function goToPreviousYear() {
    setYear((prev) => prev - 1);
  }

  function goToNextYear() {
    setYear((prev) => prev + 1);
  }

  function handleApplyFilters() {
    onApplyFilters({
      bankAccountId: selectedAccountId,
      year,
    });
  }

  return {
    accounts,
    selectedAccountId,
    selectAccount,
    year,
    goToPreviousYear,
    goToNextYear,
    handleApplyFilters,
  };
}
