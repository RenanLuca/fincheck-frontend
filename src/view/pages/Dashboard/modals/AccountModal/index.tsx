import { Controller } from "react-hook-form";
import { Modal } from "../../../../components/ui/Modal";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Select } from "../../../../components/ui/Select";
import { CurrencyInput } from "../../../../components/ui/CurrencyInput";
import { AccountColorInput } from "../../../../components/ui/AccountColorInput";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { DeleteConfirmationModal } from "../../../../components/ui/DeleteConfirmationModal";
import { useAccountModalController } from "./useAccountModalController";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

const ACCOUNT_TYPE_OPTIONS = [
  { value: "CHECKING", label: "Conta Corrente" },
  { value: "INVESTMENT", label: "Investimento" },
  { value: "CASH", label: "Dinheiro" },
];

interface AccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: BankAccount | null;
}

export function AccountModal({
  open,
  onOpenChange,
  account,
}: AccountModalProps) {
  const {
    register,
    control,
    errors,
    handleSubmit,
    isLoading,
    isEditing,
    isConfirmingDelete,
    openDeleteConfirmation,
    cancelDeleteConfirmation,
    handleConfirmDelete,
    isDeleting,
  } = useAccountModalController({
    account,
    onClose: () => onOpenChange(false),
  });

  return (
    <>
      <Modal
        open={open && !isConfirmingDelete}
        onOpenChange={onOpenChange}
        title={isEditing ? "Editar Conta" : "Nova Conta"}
        rightAction={
          isEditing ? (
            <button
              onClick={openDeleteConfirmation}
              className="cursor-pointer outline-none"
            >
              <TrashIcon className="h-5 w-5 text-red-600" />
            </button>
          ) : undefined
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-1">
            <Controller
              name="initialBalance"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.initialBalance?.message}
                />
              )}
            />
            <span className="text-sm text-gray-600">Saldo</span>
          </div>

          <Input
            label="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            defaultValue="CHECKING"
            render={({ field }) => (
              <Select
                label="Tipo"
                value={field.value}
                onValueChange={field.onChange}
                options={ACCOUNT_TYPE_OPTIONS}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <AccountColorInput
                value={field.value ?? null}
                onValueChange={field.onChange}
                error={errors.color?.message}
              />
            )}
          />

          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </form>
      </Modal>

      <DeleteConfirmationModal
        open={open && isConfirmingDelete}
        onOpenChange={(open) => {
          if (!open) {
            cancelDeleteConfirmation();
          }
        }}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        question="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
      />
    </>
  );
}
