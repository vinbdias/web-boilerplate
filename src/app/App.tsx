import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/auth/AuthContext";
import { ErrorBoundary, ToastProvider } from "@/components";
import { createQueryClient } from "@/queries/queryClient";
import { AppThemeProvider } from "@/styles/AppThemeProvider";
import { router } from "./router";

export function App() {
  const [queryClient] = useState(createQueryClient);

  return (
    <AppThemeProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </ToastProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </AppThemeProvider>
  );
}
