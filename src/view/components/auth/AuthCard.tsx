import type { ReactNode } from "react";
import { Link } from "react-router";

interface AuthCardProps {
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, linkText, linkTo, children }: AuthCardProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-800">
          {subtitle}{" "}
          <Link to={linkTo} className="font-medium text-teal-800 hover:underline">
            {linkText}
          </Link>
        </p>
      </div>

      {children}
    </div>
  );
}
