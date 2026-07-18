import { CategoryIcon } from "../../../components/icons/categories/CategoryIcon";

export function AccountCard() {
  return (
    <div className="p-4 bg-white rounded-2xl h-50 flex flex-col justify-between">
      <div>
        <CategoryIcon type="income" />
        <span className="text-gray-800 font-medium mt-4 block">Nubank</span>
      </div>
      <div>
        <span className="text-gray-800 font-medium block">R$11,00</span>
        <small className="text-gray-600 text-sm">Saldo Atual</small>
      </div>
    </div>
  );
}
