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
    name,
    setName,
    value,
    setValue,
    categoryId,
    setCategoryId,
    bankAccountId,
    setBankAccountId,
    date,
    setDate,
    categories,
    accounts,
    isSaveButtonDisabled,
    handleSubmit,
  } = useTransactionModalController({ type });

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
      <CurrencyInput
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
      />

      <div className="mt-8 flex flex-col gap-4">
        <Input
          label={nameLabel}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Select
          label="Categoria"
          value={categoryId}
          onValueChange={setCategoryId}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />

        <Select
          label={accountLabel}
          value={bankAccountId}
          onValueChange={setBankAccountId}
          options={accounts.map((account) => ({
            value: account.id,
            label: account.name,
          }))}
        />

        <DateInput value={date} onValueChange={setDate} />

        <Button
          onClick={handleSubmit}
          disabled={isSaveButtonDisabled}
        >
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
