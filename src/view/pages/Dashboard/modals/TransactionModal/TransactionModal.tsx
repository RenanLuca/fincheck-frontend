import { Controller } from "react-hook-form";
import { Modal } from "../../../../components/ui/Modal";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Select } from "../../../../components/ui/Select";
import { DateInput } from "../../../../components/ui/DateInput";
import { CurrencyInput } from "../../../../components/ui/CurrencyInput";
import { useTransactionModalController } from "./useTransactionModalController";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "INCOME" | "EXPENSE";
}

export function TransactionModal({
  open,
  onOpenChange,
  type,
}: TransactionModalProps) {
  const {
    register,
    control,
    errors,
    categories,
    accounts,
    isLoading,
    handleSubmit,
  } = useTransactionModalController({
    type,
    onSuccess: () => onOpenChange(false),
  });

  const isExpense = type === "EXPENSE";
  const title = isExpense ? "Nova Despesa" : "Nova Receita";
  const nameLabel = isExpense
    ? "Nome da Despesa"
    : "Nome da Receita";
  const accountLabel = isExpense
    ? "Pagar com"
    : "Receber na conta";

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
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
  );
}
