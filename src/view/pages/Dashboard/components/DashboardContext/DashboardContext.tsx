import { createContext, useState, type ReactNode } from "react";

interface DashboardContextValues {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValues);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

  function toggleValuesVisibility() {
    setAreValuesVisible((prev) => !prev);
  }

  function openNewAccountModal() {
    setIsNewAccountModalOpen(true);
  }

  function closeNewAccountModal() {
    setIsNewAccountModalOpen(false);
  }

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
