export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
}

// TODO: substituir por uma busca em GET /categories quando integrarmos a API
export const CATEGORIES: Category[] = [
  { id: "1", name: "Salário", type: "INCOME" },
  { id: "2", name: "Freelance", type: "INCOME" },
  { id: "3", name: "Investimentos", type: "INCOME" },
  { id: "4", name: "Alimentação", type: "EXPENSE" },
  { id: "5", name: "Transporte", type: "EXPENSE" },
  { id: "6", name: "Saúde", type: "EXPENSE" },
  { id: "7", name: "Educação", type: "EXPENSE" },
  { id: "8", name: "Lazer", type: "EXPENSE" },
  { id: "9", name: "Moradia", type: "EXPENSE" },
  { id: "10", name: "Contas e Serviços", type: "EXPENSE" },
  { id: "11", name: "Compras", type: "EXPENSE" },
  { id: "12", name: "Viagem", type: "EXPENSE" },
  { id: "13", name: "Outros", type: "EXPENSE" },
];
