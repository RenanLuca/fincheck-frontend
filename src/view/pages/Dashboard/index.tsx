import { Accounts } from "./components/Accounts/Accounts";
import { Transactions } from "./components/Transactions/Transactions";
import { DashboardProvider } from "./components/DashboardContext/DashboardContext";
import { Fab } from "./components/Fab";
import { DashboardModals } from "./components/DashboardModals";

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="w-full md:w-1/2 min-h-0">
        <Accounts />
      </div>
      <div className="w-full md:w-1/2 min-h-0">
        <Transactions />
      </div>
      <Fab />
      <DashboardModals />
    </DashboardProvider>
  );
}
