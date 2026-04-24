# Sprint 1: Foundation + Core Sections

**Estado:** Pendiente aprobacion del cliente
**Objetivo:** Tener la landing page funcional con todas las secciones, animaciones, y soporte bilingue
**Duracion estimada:** 1 sprint

---

## Fase 1: Project Setup & Foundation

### TASK-001: Inicializar proyecto Vite + React + TypeScript
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Crear proyecto con Vite, instalar todas las dependencias (React 19, TypeScript 5.7, Tailwind v4, Framer Motion, react-i18next, Lucide React, Fontsource fonts, Vitest). Configurar tsconfig, eslint, prettier, amplify.yml.
- **Entregable:** Proyecto que compila y corre `npm run dev` sin errores

### TASK-002: Configurar Tailwind v4 theme y estilos globales
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Crear globals.css con @theme directive: colores corporativos, fonts, spacing, base layer. Si Tailwind v4 da problemas, fallback a v3.4.
- **Entregable:** Theme corporativo aplicado, tipografia funcionando

### TASK-003: Configurar sistema i18n
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Setup react-i18next, crear archivos de traduccion EN/ES con todas las keys para todas las secciones, toggle de idioma persistido en localStorage.
- **Entregable:** i18n funcional, cambio EN/ES sin recarga

### TASK-004: Crear componentes UI base
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Implementar: Button, SectionHeading, Card, Counter, Container, Divider, LanguageToggle. Cada uno con props tipadas, responsive, usando Tailwind theme.
- **Entregable:** Todos los componentes atomicos listos y reutilizables

### TASK-005: Crear logo SVG como React component
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Recrear logo de 1st Capital Partners desde el PDF: "1" grande gris + "st" superscript + linea vertical roja + "Capital" rojo + "Partners" gris. 3 variantes: full, mark, white.
- **Entregable:** Logo SVG inline funcional en 3 variantes

### TASK-006: Crear lib/animations.ts y custom hooks
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Implementar animation variants centralizados (fadeInUp, fadeIn, staggerContainer, scaleIn) + hooks: useCounter, useScrollAnimation, useActiveSection, useMediaQuery.
- **Entregable:** Sistema de animaciones listo para consumir por secciones

---

## Fase 2: Layout & Sections

### TASK-007: Header sticky + MobileMenu
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Header transparente que se vuelve solido al scroll. Logo, nav links con smooth scroll, LanguageToggle, CTA button. Hamburger menu en mobile con slide panel.
- **Entregable:** Header funcional en desktop y mobile

### TASK-008: Hero Section
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Seccion full-viewport con fondo gradiente oscuro. Headline, subtitle, CTA animados con stagger. 3 counters animados ($1500M+, 3 offices, 4 areas). Efecto "wow" en 3 segundos.
- **Entregable:** Hero impactante, animado, responsive

### TASK-009: Executive Overview
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Seccion "Who We Are" con fondo blanco. Texto sobre HQ Londres, hubs Luxemburgo/UAE, mision. Indicadores visuales de las 3 ubicaciones (elegantes, no Google Maps).
- **Entregable:** Seccion informativa, limpia, con location indicators

### TASK-010: Investment Profile & Strategy
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** 4 tarjetas/stats: Revenue Target ($10M-$100M), EBITDA ($2M-$10M), Financing Mix (mezzanine + equity), Vehicle ($1500M fund). Numeros grandes, bold, visualmente impactantes.
- **Entregable:** Fact-sheet visual elegante

### TASK-011: Sector Expertise
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Fondo oscuro. 4 tarjetas con iconos Lucide: Industrial & Services, Essential Sectors, Real Estate, Commodities. Hover effects. Stagger animation.
- **Entregable:** Grid de sectores con dark theme

### TASK-012: Value Creation Model
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** 4 pilares: Operational Synergy, Asset Protection, Strategic Support, Revenue Model. Layout visual tipo diagrama/infografia con iconos. Animacion progresiva al scroll.
- **Entregable:** Diagrama visual del modelo de holding

### TASK-013: Practice Areas
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** 4 areas: Strategic Advisory, Capital Markets, Brokerage, Wealth Management. Tarjetas grandes o acordeones interactivos. Cada area con icono, titulo, descripcion.
- **Entregable:** Seccion de servicios explorable

### TASK-014: Contact Section
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Fondo oscuro con acento rojo. Info de contacto (Cesar Forero, direccion Londres, email, telefono). Formulario: Name, Email, Company, Message, Submit. Solo frontend por ahora.
- **Entregable:** Seccion de contacto con formulario bonito

### TASK-015: Footer
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Fondo negro. Logo, nav links rapidos, ubicaciones, disclaimer legal, copyright 2026. Minimalista y limpio.
- **Entregable:** Footer corporativo completo

---

## Fase 3: Polish & Optimization

### TASK-016: App.tsx - Ensamblar todas las secciones
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Componer App.tsx con Header + todas las secciones en orden + Footer. Verificar smooth scroll, active section tracking, transiciones entre secciones.
- **Entregable:** Landing page completa ensamblada

### TASK-017: index.html - SEO, meta tags, schema markup
- **Asignado:** frontend-dev (sonnet)
- **Descripcion:** Meta titulo, descripcion, Open Graph para LinkedIn, Twitter Card, favicon, schema.org Organization, font preloads.
- **Entregable:** SEO completo segun arquitectura

### TASK-018: Responsive QA - todas las secciones en todos los breakpoints
- **Asignado:** qa-engineer (sonnet)
- **Descripcion:** Verificar CADA seccion en: 320px, 768px, 1024px, 1440px, 1920px. Documentar issues. Verificar touch targets en mobile.
- **Entregable:** Reporte de QA responsive con issues a corregir

### TASK-019: Performance audit - Lighthouse
- **Asignado:** qa-engineer (sonnet)
- **Descripcion:** Correr Lighthouse. Verificar: Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+. FCP < 2s, LCP < 3s. Documentar mejoras necesarias.
- **Entregable:** Reporte Lighthouse con scores y recomendaciones

### TASK-020: Code review final
- **Asignado:** code-reviewer (sonnet)
- **Descripcion:** Review de todo el codigo: calidad, seguridad (no secrets, XSS), performance, accesibilidad, adherencia a convenciones. Verificar i18n completo (no strings sueltos).
- **Entregable:** Reporte de review con hallazgos por severidad

---

## Criterios de Exito del Sprint
- [ ] Landing page completa con 9 secciones funcionales
- [ ] Soporte bilingue EN/ES con toggle sin recarga
- [ ] Animaciones de scroll suaves en todas las secciones
- [ ] Counters animados en hero
- [ ] Responsive impecable en mobile, tablet, desktop
- [ ] Lighthouse 90+ en todas las categorias
- [ ] Logo SVG recreado en 3 variantes
- [ ] Formulario de contacto (frontend only)
- [ ] SEO: meta tags, OG, schema markup
- [ ] Codigo limpio, revisado, sin vulnerabilidades
