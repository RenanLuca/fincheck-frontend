import { useEffect, useState } from "react";
import type { iconsMap } from "../../../../components/icons/BankAccountTypeIcon/iconsMap";

interface Account {
  id: string;
  name: string;
  balance: number;
  color: string;
  type: keyof typeof iconsMap;
}

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [accounts] = useState<Account[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    sliderState,
    setSliderState,
    isLoading,
    accounts,
  };
}
