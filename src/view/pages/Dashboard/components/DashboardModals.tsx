import { useDashboard } from "./DashboardContext/useDashboard";
import { AccountModal } from "../modals/AccountModal";
import { TransactionModal } from "../modals/TransactionModal/TransactionModal";

export function DashboardModals() {
  const {
    accountModalState,
    closeAccountModal,
    transactionModalState,
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

      <TransactionModal
        key={
          transactionModalState.transaction?.id ??
          transactionModalState.type ??
          "new"
        }
        open={transactionModalState.open}
        type={transactionModalState.type ?? undefined}
        transaction={transactionModalState.transaction}
        onOpenChange={(open) => {
          if (!open) {
            closeTransactionModal();
          }
        }}
      />
    </>
  );
}
