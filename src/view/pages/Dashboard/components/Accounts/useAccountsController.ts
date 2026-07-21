import { useMemo, useState } from "react";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data: accounts = [], isLoading } = useBankAccounts();

  const currentBalance = useMemo(
    () =>
      accounts.reduce(
        (total, account) => total + account.currentBalance,
        0,
      ),
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
