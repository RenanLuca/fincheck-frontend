import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBankAccounts, BANK_ACCOUNTS_QUERY_KEY } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { TransactionsService } from "../../../../../app/services/transactionsService";

interface UseTransactionModalControllerParams {
  type: "INCOME" | "EXPENSE";
  onSuccess: () => void;
}

export function useTransactionModalController({
  type,
  onSuccess,
}: UseTransactionModalControllerParams) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number | undefined>(
    undefined,
  );
  const [categoryId, setCategoryId] = useState("");
  const [bankAccountId, setBankAccountId] = useState("");
  const [date, setDate] = useState<Date | undefined>(
    new Date(),
  );

  const { data: allCategories = [] } = useCategories();
  const { data: accounts = [] } = useBankAccounts();

  const categories = allCategories.filter(
    (category) => category.type === type,
  );

  const queryClient = useQueryClient();

  const { mutateAsync: createTransaction, isPending: isLoading } =
    useMutation({
      mutationFn: TransactionsService.create,
    });

  const isSaveButtonDisabled =
    !name || !value || !bankAccountId || !date;

  async function handleSubmit() {
    if (!value || !date) {
      return;
    }

    try {
      await createTransaction({
        name,
        value,
        date: date.toISOString(),
        type,
        bankAccountId,
        categoryId: categoryId || undefined,
      });

      queryClient.invalidateQueries({
        queryKey: BANK_ACCOUNTS_QUERY_KEY,
      });
      toast.success(
        type === "EXPENSE"
          ? "Despesa criada com sucesso!"
          : "Receita criada com sucesso!",
      );
      onSuccess();
    } catch {
      toast.error(
        type === "EXPENSE"
          ? "Não foi possível criar a despesa!"
          : "Não foi possível criar a receita!",
      );
    }
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
    isLoading,
    handleSubmit,
  };
}
