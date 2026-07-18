import { createContext, useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LocalStorageKeys } from "../config/localStorageKeys";
import { UsersService } from "../services/usersService";

interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  isLoadingUser: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(
    () => !!localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
  );

  function signIn(accessToken: string) {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }

  function signOut() {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }

  const { data: user, isLoading: isLoadingUser, isError } = useQuery({
    queryKey: ["users", "me"],
    queryFn: UsersService.me,
    enabled: signedIn,
  });

  useEffect(() => {
    if (isError) {
      signOut();
      toast.error("Sua sessão expirou. Faça login novamente.", {
        id: "session-expired",
      });
    }
  }, [isError]);

  return (
    <AuthContext.Provider value={{ signedIn, user, isLoadingUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
