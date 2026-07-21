import { httpClient } from "../httpClient";
import type { TransactionParams } from "./create";

interface UpdateTransactionParams extends TransactionParams {
  id: string;
}

export async function update({
  id,
  name,
  value,
  date,
  type,
  bankAccountId,
  categoryId,
}: UpdateTransactionParams) {
  const { data } = await httpClient.put(
    `/transactions/${id}`,
    {
      name,
      value,
      date,
      type,
      bankAccountId,
      categoryId,
    },
  );

  return data;
}
