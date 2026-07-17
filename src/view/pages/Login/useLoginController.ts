import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../../schemas/loginSchema";

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    // TODO: enviar para a API
    console.log(data);
  });

  return { register, errors, handleSubmit };
}
