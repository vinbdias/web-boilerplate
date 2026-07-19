// Session lifecycle:
// - On mount, try POST /auth/refresh (the HttpOnly cookie decides the outcome).
//   Until it settles, `status` is "loading" and private routes show a splash.
// - login()/logout() call the API and update in-memory state.
// - When the axios layer exhausts refresh attempts it calls the session-expired
//   handler, which resets state here — no hard window.location redirects.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { callApi, type ApiResult } from "@/api/callApi";
import { setAccessToken, setSessionExpiredHandler } from "@/api/client";
import type { AuthResponse, User } from "./types";

type AuthStatus = "loading" | "authenticated" | "anonymous";

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  login: (email: string, password: string) => Promise<ApiResult<AuthResponse>>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setStatus("anonymous");
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    setSessionExpiredHandler(clearSession);
    return () => setSessionExpiredHandler(null);
  }, [clearSession]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const result = await callApi<AuthResponse>("post", "/auth/refresh");
      if (cancelled) return;

      if (result.ok) {
        setAccessToken(result.data.accessToken);
        setUser(result.data.user);
        setStatus("authenticated");
      } else {
        setStatus("anonymous");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await callApi<AuthResponse>("post", "/auth/login", { email, password });

    if (result.ok) {
      setAccessToken(result.data.accessToken);
      setUser(result.data.user);
      setStatus("authenticated");
    }

    return result;
  }, []);

  const logout = useCallback(async () => {
    await callApi("post", "/auth/logout");
    clearSession();
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      login,
      logout,
      hasRole: (role: string) => user?.roles.includes(role) ?? false,
    }),
    [status, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
