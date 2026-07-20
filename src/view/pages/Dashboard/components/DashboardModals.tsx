import { useDashboard } from "./DashboardContext/useDashboard";
import { NewAccountModal } from "./NewAccountModal/NewAccountModal";

export function DashboardModals() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return (
    <NewAccountModal
      open={isNewAccountModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeNewAccountModal();
        }
      }}
    />
  );
}
