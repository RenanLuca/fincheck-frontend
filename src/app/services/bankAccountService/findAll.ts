import { httpClient } from "../httpClient";
import type { BankAccount } from "../../entities/BankAccount";

export async function findAll() {
  const { data } = await httpClient.get<BankAccount[]>(
    "/bank-accounts",
  );
  return data;
}
