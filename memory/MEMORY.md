# 1st Capital Partners - Dashboard

## Proyecto
- Nombre: 1st Capital Partners Landing Page
- Cliente: Cesar A. Forero J. (CEO)
- Stack: React + Tailwind CSS (frontend), Python (backend futuro)
- Repo: Pendiente
- Deploy: AWS Amplify
- Estado: Inicializacion - Paso 4 COMPLETADO (Arquitectura definida)

## Sprint Actual
- Sprint: #0 (Setup)
- Objetivo: Definir arquitectura e inicializar proyecto
- Tareas activas: Arquitectura pendiente de definicion
- Bloqueadores: Ninguno

## Arquitectura (Definida 2026-02-18)
- Bundler: Vite ^6.1
- Frontend: React ^19.0 + TypeScript ^5.7 + Tailwind CSS v4
- Animaciones: Framer Motion ^12.4 (scroll-triggered, counters, stagger)
- i18n: react-i18next + i18next (EN principal, ES secundario, JSON files)
- Fonts: Cormorant Garamond (headings) + Inter (body) via Fontsource
- Icons: Lucide React
- Testing: Vitest + React Testing Library
- Backend: Python (futuro, no en MVP)
- Hosting: AWS Amplify
- Patrones: Functional components, custom hooks, centralized animation variants, flat folder structure

## Decisiones Vigentes
- DEC-001: React + Tailwind para frontend (decision del cliente)
- DEC-002: AWS Amplify para hosting (decision del cliente)
- DEC-003: Logo debe recrearse desde el PDF (no hay assets)
- DEC-004: Formulario contacto solo frontend por ahora
- DEC-005: Idioma principal EN, secundario ES con selector
- DEC-006: Vite como bundler (CRA deprecado, Amplify compatible)
- DEC-007: Framer Motion para animaciones (mejor React integration, 18KB)
- DEC-008: react-i18next para i18n (standard, lazy loading, TypeScript)
- DEC-009: Fonts self-hosted via Fontsource (performance, GDPR)
- DEC-010: Tailwind v4 CSS-first (fallback v3.4 si hay issues)
- DEC-011: Sin state management library (solo useState + i18next)
- DEC-012: Cormorant Garamond + Inter (serif authority + sans readability)
- DEC-013: Hero con CSS gradient (0KB, no stock images)

## Navegacion
| Necesito... | Leer... |
|-------------|---------|
| Decisiones detalladas | memory/decisions.md |
| Lecciones aprendidas | memory/lessons.md |
| Tareas del sprint | context/SPRINT.md |
| Arquitectura completa | memory/architecture.md |
| Bugs conocidos | memory/bugs.md |
| Historial de sesiones | context/SESSION_LOG.md |
| Requerimientos cliente | docs/requirements/requerimientos.md |
