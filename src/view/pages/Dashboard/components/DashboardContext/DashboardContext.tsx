import { createContext, useState, type ReactNode } from "react";

type TransactionType = "INCOME" | "EXPENSE";

interface DashboardContextValues {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  transactionModalType: TransactionType | null;
  openTransactionModal: (type: TransactionType) => void;
  closeTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [transactionModalType, setTransactionModalType] =
    useState<TransactionType | null>(null);

  function toggleValuesVisibility() {
    setAreValuesVisible((prev) => !prev);
  }

  function openNewAccountModal() {
    setIsNewAccountModalOpen(true);
  }

  function closeNewAccountModal() {
    setIsNewAccountModalOpen(false);
  }

  function openTransactionModal(type: TransactionType) {
    setTransactionModalType(type);
  }

  function closeTransactionModal() {
    setTransactionModalType(null);
  }

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        transactionModalType,
        openTransactionModal,
        closeTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
