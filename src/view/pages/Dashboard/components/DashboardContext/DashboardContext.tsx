import {
  createContext,
  useState,
  type ReactNode,
} from "react";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

type TransactionType = "INCOME" | "EXPENSE";

interface AccountModalState {
  open: boolean;
  account: BankAccount | null;
}

interface DashboardContextValues {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  accountModalState: AccountModalState;
  openAccountModal: (account?: BankAccount) => void;
  closeAccountModal: () => void;
  transactionModalType: TransactionType | null;
  openTransactionModal: (type: TransactionType) => void;
  closeTransactionModal: () => void;
}

export const DashboardContext = createContext(
  {} as DashboardContextValues,
);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] =
    useState(true);
  const [accountModalState, setAccountModalState] =
    useState<AccountModalState>({
      open: false,
      account: null,
    });
  const [transactionModalType, setTransactionModalType] =
    useState<TransactionType | null>(null);

  function toggleValuesVisibility() {
    setAreValuesVisible((prev) => !prev);
  }

  function openAccountModal(account?: BankAccount) {
    setAccountModalState({
      open: true,
      account: account ?? null,
    });
  }

  function closeAccountModal() {
    setAccountModalState((prev) => ({
      ...prev,
      open: false,
    }));
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
        accountModalState,
        openAccountModal,
        closeAccountModal,
        transactionModalType,
        openTransactionModal,
        closeTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
