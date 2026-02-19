---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/tests/**"
  - "**/__tests__/**"
---

- Framework: Vitest + React Testing Library
- Patron AAA: Arrange, Act, Assert
- Test names: describe("Hero") > it("should render animated counters when in viewport")
- Mock dependencias externas (i18next, IntersectionObserver), no internas
- Un archivo de test por componente: Hero.test.tsx para Hero.tsx
- Cobertura minima 80% en codigo nuevo
- No usar snapshot tests sin aprobacion explicita
- Testear que todas las translation keys existen en EN y ES
- Testear que animaciones no crasheen (render sin errores, no visual testing)
- Correr con: npm run test
