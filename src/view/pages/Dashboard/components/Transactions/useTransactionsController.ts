import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  name: string;
  date: string;
  value: number;
  categoryType: "income" | "expense";
}

export function useTransactionsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => setInitialLoading(false), 2000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    sliderState,
    setSliderState,
    initialLoading,
    isLoading,
    setIsLoading,
    transactions,
  };
}
