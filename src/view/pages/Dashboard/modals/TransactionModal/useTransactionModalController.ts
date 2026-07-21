import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  transactionSchema,
  type TransactionSchema,
} from "../../../../../app/schemas/transaction";
import { useBankAccounts, BANK_ACCOUNTS_QUERY_KEY } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { TRANSACTIONS_QUERY_KEY } from "../../../../../app/hooks/useTransactions";
import { TransactionsService } from "../../../../../app/services/transactionsService";

interface UseTransactionModalControllerParams {
  type: "INCOME" | "EXPENSE";
  onSuccess: () => void;
}

export function useTransactionModalController({
  type,
  onSuccess,
}: UseTransactionModalControllerParams) {
  const {
    register,
    control,
    reset,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const { categories: allCategories } = useCategories();
  const { accounts } = useBankAccounts();

  const categories = allCategories.filter(
    (category) => category.type === type,
  );

  const queryClient = useQueryClient();

  const { mutateAsync: createTransaction, isPending: isLoading } =
    useMutation({
      mutationFn: TransactionsService.create,
    });

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      try {
        await createTransaction({
          name: data.name,
          value: data.value,
          date: data.date.toISOString(),
          type,
          bankAccountId: data.bankAccountId,
          categoryId: data.categoryId || undefined,
        });

        queryClient.invalidateQueries({
          queryKey: BANK_ACCOUNTS_QUERY_KEY,
        });
        queryClient.invalidateQueries({
          queryKey: TRANSACTIONS_QUERY_KEY,
        });
        toast.success(
          type === "EXPENSE"
            ? "Despesa criada com sucesso!"
            : "Receita criada com sucesso!",
        );
        onSuccess();
        reset();
      } catch {
        toast.error(
          type === "EXPENSE"
            ? "Não foi possível criar a despesa!"
            : "Não foi possível criar a receita!",
        );
      }
    },
  );

  return {
    register,
    control,
    errors,
    categories,
    accounts,
    isLoading,
    handleSubmit,
  };
}
