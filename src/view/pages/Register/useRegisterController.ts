import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";
import { AuthService } from "../../../app/services/authService";
import {
  registerSchema,
  type RegisterSchema,
} from "../../../app/schemas/registerSchema";

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { signIn } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.signup,
  });

  const handleSubmit = hookFormHandleSubmit(
    async (data) => {
      try {
        const { accessToken } = await mutateAsync(data);
        signIn(accessToken);
      } catch {
        toast.error("Não foi possível criar a sua conta!");
      }
    },
  );

  return {
    register,
    errors,
    handleSubmit,
    isLoading: isPending,
  };
}
