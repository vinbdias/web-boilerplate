# Agent Guide — Web Boilerplate

## What this is
A generic React + TypeScript SPA/PWA skeleton with a neutral, token-driven UI
kit. The `projects` feature is a fictitious example meant to be replaced.
No real domain, brand, credential or third-party data exists here — and none
may ever be introduced.

## Hard rules
- Never add credentials, real hostnames, company names or content copied from
  proprietary projects. Examples stay fictitious (`demo@example.com`).
- Access tokens live in memory only. Never persist tokens or user data in
  `localStorage`/`sessionStorage`.
- Wire payloads are validated with Zod at the boundary (`features/*/api.ts`)
  and mapped to view models / table rows via `src/mappers`. UI never consumes raw DTOs.
- All visual values come from the theme (`src/styles/theme.ts`). Components use
  styled-components (`index.tsx` + `styles.ts` per folder). CSS variables from
  `AppThemeProvider` are for page-level plain CSS only.
- Icons go through `FaIcon` + `src/icons` (`iconMap`). Do not import FontAwesome
  icons directly in feature code.
- The service worker precaches the app shell only; it must never cache
  authenticated API responses.

## Commands
```bash
yarn            # install
yarn dev        # dev server on :5173, proxies /api to :8765
yarn lint && yarn typecheck && yarn test && yarn build   # full verification
```

## Layout (where things go)
- HTTP + auth plumbing: `src/api/`
- Session lifecycle: `src/auth/AuthContext.tsx`
- Shared contexts: `src/contexts/` (`AppRefresh`, promise `ConfirmDialog`)
- Server state: feature `queries.ts` + `src/queries/cacheProfiles.ts`
- UI kit: `src/components/<Name>/{index.tsx,styles.ts}`
- Icons: `src/icons` + `FaIcon` / `FaRawIcon`
- Hooks: `src/hooks/` (debounce, portal anchor, scroll lock, backend errors, …)
- Utils: `src/utils/` (date, mask, string, api errors, yupHelpers, zodHelpers)
- Search factories: `src/search/` (`searchXFn(config) => (query) => Promise<TApi[]>`)
- UI models: `src/models/<Domain>/` (table rows/headers — display shapes)
- Mappers: `src/mappers/<domain>/` (API/view-model → model)
- Features: `src/features/<name>/`
- Routes: `src/app/router.tsx`

## Patterns to reuse
- **Search**: factory in `src/search` + mapper + `SearchBarAdvanced` / `SearchBarTable`
- **Tables**: `TableData` + `TableHeaders` with `renderCell` + model row types
- **DTO pipeline**: API DTO (Zod) → view model → table/search model via mappers
- **Feedback**: `useSnackbar()` queue; `await confirm()` from `useConfirmDialog()`
- **Dates**: `DatePicker` / `DateRangePicker` (DD/MM/YYYY, portal calendar)

## Definition of done
- `yarn lint`, `yarn typecheck`, `yarn test` and `yarn build` all pass.
- New API surfaces have Zod schemas, mappers and MSW handlers in `src/test/server.ts`.
- New generic components appear in the `/showcase` page.
