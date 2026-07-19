# Architecture

## Provider stack (outer → inner)

```
ErrorBoundary
  → QueryClientProvider
    → ToastProvider
      → AuthProvider          # rehydrates via POST /auth/refresh on mount
        → RouterProvider
            → RequireAuth     # waits for status !== "loading"
              → AppShell
                → page / feature
```

## Data flow

```
Component
  → useQuery / useMutation (feature/queries.ts, key factory + cache profile)
    → feature/api.ts (Zod DTO schema → view model mapper)
      → callApiOrThrow (throws ApiError for TanStack Query)
        → axios client (Bearer from memory; withCredentials for refresh cookie)
          → API
```

## Auth rehydration

1. Mount: `status = "loading"`, private routes show a splash.
2. `POST /auth/refresh` with the HttpOnly cookie (no client-side token storage).
3. Success → store access token in memory, `status = "authenticated"`.
4. Failure → `status = "anonymous"`, redirect to `/login`.
5. Concurrent 401s share one refresh promise (`src/api/client.ts`). Exhaustion
   calls the session-expired handler which clears QueryClient and returns to
   anonymous — no hard `window.location` redirects.

## UI kit

Components in `src/components/` are domain-free and styled exclusively via
`src/styles/tokens.css`. The `/showcase` route is the living styleguide.

## PWA

`vite-plugin-pwa` precaches the app shell. Runtime caching of API responses is
explicitly empty: authenticated data must not outlive the session.
