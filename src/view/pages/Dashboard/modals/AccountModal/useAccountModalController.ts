import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  newAccountSchema,
  type NewAccountSchema,
} from "../../../../../app/schemas/newAccount";
import { BankAccountService } from "../../../../../app/services/bankAccountService";
import { BANK_ACCOUNTS_QUERY_KEY } from "../../../../../app/hooks/useBankAccounts";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

interface UseAccountModalControllerParams {
  account?: BankAccount | null;
  onClose: () => void;
}

export function useAccountModalController({
  account,
  onClose,
}: UseAccountModalControllerParams) {
  const isEditing = !!account;

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<NewAccountSchema>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: account
      ? {
          name: account.name,
          initialBalance: account.initialBalance,
          type: account.type,
          color: account.color,
        }
      : undefined,
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: createAccount,
    isPending: isCreating,
  } = useMutation({
    mutationFn: BankAccountService.create,
  });

  const {
    mutateAsync: updateAccount,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: BankAccountService.update,
  });

  const { mutateAsync: removeAccount, isPending: isDeleting } = useMutation({
    mutationFn: BankAccountService.remove,
  });

  function openDeleteConfirmation() {
    setIsConfirmingDelete(true);
  }

  function cancelDeleteConfirmation() {
    setIsConfirmingDelete(false);
    onClose();
  }

  async function handleConfirmDelete() {
    if (!account) {
      return;
    }

    try {
      await removeAccount(account.id);
      queryClient.invalidateQueries({ queryKey: BANK_ACCOUNTS_QUERY_KEY });
      toast.success("Conta excluída com sucesso!");
      setIsConfirmingDelete(false);
      onClose();
    } catch {
      toast.error("Não foi possível excluir a conta!");
    }
  }

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      try {
        if (isEditing) {
          await updateAccount({ id: account.id, ...data });
          toast.success("Conta editada com sucesso!");
        } else {
          await createAccount(data);
          toast.success("Conta criada com sucesso!");
        }

        queryClient.invalidateQueries({
          queryKey: BANK_ACCOUNTS_QUERY_KEY,
        });
        onClose();
        reset();
      } catch {
        toast.error(
          isEditing
            ? "Não foi possível editar a conta!"
            : "Não foi possível criar a conta!",
        );
      }
    },
  );

  return {
    register,
    control,
    errors,
    handleSubmit,
    isLoading: isCreating || isUpdating,
    isEditing,
    isConfirmingDelete,
    openDeleteConfirmation,
    cancelDeleteConfirmation,
    handleConfirmDelete,
    isDeleting,
  };
}
