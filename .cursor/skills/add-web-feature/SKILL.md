---
name: add-web-feature
description: Add a new domain feature (API layer, queries, pages, routes) to this SPA following the established layering. Use when asked to create a new feature, screen, CRUD module or API integration.
---

# Add Web Feature

Use `src/features/projects` as the template. Order of work:

```
Progress:
- [ ] 1. src/features/<name>/api.ts — Zod DTO schema, view model, mapper, request functions using callApiOrThrow
- [ ] 2. src/features/<name>/queries.ts — key factory + useQuery/useMutation hooks with a cache profile
- [ ] 3. Pages/components inside the feature folder (generic pieces go to src/components/)
- [ ] 4. Route in src/app/router.tsx (lazy) + nav item in src/app/AppShell.tsx
- [ ] 5. MSW handlers in src/test/server.ts + tests next to the code
- [ ] 6. Run: yarn lint && yarn typecheck && yarn test && yarn build
```

Invariants:
- Raw DTOs never leave `api.ts`; components consume view models only.
- Mutations invalidate via the key factory (`invalidateQueries({ queryKey: keys.lists() })`).
- Validation errors from the API (`error.fields`) map back to the form with `setError`.
- No tokens/PII in web storage; no hardcoded colors (theme values from src/styles/theme.ts only).
