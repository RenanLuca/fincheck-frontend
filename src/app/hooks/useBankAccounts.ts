import { useQuery } from "@tanstack/react-query";
import { BankAccountService } from "../services/bankAccountService";

export const BANK_ACCOUNTS_QUERY_KEY = ["bank-accounts"];

export function useBankAccounts() {
  return useQuery({
    queryKey: BANK_ACCOUNTS_QUERY_KEY,
    queryFn: BankAccountService.findAll,
  });
}
