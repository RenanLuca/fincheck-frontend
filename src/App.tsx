import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/AuthContext";
import { queryClient } from "./app/utils/queryClient";
import { Router } from "./router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
      <ReactQueryDevtools  />
    </QueryClientProvider>
  )
}
