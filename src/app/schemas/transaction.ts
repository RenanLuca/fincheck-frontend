import { z } from "zod";

export const transactionSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  value: z.number({ error: "O valor é obrigatório" }),
  date: z.date({ error: "A data é obrigatória" }),
  bankAccountId: z
    .string()
    .min(1, "A conta é obrigatória"),
  categoryId: z.string().optional(),
});

export type TransactionSchema = z.infer<
  typeof transactionSchema
>;
