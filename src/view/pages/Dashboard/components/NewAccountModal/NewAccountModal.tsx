import { NumericFormat } from "react-number-format";
import { Modal } from "../../../../components/ui/Modal";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Select } from "../../../../components/ui/Select";
import { AccountColorInput } from "./AccountColorInput";
import { useNewAccountModalController } from "./useNewAccountModalController";

const ACCOUNT_TYPE_OPTIONS = [
  { value: "CHECKING", label: "Conta Corrente" },
  { value: "INVESTMENT", label: "Investimento" },
  { value: "CASH", label: "Dinheiro" },
];

interface NewAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewAccountModal({ open, onOpenChange }: NewAccountModalProps) {
  const {
    initialBalance,
    setInitialBalance,
    name,
    setName,
    type,
    setType,
    color,
    setColor,
    isSaveButtonDisabled,
    handleSubmit,
  } = useNewAccountModalController();

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Nova Conta">
      <div className="flex flex-col items-center gap-1">
        <NumericFormat
          value={initialBalance}
          onValueChange={(values) => setInitialBalance(values.floatValue)}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          prefix="R$ "
          placeholder="R$ 0,00"
          className="w-full border-none bg-transparent text-center text-3xl font-bold text-gray-800 outline-none"
        />
        <span className="text-sm text-gray-600">Saldo</span>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Input
          label="Nome da Conta"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Select
          label="Tipo"
          value={type}
          onValueChange={setType}
          options={ACCOUNT_TYPE_OPTIONS}
        />

        <AccountColorInput value={color} onValueChange={setColor} />

        <Button onClick={handleSubmit} disabled={isSaveButtonDisabled}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
