import { useState } from "react";
import { CATEGORIES } from "../../../../../app/config/categories";
import { ACCOUNTS } from "../../../../../app/config/accounts";

interface UseTransactionModalControllerParams {
  type: "INCOME" | "EXPENSE";
}

export function useTransactionModalController({
  type,
}: UseTransactionModalControllerParams) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number | undefined>(undefined);
  const [categoryId, setCategoryId] = useState("");
  const [bankAccountId, setBankAccountId] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const categories = CATEGORIES.filter((category) => category.type === type);
  const accounts = ACCOUNTS;

  const isSaveButtonDisabled = !name || !value || !bankAccountId || !date;

  function handleSubmit() {
    // TODO: enviar para a API (POST /transactions) quando integrarmos
    console.log({
      name,
      value,
      type,
      categoryId: categoryId || undefined,
      bankAccountId,
      date: date?.toISOString(),
    });
  }

  return {
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
  };
}
