---
name: add-ui-component
description: Add a new generic component to the neutral UI kit in src/components. Use when asked to create a reusable UI component, control or primitive.
---

# Add UI Component

```
Progress:
- [ ] 1. src/components/<Name>.tsx + <Name>.css (BEM-ish classes prefixed ui-)
- [ ] 2. Style ONLY with variables from src/styles/tokens.css
- [ ] 3. Accessibility: label/aria wiring, keyboard support, visible focus (see FormField/Modal for patterns)
- [ ] 4. Export from src/components/index.ts
- [ ] 5. Add a demo section in src/pages/ShowcasePage.tsx
- [ ] 6. Test in src/components/<Name>.test.tsx (render + interaction + a11y attributes)
- [ ] 7. Run: yarn lint && yarn typecheck && yarn test
```

Guidelines:
- Keep components domain-free: no feature knowledge, no API calls, no routing.
- Prefer native elements (`<dialog>`, `<select>`) over reimplementations.
- Variants via props with sensible defaults (`variant`, `size`, `tone`), classNames composed from `ui-<name>--<variant>`.
