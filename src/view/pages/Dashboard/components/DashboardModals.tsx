import { useDashboard } from "./DashboardContext/useDashboard";
import { AccountModal } from "../modals/AccountModal";
import { TransactionModal } from "../modals/TransactionModal/TransactionModal";

export function DashboardModals() {
  const {
    accountModalState,
    closeAccountModal,
    transactionModalType,
    closeTransactionModal,
  } = useDashboard();

  return (
    <>
      <AccountModal
        key={accountModalState.account?.id ?? "new"}
        open={accountModalState.open}
        account={accountModalState.account}
        onOpenChange={(open) => {
          if (!open) {
            closeAccountModal();
          }
        }}
      />

      {transactionModalType && (
        <TransactionModal
          open
          type={transactionModalType}
          onOpenChange={(open) => {
            if (!open) {
              closeTransactionModal();
            }
          }}
        />
      )}
    </>
  );
}
