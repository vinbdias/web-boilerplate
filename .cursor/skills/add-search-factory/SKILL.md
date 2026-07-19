---
name: add-search-factory
description: Add a domain search factory + mapper wired to SearchBarAdvanced or SearchBarTable. Use when adding autocomplete/search-as-you-type over an API resource.
---

# Add Search Factory

```
Progress:
- [ ] 1. Create src/search/<resource>.ts exporting searchXFn(config) => (query) => Promise<TApi[]>
- [ ] 2. Guard empty query; unwrap API envelope; return [] on failure
- [ ] 3. Add mapper in src/mappers/<resource>/ (to SearchResultItem and/or TableRow)
- [ ] 4. Optionally add TableHeaders in src/models/<Domain>/
- [ ] 5. Wire SearchBarAdvanced (list) or SearchBarTable (grid) with searchFn + mapper
- [ ] 6. Export from src/search/index.ts
- [ ] 7. Demo on /showcase or the feature page
```

The factory knows services only — never UI. Mapping stays in mappers so the same searchFn can feed multiple components.
