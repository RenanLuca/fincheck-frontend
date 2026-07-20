import { useState } from "react";

interface Account {
  id: string;
  name: string;
}

// TODO: substituir por uma busca em GET /bank-accounts quando integrarmos a API
const MOCKED_ACCOUNTS: Account[] = [
  { id: "1", name: "XP Investimentos" },
  { id: "2", name: "Nubank" },
  { id: "3", name: "Carteira" },
];

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
    accounts: MOCKED_ACCOUNTS,
    selectedAccountId,
    selectAccount,
    year,
    goToPreviousYear,
    goToNextYear,
    handleApplyFilters,
  };
}
