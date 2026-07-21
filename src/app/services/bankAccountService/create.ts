import { httpClient } from "../httpClient";
import type { BankAccountType } from "../../entities/BankAccount";

interface BankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
}

export async function create({
  name,
  initialBalance,
  color,
  type,
}: BankAccountParams) {
  const { data } = await httpClient.post("/bank-accounts", {
    name,
    initialBalance,
    type,
    color,
  });

  return data;
}
