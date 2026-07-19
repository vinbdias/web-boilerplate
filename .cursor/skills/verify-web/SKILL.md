---
name: verify-web
description: Run the full verification suite for this SPA and interpret failures. Use before finishing any task that changed TypeScript, styles, routes or dependencies.
---

# Verify Web

```bash
yarn lint && yarn typecheck && yarn test && yarn build
```

If dependencies are missing: `yarn` first.

Failure triage:
- **lint**: fix at source; do not disable rules inline without a justification comment.
- **typecheck**: strict mode + `noUncheckedIndexedAccess` are intentional; prefer narrowing over assertions.
- **test**: MSW rejects unhandled requests (`onUnhandledRequest: "error"`); add handlers to `src/test/server.ts` for new endpoints.
- **build**: PWA manifest/icon errors come from `vite.config.ts` (VitePWA block).

Also confirm manually: no tokens/PII in web storage, no hardcoded style values, and no proprietary names in the diff.
