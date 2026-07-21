export const BANK_ACCOUNT_TYPES = ["CHECKING", "CASH", "INVESTMENT"] as const;
export type BankAccountType = (typeof BANK_ACCOUNT_TYPES)[number];

export interface BankAccount {
  id: string;
  name: string;
  type: BankAccountType;
  color: string;
  initialBalance: number;
  currentBalance: number;
}
