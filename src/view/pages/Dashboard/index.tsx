import { useAuth } from "../../../app/hooks/useAuth";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";

export function Dashboard() {
  const { signOut } = useAuth();

  return (
    <>
      <div className="w-full md:w-1/2">
        <Accounts/>
      </div>
      <div className="w-full md:w-1/2">
        <Transactions />
      </div>  
    </>
  )
}
