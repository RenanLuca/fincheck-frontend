import { createContext, useState, type ReactNode } from "react";
import type { BankAccount } from "../../../../../app/entities/BankAccount";
import type { Transaction } from "../../../../../app/entities/Transaction";

type TransactionType = "INCOME" | "EXPENSE";

interface AccountModalState {
  open: boolean;
  account: BankAccount | null;
}

interface TransactionModalState {
  open: boolean;
  type: TransactionType | null;
  transaction: Transaction | null;
}

type OpenTransactionModalParams =
  | { type: TransactionType }
  | { transaction: Transaction };

interface DashboardContextValues {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  accountModalState: AccountModalState;
  openAccountModal: (account?: BankAccount) => void;
  closeAccountModal: () => void;
  transactionModalState: TransactionModalState;
  openTransactionModal: (params: OpenTransactionModalParams) => void;
  closeTransactionModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [accountModalState, setAccountModalState] =
    useState<AccountModalState>({ open: false, account: null });
  const [transactionModalState, setTransactionModalState] =
    useState<TransactionModalState>({
      open: false,
      type: null,
      transaction: null,
    });

  function toggleValuesVisibility() {
    setAreValuesVisible((prev) => !prev);
  }

  function openAccountModal(account?: BankAccount) {
    setAccountModalState({ open: true, account: account ?? null });
  }

  function closeAccountModal() {
    setAccountModalState((prev) => ({ ...prev, open: false }));
  }

  function openTransactionModal(params: OpenTransactionModalParams) {
    if ("transaction" in params) {
      setTransactionModalState({
        open: true,
        type: params.transaction.type,
        transaction: params.transaction,
      });
    } else {
      setTransactionModalState({
        open: true,
        type: params.type,
        transaction: null,
      });
    }
  }

  function closeTransactionModal() {
    setTransactionModalState((prev) => ({ ...prev, open: false }));
  }

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        accountModalState,
        openAccountModal,
        closeAccountModal,
        transactionModalState,
        openTransactionModal,
        closeTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
