import { Controller } from "react-hook-form";
import { Modal } from "../../../../components/ui/Modal";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Select } from "../../../../components/ui/Select";
import { CurrencyInput } from "../../../../components/ui/CurrencyInput";
import { AccountColorInput } from "../../../../components/ui/AccountColorInput";
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
  } = useAccountModalController({
    account,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Editar Conta" : "Nova Conta"}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col items-center gap-1">
          <Controller
            name="initialBalance"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <span className="text-sm text-gray-600">
            Saldo
          </span>
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
            />
          )}
        />

        <Button type="submit" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
