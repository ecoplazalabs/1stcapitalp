# 1st Capital Partners - Landing Page

## Comandos
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Test: `npm run test`
- Lint: `npm run lint`

## Stack
- **Bundler:** Vite ^6.1
- **Frontend:** React ^19.0 + TypeScript ^5.7
- **Styling:** Tailwind CSS v4 (CSS-first config via @theme)
- **Animaciones:** Framer Motion ^12.4
- **i18n:** react-i18next + i18next (EN principal, ES secundario)
- **Fonts:** Cormorant Garamond (headings) + Inter (body) via Fontsource
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library
- **Deploy:** AWS Amplify

## Convenciones
- Todo texto visible pasa por `useTranslation()` - cero strings hardcodeados
- Animaciones centralizadas en `src/lib/animations.ts` (variants reutilizables)
- Colores corporativos via Tailwind theme: `brand-red`, `neutral-950`, `gold`
- Cada seccion de la landing tiene un `id` unico para navegacion suave
- Mobile-first: diseñar para 320px, escalar hacia arriba
- Componente = 1 archivo. Seccion = 1 componente en `components/sections/`
- No state management library. Solo useState local + i18next state
- SVG logo inline como React component (no <img>)
- British English en textos (favour, centralised, optimise)

## Contexto
- Requerimientos: docs/requirements/requerimientos.md
- Arquitectura completa: memory/architecture.md
- Decisiones: memory/decisions.md
- Sprint actual: context/SPRINT.md

## Agentes
Globales (disponibles via ~/.claude/agents/):
| Agente | Modelo | Cuando usar |
|--------|--------|-------------|
| architect | opus | Decisiones tecnicas, evaluacion tecnologia |
| frontend-dev | sonnet | Implementar UI, componentes, paginas |
| backend-dev | sonnet | Implementar API, DB, logica de negocio |
| qa-engineer | sonnet | Tests, verificacion, cobertura |
| code-reviewer | sonnet | Review pre-merge, seguridad |

## Rules
- Globales (~/.claude/rules/): security.md, code-style.md
- Proyecto (.claude/rules/): testing.md, frontend.md, backend.md
- Se cargan automaticamente segun el archivo que se edite
