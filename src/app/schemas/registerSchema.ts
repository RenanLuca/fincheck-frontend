import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "E-mail é obrigatório").email("Informe um e-mail válido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
