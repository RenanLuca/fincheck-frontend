import { useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { TransactionsFilters } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [isFiltersModalOpen, setIsFiltersModalOpen] =
    useState(false);
  const [filters, setFilters] =
    useState<TransactionsFilters>({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      bankAccountId: null,
      type: null,
    });

  const { transactions, isLoading, isRefetching } =
    useTransactions(filters);

  function updateFilters(
    newFilters: Partial<TransactionsFilters>,
  ) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }

  return {
    sliderState,
    setSliderState,
    initialLoading: isLoading,
    isLoading: isRefetching,
    transactions,
    isFiltersModalOpen,
    setIsFiltersModalOpen,
    filters,
    updateFilters,
  };
}
