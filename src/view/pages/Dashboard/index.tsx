import { Accounts } from "./components/Accounts/Accounts";
import { Transactions } from "./components/Transactions/Transactions";
import { DashboardProvider } from "./components/DashboardContext";
import { Fab } from "./components/Fab";

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="w-full md:w-1/2">
        <Accounts />
      </div>
      <div className="w-full md:w-1/2">
        <Transactions />
      </div>
      <Fab />
    </DashboardProvider>
  );
}
