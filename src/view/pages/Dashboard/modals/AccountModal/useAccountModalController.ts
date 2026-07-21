import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  newAccountSchema,
  type NewAccountSchema,
} from "../../../../../app/schemas/newAccount";
import { BankAccountService } from "../../../../../app/services/bankAccountService";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

interface UseAccountModalControllerParams {
  account?: BankAccount | null;
  onSuccess: () => void;
}

export function useAccountModalController({
  account,
  onSuccess,
}: UseAccountModalControllerParams) {
  const isEditing = !!account;

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
          queryKey: ["bank-accounts"],
        });
        onSuccess();
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
  };
}
