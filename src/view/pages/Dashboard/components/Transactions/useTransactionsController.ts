import { useEffect, useState } from "react";
import type { TransactionsFilters } from "./FilterModal/useTransactionsFiltersController";

interface Transaction {
  id: string;
  name: string;
  date: string;
  value: number;
  categoryType: "income" | "expense";
}

export function useTransactionsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [initialLoading, setInitialLoading] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions] = useState<Transaction[]>([]);
  const [isFiltersModalOpen, setIsFiltersModalOpen] =
    useState(false);
  const [filters, setFilters] =
    useState<TransactionsFilters>({
      bankAccountId: null,
      year: new Date().getFullYear(),
    });

  useEffect(() => {
    const timeout = setTimeout(
      () => setInitialLoading(false),
      2000,
    );

    return () => clearTimeout(timeout);
  }, []);

  function handleApplyFilters(
    newFilters: TransactionsFilters,
  ) {
    setFilters(newFilters);
    // TODO: refazer a busca das transações na API usando esses filtros
  }

  return {
    sliderState,
    setSliderState,
    initialLoading,
    isLoading,
    setIsLoading,
    transactions,
    isFiltersModalOpen,
    setIsFiltersModalOpen,
    filters,
    handleApplyFilters,
  };
}
