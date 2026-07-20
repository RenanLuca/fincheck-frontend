import { useDashboard } from "./DashboardContext/useDashboard";
import { NewAccountModal } from "./NewAccountModal/NewAccountModal";
import { TransactionModal } from "./TransactionModal/TransactionModal";

export function DashboardModals() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    transactionModalType,
    closeTransactionModal,
  } = useDashboard();

  return (
    <>
      <NewAccountModal
        open={isNewAccountModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeNewAccountModal();
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
