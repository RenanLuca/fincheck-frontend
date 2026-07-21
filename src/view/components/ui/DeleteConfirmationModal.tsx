import { TrashIcon } from "../icons/TrashIcon";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  question: string;
  description: string;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  question,
  description,
}: DeleteConfirmationModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Excluir">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <TrashIcon className="h-6 w-6 text-red-600" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <strong className="text-lg font-bold text-gray-800">
            {question}
          </strong>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            Sim, desejo excluir
          </Button>

          <button
            onClick={() => onOpenChange(false)}
            className="h-13 w-full cursor-pointer rounded-2xl border border-gray-300 font-medium text-gray-800 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
