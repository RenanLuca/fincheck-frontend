import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BankAccountService } from "../../../../../app/services/bankAccountService";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ["bank-accounts"],
    queryFn: BankAccountService.findAll,
  });

  const currentBalance = useMemo(
    () =>
      accounts.reduce((total, account) => total + account.currentBalance, 0),
    [accounts],
  );

  return {
    sliderState,
    setSliderState,
    isLoading,
    accounts,
    currentBalance,
  };
}
