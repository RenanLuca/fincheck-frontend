import { Logo } from "./Logo";

export function LaunchScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-teal-900">
      <Logo className="h-10 w-auto animate-pulse text-white" />
    </div>
  );
}
