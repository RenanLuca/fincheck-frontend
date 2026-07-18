import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";
import { AuthService } from "../../../app/services/authService";
import {
  loginSchema,
  type LoginSchema,
} from "../../../app/schemas/loginSchema";

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "renan2@gmail.com",
      password: "admin123",
    },
  });

  const { signIn } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.signin,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signIn(accessToken);
    } catch {
      toast.error("Credenciais inválidas!");
    }
  });

  return { register, errors, handleSubmit, isLoading: isPending };
}
