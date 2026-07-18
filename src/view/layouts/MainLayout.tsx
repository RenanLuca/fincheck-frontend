import { Outlet } from "react-router";
import { Logo } from "../components/shared/Logo";
import { UserMenu } from "../components/header/UserMenu";

export function MainLayout() {
  return (
    <div className="h-full w-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>
      <main className="flex-1 flex flex-col md:flex-row w-full gap-4">
        <Outlet />
      </main>
    </div>
  );
}
