import { Outlet } from "react-router";
import { Logo } from "../components/shared/Logo";
import loginIllustrationImg from "../../assets/login-illustration.png";

export function AuthLayout() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 h-full flex items-center justify-center flex-col gap-16">
        <Logo className="h-6 text-gray-500" />
        <div className="w-full max-w-126 px-8">
          <Outlet />
        </div>
      </div>

      <div className="flex-1 h-full p-8 justify-center items-center hidden lg:flex">
        <div className="relative h-full w-full max-w-164">
          <img
            src={loginIllustrationImg}
            alt=""
            className="h-full w-full select-none rounded-4xl object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-white p-10 rounded-b-4xl">
            <Logo className="h-8 text-teal-900" />
            <p className="text-gray-700 font-medium text-xl">
              Gerencie suas finanças pessoais de uma forma simples com o
              fincheck, e o melhor, totalmente de graça!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
