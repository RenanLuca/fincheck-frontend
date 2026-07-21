import { httpClient } from "../httpClient";
import type {
  Transaction,
  TransactionsFilters,
} from "../../entities/Transaction";

interface FindAllParams extends TransactionsFilters {
  page: number;
}

interface FindAllResponse {
  data: Transaction[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function findAll({
  month,
  year,
  bankAccountId,
  type,
  page,
}: FindAllParams) {
  const { data } = await httpClient.get<FindAllResponse>(
    "/transactions",
    {
      params: {
        month,
        year,
        bankAccountId: bankAccountId ?? undefined,
        type: type ?? undefined,
        page,
      },
    },
  );

  return data;
}
