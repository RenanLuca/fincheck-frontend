import { useQuery } from "@tanstack/react-query";
import { BankAccountService } from "../services/bankAccountService";

export const BANK_ACCOUNTS_QUERY_KEY = ["bank-accounts"];

export function useBankAccounts() {
  const { data: accounts = [], ...query } = useQuery({
    queryKey: BANK_ACCOUNTS_QUERY_KEY,
    queryFn: BankAccountService.findAll,
    staleTime: 1000 * 60 * 5,
  });

  return { accounts, ...query };
}
