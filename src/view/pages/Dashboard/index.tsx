import { useAuth } from "../../../app/hooks/useAuth";
import { Accounts } from "./components/Accounts/Accounts";
import { Transactions } from "./components/Transactions/Transactions";

export function Dashboard() {
  return (
    <>
      <div className="w-full md:w-1/2">
        <Accounts />
      </div>
      <div className="w-full md:w-1/2">
        <Transactions />
      </div>
    </>
  );
}
