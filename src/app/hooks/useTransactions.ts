import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { TransactionsService } from "../services/transactionsService";
import type { TransactionsFilters } from "../entities/Transaction";

export const TRANSACTIONS_QUERY_KEY = ["transactions"];

export function useTransactions(filters: TransactionsFilters) {
  const { data, refetch, ...query } = useQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: () => TransactionsService.findAll(filters),
  });

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.month,
    filters.year,
    filters.bankAccountId,
    filters.type,
    refetch,
  ]);

  return { transactions: data?.data ?? [], refetch, ...query };
}
