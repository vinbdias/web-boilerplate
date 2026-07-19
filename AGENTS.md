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
  and mapped to view models. UI components never consume raw DTOs.
- All visual values come from `src/styles/tokens.css`. No hardcoded colors,
  font sizes or spacing in components.
- The service worker precaches the app shell only; it must never cache
  authenticated API responses.

## Commands
```bash
yarn            # install
yarn dev        # dev server on :5173, proxies /api to :8765
yarn lint && yarn typecheck && yarn test && yarn build   # full verification
```

## Layout (where things go)
- HTTP + auth plumbing: `src/api/` (don't fork the axios client; extend it)
- Session lifecycle: `src/auth/AuthContext.tsx` (rehydrates via /auth/refresh)
- Server state: feature `queries.ts` with key factories + `src/queries/cacheProfiles.ts`
- UI kit: `src/components/` (generic only; feature UI lives in the feature folder)
- Features: `src/features/<name>/` with `api.ts`, `queries.ts`, pages
- Routes: `src/app/router.tsx` (lazy for non-core pages)

## Definition of done
- `yarn lint`, `yarn typecheck`, `yarn test` and `yarn build` all pass.
- New API surfaces have Zod schemas, mappers and MSW handlers in `src/test/server.ts`.
- New generic components appear in the `/showcase` page.
