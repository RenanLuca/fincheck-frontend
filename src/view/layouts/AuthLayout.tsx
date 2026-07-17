import { Outlet } from "react-router";
import { Logo } from "../components/Logo";
import loginIllustrationImg from "../../assets/login-illustration.png";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 h-full flex items-center justify-center flex-col gap-16">
        <Logo className="h-6 text-gray-500" />
        <div className="w-full max-w-126 px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-180 h-full p-8 justify-center items-center relative hidden lg:flex shrink-0">
        <img
          src={loginIllustrationImg}
          alt=""
          className="w-164 h-240 object-cover select-none rounded-4xl shrink-0"
        />

        <div className="w-164 bottom-8 bg-white p-10 absolute rounded-b-4xl">
          <Logo className="h-8 text-teal-900" />
          <p className="text-gray-700 font-medium text-xl">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
