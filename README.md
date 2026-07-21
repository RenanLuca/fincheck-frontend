# Fincheck — Frontend

Aplicação web de controle financeiro pessoal: cadastro de contas bancárias, registro de receitas e despesas, saldo consolidado e filtros por período, conta e tipo de transação.

Este projeto foi construído como **estudo full stack**, acompanhando o curso **[JStack](https://jstack.com.br)**. É a interface web que consome a [API](../api) também desenvolvida durante o curso.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** para estilização
- **React Router** para navegação
- **TanStack Query** para cache, revalidação e paginação (infinite query) dos dados da API
- **React Hook Form** + **Zod** para formulários e validação
- **Radix UI** (dialog, select, dropdown, popover) como primitivos de UI acessíveis
- **lucide-react** para ícones
- **react-day-picker** + **date-fns** para seleção e formatação de datas
- **react-number-format** para o input de moeda
- **Swiper** para os carrosséis (contas e seletor de mês)
- **Axios** para comunicação HTTP com a API

## Funcionalidades

- Autenticação (login/cadastro) com sessão persistida e expiração tratada automaticamente
- Contas bancárias: criação, edição e exclusão, com saldo calculado a partir das transações
- Transações: criação, edição e exclusão (receitas e despesas), com categorias e ícones
- Listagem de transações por mês, com **scroll infinito** e filtros (conta e tipo)
- Ocultar/exibir valores sensíveis com um clique
- Estados de carregamento diferenciados: carregamento inicial (tela cheia) e revalidação em segundo plano (indicador leve, sem interromper a navegação)

## Estrutura

```
src/
  app/            # camada de domínio: entidades, services (HTTP), hooks de dados, schemas de validação
  view/            # camada de apresentação: pages, layouts e componentes de UI reutilizáveis
  router/          # rotas e guarda de autenticação
```

Cada tela segue o padrão "controller hook": um `useXController.ts` concentra estado e lógica, o componente correspondente cuida só da renderização.

## Como rodar

Pré-requisito: a [API](../api) rodando (por padrão em `http://localhost:3000`).

```bash
npm install
cp .env.example .env   # ajuste VITE_API_BASE_URL se necessário
npm run dev
```

Outros scripts disponíveis: `npm run build`, `npm run lint`, `npm run format`, `npm run preview`.
