import { useState } from "react";
import { ACCOUNTS } from "../../../../../../app/config/accounts";

export interface TransactionsFilters {
  bankAccountId: string | null;
  year: number;
}

interface UseTransactionsFiltersControllerParams {
  onApplyFilters: (filters: TransactionsFilters) => void;
}

export function useTransactionsFiltersController({
  onApplyFilters,
}: UseTransactionsFiltersControllerParams) {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [year, setYear] = useState(() => new Date().getFullYear());

  function selectAccount(accountId: string) {
    setSelectedAccountId((prev) => (prev === accountId ? null : accountId));
  }

  function goToPreviousYear() {
    setYear((prev) => prev - 1);
  }

  function goToNextYear() {
    setYear((prev) => prev + 1);
  }

  function handleApplyFilters() {
    onApplyFilters({ bankAccountId: selectedAccountId, year });
  }

  return {
    accounts: ACCOUNTS,
    selectedAccountId,
    selectAccount,
    year,
    goToPreviousYear,
    goToNextYear,
    handleApplyFilters,
  };
}
