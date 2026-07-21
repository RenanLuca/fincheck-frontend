import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  transactionSchema,
  type TransactionSchema,
} from "../../../../../app/schemas/transaction";
import {
  useBankAccounts,
  BANK_ACCOUNTS_QUERY_KEY,
} from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { TRANSACTIONS_QUERY_KEY } from "../../../../../app/hooks/useTransactions";
import { TransactionsService } from "../../../../../app/services/transactionsService";
import type { Transaction } from "../../../../../app/entities/Transaction";

interface UseTransactionModalControllerParams {
  type?: "INCOME" | "EXPENSE";
  transaction?: Transaction | null;
  onClose: () => void;
}

export function useTransactionModalController({
  type,
  transaction,
  onClose,
}: UseTransactionModalControllerParams) {
  const isEditing = !!transaction;
  const resolvedType = transaction?.type ?? type ?? "EXPENSE";

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction
      ? {
          name: transaction.name,
          value: transaction.value,
          date: new Date(transaction.date),
          bankAccountId: transaction.bankAccountId,
          categoryId: transaction.category?.id,
        }
      : {
          date: new Date(),
        },
  });

  const { categories: allCategories } = useCategories();
  const { accounts } = useBankAccounts();

  const categories = useMemo(
    () =>
      allCategories.filter(
        (category) => category.type === resolvedType,
      ),
    [allCategories, resolvedType],
  );

  const queryClient = useQueryClient();

  const {
    mutateAsync: createTransaction,
    isPending: isCreating,
  } = useMutation({
    mutationFn: TransactionsService.create,
  });

  const {
    mutateAsync: updateTransaction,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: TransactionsService.update,
  });

  const {
    mutateAsync: removeTransaction,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: TransactionsService.remove,
  });

  function openDeleteConfirmation() {
    setIsConfirmingDelete(true);
  }

  function cancelDeleteConfirmation() {
    setIsConfirmingDelete(false);
    onClose();
  }

  async function handleConfirmDelete() {
    if (!transaction) {
      return;
    }

    try {
      await removeTransaction(transaction.id);
      queryClient.invalidateQueries({
        queryKey: BANK_ACCOUNTS_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEY,
      });
      toast.success("Transação excluída com sucesso!");
      setIsConfirmingDelete(false);
      onClose();
    } catch {
      toast.error("Não foi possível excluir a transação!");
    }
  }

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      try {
        if (isEditing) {
          await updateTransaction({
            id: transaction.id,
            name: data.name,
            value: data.value,
            date: data.date.toISOString(),
            type: resolvedType,
            bankAccountId: data.bankAccountId,
            categoryId: data.categoryId || undefined,
          });
          toast.success("Transação editada com sucesso!");
        } else {
          await createTransaction({
            name: data.name,
            value: data.value,
            date: data.date.toISOString(),
            type: resolvedType,
            bankAccountId: data.bankAccountId,
            categoryId: data.categoryId || undefined,
          });
          toast.success(
            resolvedType === "EXPENSE"
              ? "Despesa criada com sucesso!"
              : "Receita criada com sucesso!",
          );
        }

        queryClient.invalidateQueries({
          queryKey: BANK_ACCOUNTS_QUERY_KEY,
        });
        queryClient.invalidateQueries({
          queryKey: TRANSACTIONS_QUERY_KEY,
        });
        onClose();
        reset();
      } catch {
        toast.error(
          isEditing
            ? "Não foi possível editar a transação!"
            : resolvedType === "EXPENSE"
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
    isEditing,
    resolvedType,
    isLoading: isCreating || isUpdating,
    handleSubmit,
    isConfirmingDelete,
    openDeleteConfirmation,
    cancelDeleteConfirmation,
    handleConfirmDelete,
    isDeleting,
  };
}
