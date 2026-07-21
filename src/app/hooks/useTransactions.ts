import { useMemo } from "react";
import {
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { TransactionsService } from "../services/transactionsService";
import type { TransactionsFilters } from "../entities/Transaction";

export const TRANSACTIONS_QUERY_KEY = ["transactions"];

export function useTransactions(filters: TransactionsFilters) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
    ...query
  } = useInfiniteQuery({
    queryKey: [...TRANSACTIONS_QUERY_KEY, filters],
    queryFn: ({ pageParam }) =>
      TransactionsService.findAll({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page < lastPage.meta.totalPages
        ? lastPage.meta.page + 1
        : undefined,
    placeholderData: keepPreviousData,
  });

  const transactions = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return {
    transactions,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isPending,
    isFetching,
    ...query,
  };
}
