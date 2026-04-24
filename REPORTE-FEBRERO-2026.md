# 1st Capital Partners - Landing Page

## Descripcion del Proyecto

Landing page corporativa de nivel mundial para **1st Capital Partners**, firma boutique de merchant finance con sede en Londres, $1500M en capital comprometido y operaciones en Londres, Luxemburgo y Emiratos Arabes Unidos. El objetivo es servir como carta de presentacion digital ante inversores institucionales, empresas del lower middle-market y socios estrategicos globales, transmitiendo autoridad, sofisticacion y confianza.

---

## Trabajo Realizado - Febrero 2026

### 1. Arquitectura y Configuracion del Proyecto

- Definicion del stack tecnologico: **Vite 6.1 + React 19 + TypeScript 5.7 + Tailwind CSS v4 + Framer Motion 12.4 + react-i18next**
- Configuracion de ESLint, TypeScript strict mode (zero `any` policy), path aliases
- Estructura de carpetas por responsabilidad: `components/sections/`, `components/ui/`, `components/layout/`, `hooks/`, `lib/`, `i18n/`
- Documentacion de arquitectura (`memory/architecture.md`) y decisiones tecnicas (`memory/decisions.md`)
- Creacion de `CLAUDE.md` con convenciones del proyecto y guia de desarrollo

### 2. Desarrollo Frontend Completo

**7 secciones de landing page implementadas:**

| Seccion | Descripcion |
|---------|-------------|
| **Hero** | Headline animado, subtitulo, CTAs, contadores animados ($1500M+, 3 oficinas, 4 areas), boton scroll-down |
| **Executive Overview** | Resumen de la firma con 3 pilares (Sede, Funcion, Mision) y mapa visual de oficinas globales |
| **Investment Profile** | 4 tarjetas con metricas clave: revenue target ($10M-$100M), EBITDA ($2M-$10M), funding mix, vehiculo actual |
| **Sector Expertise** | 4 sectores (Industrial, Essential, Real Estate, Commodities) con iconos y descripciones |
| **Value Creation** | Modelo holding con 4 pilares: sinergia operativa, proteccion de activos, apoyo estrategico, modelo de ingresos |
| **Practice Areas** | 4 servicios numerados: asesoria estrategica, mercados de capital, corretaje, gestion patrimonial |
| **Contact** | Info del CEO, datos de contacto, mapa de oficinas, formulario funcional con validacion |

**18 componentes React desarrollados:**

- **Layout (3):** Header con navegacion sticky, Footer, MobileMenu con animaciones
- **UI (7):** Button, Card, Container, Counter (animado con IntersectionObserver), Divider, LanguageToggle, SectionHeading
- **Sections (7):** Hero, ExecutiveOverview, InvestmentProfile, SectorExpertise, ValueCreation, PracticeAreas, Contact
- **Otros:** ScrollToTop, Logo SVG inline como componente React

**3 custom hooks:**

- `useMediaQuery` - deteccion responsive con `useSyncExternalStore` (SSR-safe)
- `useCounter` - animacion de contadores numericos con IntersectionObserver
- `useActiveSection` - tracking de seccion activa para navegacion

### 3. Internacionalizacion (i18n)

- Sistema bilingue completo **ingles (principal) / espanol** via react-i18next
- 116 claves de traduccion por idioma
- Toggle de idioma EN|ES en header
- Zero strings hardcodeados en componentes
- Textos en British English (favour, centralised, optimise)

### 4. Animaciones y UX

- Animaciones scroll-triggered con Framer Motion (fade-in, slide-up, stagger)
- Contadores numericos animados al entrar en viewport
- Transiciones suaves entre secciones
- Navegacion smooth-scroll a secciones por ID
- Menu mobile con animaciones de apertura/cierre
- Boton scroll-to-top animado
- Design responsive mobile-first (320px base)

### 5. Estilos y Diseno

- Tailwind CSS v4 con configuracion CSS-first via `@theme`
- Paleta corporativa: `brand-red`, `neutral-950`, `gold`
- Tipografia: Cormorant Garamond (headings) + Inter (body) via Fontsource (self-hosted)
- Gradientes oscuros premium, espaciado generoso
- Estetica inspirada en "Goldman Sachs + Apple"

### 6. Testing

- **75 tests** con Vitest + React Testing Library en 8 archivos de test
- Cobertura de componentes: Hero, Contact, Header, Footer, Button, SectionHeading
- Cobertura de hooks: useMediaQuery (11 tests)
- Cobertura de utils: cn, scrollToSection
- Mock compartido de Framer Motion (`src/test/framer-mock.tsx`) con filtrado Set-based
- Mock de IntersectionObserver para JSDOM
- Todos los tests pasando (75/75)

### 7. QA y Code Review

- Revision completa de calidad, seguridad y performance
- Eliminacion de codigo muerto: componentes no usados (LogoMark, LogoWhite), hook eliminado (useScrollAnimation), 113 lineas removidas de animations.ts, tipos no usados eliminados
- Fix de `useMediaQuery` para usar `useSyncExternalStore` (cumplimiento ESLint)
- Fix de contadores para no re-triggear en cada re-render
- Accesibilidad mejorada en MobileMenu (aria-hidden, inert, focus trap)
- 0 errores TypeScript, 0 errores ESLint, build exitoso (444 KB JS / 140 KB gzip)

### 8. Despliegue

**AWS Amplify (CI/CD):**
- Repositorio GitHub: `ecoplazalabs/1stcapitalp`
- Pipeline: `npm ci` → `npm run lint` → `npm run test` → `npm run build`
- Security headers configurados en `amplify.yml` (HSTS, CSP, X-Frame-Options DENY, nosniff)
- Cache headers: assets inmutables (1 year), index.html (must-revalidate)
- URL: `https://main.d3v6rr603hdian.amplifyapp.com`

**cPanel - Dominio de produccion (1stcapitalp.com):**
- Analisis completo del hosting (CYBERtraffic, 500 MB disco, SSL activo)
- Backup del sitio anterior (`backup_public_html_2026-02-27.zip`, 3.85 MB)
- Deploy del build de Vite a `public_html/`
- Configuracion de `.htaccess`: HTTPS redirect, SPA routing, gzip, cache inmutable para assets, security headers, directory listing deshabilitado
- Sitio live en: **https://1stcapitalp.com**

---

## Metricas del Proyecto

| Metrica | Valor |
|---------|-------|
| Archivos fuente (TS/TSX) | 41 |
| Componentes React | 18 |
| Custom hooks | 3 |
| Tests automatizados | 75 (100% passing) |
| Idiomas soportados | 2 (EN, ES) |
| Claves i18n | 116 por idioma |
| Bundle JS (gzip) | 140 KB |
| Bundle CSS (gzip) | 8 KB |
| Build time | ~2 segundos |
| Commits | 3 |
| Ambientes desplegados | 2 (AWS Amplify + cPanel) |
