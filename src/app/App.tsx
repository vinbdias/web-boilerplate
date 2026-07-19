import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/auth/AuthContext";
import { ErrorBoundary, SnackbarProvider } from "@/components";
import { AppRefreshProvider, ConfirmDialogProvider } from "@/contexts";
import { createQueryClient } from "@/queries/queryClient";
import { AppThemeProvider } from "@/styles/AppThemeProvider";
import { router } from "./router";

export function App() {
  const [queryClient] = useState(createQueryClient);

  return (
    <AppThemeProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppRefreshProvider>
            <SnackbarProvider>
              <ConfirmDialogProvider>
                <AuthProvider>
                  <RouterProvider router={router} />
                </AuthProvider>
              </ConfirmDialogProvider>
            </SnackbarProvider>
          </AppRefreshProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </AppThemeProvider>
  );
}
