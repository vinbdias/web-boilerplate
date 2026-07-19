# Web Boilerplate (React + TypeScript SPA/PWA)

Generic, brand-free starting point for SPAs/PWAs backed by a REST API. The
visual identity is intentionally neutral: retheme everything by editing the
theme modules in `src/styles/` (`theme.ts`, `colors.ts`, `fonts.ts`,
`breakpoints.ts`).

Pairs with the companion `api-boilerplate` (CakePHP REST API), but works with
any backend that speaks the same envelope: `{ data, meta? }` on success and
`{ error: { code, message, details? } }` on failure.

## Stack

- Vite + React 18 + TypeScript (strict, `noUncheckedIndexedAccess`)
- React Router 7, TanStack Query 5, Axios
- React Hook Form + Zod (schemas double as runtime DTO validation)
- styled-components ThemeProvider with a typed theme (palette, typography,
  breakpoints); the same theme is injected as CSS variables for the plain-CSS
  component kit
- PWA via `vite-plugin-pwa` (app-shell precache only; API responses are never
  cached by the service worker)
- Vitest + Testing Library + MSW

## Architecture

```
src/
  api/          # axios client (in-memory access token, single-flight refresh)
                # callApi: typed, never-throwing result union + ApiError for queries
  auth/         # AuthProvider (rehydration via /auth/refresh), RequireAuth guard
  queries/      # query client defaults + cache profiles by volatility
  components/   # neutral UI kit, one folder per component (index.tsx + styles.ts); see /showcase
  features/     # one folder per domain feature (projects = example, replace it)
    projects/   # api.ts (DTO+schema+mapper), queries.ts (keys+hooks), pages
  pages/        # login, dashboard, 404, showcase
  app/          # providers, router, shell
  styles/       # theme.ts + colors.ts + fonts.ts + breakpoints.ts (retheme here)
                # AppThemeProvider bridges the theme to CSS variables
```

Key decisions:

- **Access token in memory only** — never in `localStorage`. Session longevity
  comes from the HttpOnly refresh cookie owned by the API. On reload, the app
  rehydrates by calling `/auth/refresh` before rendering private routes.
- **Single-flight refresh** — concurrent 401s share one refresh promise.
- **DTO discipline** — wire types are validated with Zod at the boundary and
  mapped to view models; UI code never touches raw API payloads.
- **Cache profiles** — pick `static | long | medium | short` per query based on
  data volatility (`src/queries/cacheProfiles.ts`).

## Getting started

```bash
yarn                # or npm install
cp .env.example .env.local
yarn dev            # http://localhost:5173 (proxies /api to localhost:8765)
```

With the companion API running, sign in with the seeded demo user:
`demo@example.com` / `password123`.

## Verification

```bash
yarn lint
yarn typecheck
yarn test
yarn build
```

## Replacing the example feature

1. Copy `src/features/projects` to `src/features/<your-feature>`.
2. Update `api.ts`: DTO schema, mapper and endpoint paths.
3. Update `queries.ts`: key factory and hooks.
4. Add routes in `src/app/router.tsx` (lazy) and navigation in `AppShell`.
5. Add MSW handlers in `src/test/server.ts` and tests alongside the feature.

The `add-web-feature` skill in `.cursor/skills/` walks through this checklist.

## Theming

All colors, spacing, radii and typography live in the typed theme:

- `src/styles/colors.ts` — palette (swap the accent for a brand primary)
- `src/styles/fonts.ts` — families, sizes, weights
- `src/styles/breakpoints.ts` — responsive helpers (`theme.breakpoints.up.md`)
- `src/styles/theme.ts` — assembles everything (spacing, radii, shadows)

`AppThemeProvider` provides the theme to styled-components and injects it as
CSS variables, so both styling approaches consume identical values. Adopting a
brand = editing those modules (plus `favicon.svg` and the PWA icons).

```tsx
import styled from "styled-components";

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.font.size.sm};

  @media ${({ theme }) => theme.breakpoints.up.md} {
    font-size: ${({ theme }) => theme.font.size.base};
  }
`;
```
