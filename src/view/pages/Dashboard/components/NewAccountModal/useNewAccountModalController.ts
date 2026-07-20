import { useState } from "react";
import type { AccountColor } from "../../../../../app/config/accountColors";

export function useNewAccountModalController() {
  const [initialBalance, setInitialBalance] = useState<number | undefined>(
    undefined,
  );
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState<AccountColor | null>(null);

  const isSaveButtonDisabled = !name || !type || !color;

  function handleSubmit() {
    // TODO: enviar para a API (POST /bank-accounts) quando integrarmos
    console.log({ name, initialBalance, type, color: color?.color });
  }

  return {
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
  };
}
