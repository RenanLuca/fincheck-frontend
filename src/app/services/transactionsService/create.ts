import { httpClient } from "../httpClient";

export interface TransactionParams {
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
  bankAccountId: string;
  categoryId?: string;
}

export async function create({
  name,
  value,
  date,
  type,
  bankAccountId,
  categoryId,
}: TransactionParams) {
  const { data } = await httpClient.post("/transactions", {
    name,
    value,
    date,
    type,
    bankAccountId,
    categoryId,
  });

  return data;
}
