import { z } from "zod";
import { BANK_ACCOUNT_TYPES } from "../entities/BankAccount";

export const newAccountSchema = z.object({
  initialBalance: z.number({
    error: "O saldo inicial é obrigatório",
  }),
  name: z.string().min(1, "O nome da conta é obrigatório"),
  type: z.enum(BANK_ACCOUNT_TYPES),
  color: z
    .string()
    .nonempty("A cor da conta é obrigatória"),
});

export type NewAccountSchema = z.infer<
  typeof newAccountSchema
>;
