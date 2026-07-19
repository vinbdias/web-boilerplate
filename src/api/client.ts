// Central HTTP client.
//
// Access token lives in memory only (module scope), never in localStorage:
// XSS cannot exfiltrate what is not persisted. Session longevity comes from
// the HttpOnly refresh cookie managed entirely by the API.
//
// 401 handling uses a single shared refresh promise so N concurrent failures
// trigger exactly one refresh round-trip.
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL ?? "/api/v1").replace(/\/+$/, "");

let accessToken: string | null = null;
let onSessionExpired: (() => void) | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

/** Registered once by the auth provider; called when refresh definitively fails. */
export function setSessionExpiredHandler(handler: (() => void) | null): void {
  onSessionExpired = handler;
}

export const api = axios.create({
  baseURL,
  timeout: 30_000,
  withCredentials: true, // refresh cookie
});

api.interceptors.request.use((config) => {
  if (accessToken && !config.url?.startsWith("/auth/login")) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await axios.post<{ data: { accessToken: string } }>(
      `${baseURL}/auth/refresh`,
      undefined,
      { withCredentials: true, timeout: 30_000 },
    );
    const token = response.data.data.accessToken;
    setAccessToken(token);
    return token;
  } catch {
    setAccessToken(null);
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const status = error.response?.status;
    const url = original?.url ?? "";

    const isAuthRoute = url.startsWith("/auth/login") || url.startsWith("/auth/refresh");

    if (status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true;

      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const token = await refreshPromise;
      if (token) {
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      }

      onSessionExpired?.();
    }

    return Promise.reject(error);
  },
);
