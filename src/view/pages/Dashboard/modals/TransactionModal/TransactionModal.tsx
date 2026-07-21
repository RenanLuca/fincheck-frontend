import { Controller } from "react-hook-form";
import { Modal } from "../../../../components/ui/Modal";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Select } from "../../../../components/ui/Select";
import { DateInput } from "../../../../components/ui/DateInput";
import { CurrencyInput } from "../../../../components/ui/CurrencyInput";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { DeleteConfirmationModal } from "../../../../components/ui/DeleteConfirmationModal";
import { useTransactionModalController } from "./useTransactionModalController";
import type { Transaction } from "../../../../../app/entities/Transaction";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "INCOME" | "EXPENSE";
  transaction?: Transaction | null;
}

export function TransactionModal({
  open,
  onOpenChange,
  type,
  transaction,
}: TransactionModalProps) {
  const {
    register,
    control,
    errors,
    categories,
    accounts,
    isEditing,
    resolvedType,
    isLoading,
    handleSubmit,
    isConfirmingDelete,
    openDeleteConfirmation,
    cancelDeleteConfirmation,
    handleConfirmDelete,
    isDeleting,
  } = useTransactionModalController({
    type,
    transaction,
    onClose: () => onOpenChange(false),
  });

  const isExpense = resolvedType === "EXPENSE";
  const title = isEditing
    ? isExpense
      ? "Editar Despesa"
      : "Editar Receita"
    : isExpense
      ? "Nova Despesa"
      : "Nova Receita";
  const nameLabel = isExpense
    ? "Nome da Despesa"
    : "Nome da Receita";
  const accountLabel = isExpense
    ? "Pagar com"
    : "Receber na conta";

  return (
    <>
      <Modal
        open={open && !isConfirmingDelete}
        onOpenChange={onOpenChange}
        title={title}
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
        <form onSubmit={handleSubmit}>
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                value={field.value}
                onValueChange={field.onChange}
                error={errors.value?.message}
              />
            )}
          />

          <div className="mt-8 flex flex-col gap-4">
            <Input
              label={nameLabel}
              error={errors.name?.message}
              {...register("name")}
            />

            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  label="Categoria"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
              )}
            />

            <Controller
              name="bankAccountId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  label={accountLabel}
                  value={field.value}
                  onValueChange={field.onChange}
                  options={accounts.map((account) => ({
                    value: account.id,
                    label: account.name,
                  }))}
                  error={errors.bankAccountId?.message}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DateInput
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.date?.message}
                />
              )}
            />

            <Button type="submit" isLoading={isLoading}>
              Salvar
            </Button>
          </div>
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
        question="Tem certeza que deseja excluir esta transação?"
        description="Ao excluir a transação, o saldo da conta relacionada será atualizado."
      />
    </>
  );
}
