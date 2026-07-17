import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "../../../app/schemas/registerSchema";

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    // TODO: enviar para a API
    console.log(data);
  });

  return { register, errors, handleSubmit };
}
