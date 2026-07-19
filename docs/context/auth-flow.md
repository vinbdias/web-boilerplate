# Auth Flow

See the companion API docs for the server side. Client-side summary:

| Concern | Location |
|---|---|
| Token storage (memory) | `src/api/client.ts` → `setAccessToken` |
| Single-flight refresh | `src/api/client.ts` → `refreshPromise` |
| Session state | `src/auth/AuthContext.tsx` |
| Route guard | `src/auth/RequireAuth.tsx` |
| Session-expired hook | `setSessionExpiredHandler` registered by AuthProvider |

Never put tokens in `localStorage` or `sessionStorage`. The refresh cookie is
owned by the browser and invisible to JavaScript by design.
