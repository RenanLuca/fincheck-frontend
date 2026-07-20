export interface Account {
  id: string;
  name: string;
}

// TODO: substituir por uma busca em GET /bank-accounts quando integrarmos a API
export const ACCOUNTS: Account[] = [
  { id: "1", name: "XP Investimentos" },
  { id: "2", name: "Nubank" },
  { id: "3", name: "Carteira" },
];
