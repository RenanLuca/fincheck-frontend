import { httpClient } from "../httpClient";
import type { BankAccountType } from "../../entities/BankAccount";

interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
}

export async function update({
  id,
  name,
  initialBalance,
  color,
  type,
}: UpdateBankAccountParams) {
  const { data } = await httpClient.put(
    `/bank-accounts/${id}`,
    {
      name,
      initialBalance,
      type,
      color,
    },
  );

  return data;
}
