import type { Category } from "./Category";

export interface Transaction {
  id: string;
  name: string;
  date: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  bankAccountId: string;
  category: Category | null;
}

export interface TransactionsFilters {
  month: number;
  year: number;
  bankAccountId: string | null;
  type: "INCOME" | "EXPENSE" | null;
}
