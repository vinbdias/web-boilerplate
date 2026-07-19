---
name: add-ui-component
description: Add a new generic component to the neutral UI kit in src/components. Use when asked to create a reusable UI component, control or primitive.
---

# Add UI Component

```
Progress:
- [ ] 1. Create a folder src/components/<Name>/ with index.tsx (component) and styles.ts (styled-components)
- [ ] 2. Style ONLY via the styled-components theme (`${({ theme }) => theme.colors.accent}`); never hardcode colors/spacing. The theme comes from src/styles/theme.ts
- [ ] 3. Use transient props ($active, $variant, $tone) for styling flags so they are not forwarded to the DOM
- [ ] 4. Accessibility: label/aria wiring, keyboard support, visible focus (see FormField/Modal for patterns)
- [ ] 5. Export from src/components/index.ts (import path is "./<Name>", resolved to the folder index)
- [ ] 6. Add a demo section in src/pages/ShowcasePage.tsx
- [ ] 7. Test in src/components/<Name>/<Name>.test.tsx using renderWithTheme from src/test/renderWithTheme (styled-components needs a ThemeProvider)
- [ ] 8. Run: yarn lint && yarn typecheck && yarn test
```

Guidelines:
- Every component is a folder: `<Name>/index.tsx` + `<Name>/styles.ts`. Colocate the styled definitions in styles.ts and keep index.tsx for markup and logic.
- Style with styled-components reading the typed theme. The CSS variables injected by `AppThemeProvider` still exist for page-level plain CSS, but new components should consume the theme object directly.
- Keep components domain-free: no feature knowledge, no API calls, no routing.
- Prefer native elements (`<dialog>`, `<select>`) over reimplementations.
- Variants via props with sensible defaults (`variant`, `size`, `tone`), mapped in styles.ts through `css` blocks keyed by the variant.
