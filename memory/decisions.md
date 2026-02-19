# Decisiones - 1st Capital Partners

### DEC-001: React + Tailwind CSS para frontend (2026-02-18)
- Decision: Usar React con Tailwind CSS como stack frontend
- Razon: Preferencia del cliente, experiencia previa en proyectos juntos (eptokens, acobsouth, EPCASH)
- Alternativas: Next.js (rechazado por cliente), Astro, HTML puro

### DEC-002: AWS Amplify para hosting (2026-02-18)
- Decision: Deploy en AWS Amplify
- Razon: Ya usado en proyecto EPCASH, familiar, SSL automatico, custom domain facil
- Alternativas: Vercel, Netlify, S3+CloudFront

### DEC-003: Recrear logo desde PDF (2026-02-18)
- Decision: Crear logo SVG basado en el diseño del PDF corporativo
- Razon: No hay assets digitales del logo disponibles
- Alternativas: Solicitar al cliente (no disponible ahora)

### DEC-004: Formulario contacto solo frontend (2026-02-18)
- Decision: Construir formulario bonito solo frontend, backend se vera despues
- Razon: Priorizar el look & feel primero, funcionalidad de envio se agrega despues
- Alternativas: Formspree, EmailJS (para futuro)

### DEC-005: Soporte bilingue EN/ES (2026-02-18)
- Decision: Ingles como idioma principal, Español como secundario con selector EN|ES
- Razon: Audiencia global con presencia en Latam, cambio sin recargar pagina
- Alternativas: Solo ingles (rechazado por cliente)

### DEC-006: Vite como bundler (2026-02-18)
- Decision: Usar Vite ^6.1 como bundler y dev server
- Razon: De facto standard para React SPAs. Sub-second HMR, ESM nativo, builds optimizados con Rollup. CRA esta deprecado. Amplify lo soporta nativamente
- Alternativas: CRA (deprecado), Webpack manual (overkill), Astro (orientado a MPA/SSG)

### DEC-007: Framer Motion para animaciones (2026-02-18)
- Decision: Usar Framer Motion ^12.4 para todas las animaciones
- Razon: Mejor integracion React, whileInView nativo, useScroll, AnimatePresence. 18KB gzipped. Sin problemas de licencia
- Alternativas: GSAP (pesado, licencia comercial parcial), CSS-only (sin scroll triggers), AOS (abandonado)

### DEC-008: react-i18next para i18n (2026-02-18)
- Decision: Usar react-i18next + i18next con JSON translation files
- Razon: Mas adoptado en React, lazy loading, namespaces, TypeScript support. Cambio de idioma sin reload es nativo
- Alternativas: Custom context (fragil), react-intl (ICU overkill), lingui (menor comunidad)

### DEC-009: Fonts self-hosted via Fontsource (2026-02-18)
- Decision: Usar @fontsource packages en lugar de Google Fonts CDN
- Razon: Elimina requests externos (mejor FCP/LCP), evita GDPR issues, font-display swap por defecto. Critico para Lighthouse 90+
- Alternativas: Google Fonts CDN (request externo, GDPR), Adobe Fonts (pagado)

### DEC-010: Tailwind v4 CSS-first config (2026-02-18)
- Decision: Usar Tailwind CSS v4 con configuracion via @theme en CSS. Fallback a v3.4 si hay issues
- Razon: v4 es la version actual, CSS-first es mas limpio. Si causa problemas se puede bajar a v3.4 sin cambiar clases
- Alternativas: Tailwind v3.4 (fallback directo)

### DEC-011: Sin state management library (2026-02-18)
- Decision: No usar Zustand, Redux ni similares. Solo useState local y i18next state
- Razon: Landing page con estado minimo: idioma (i18next), menu mobile (useState), form (useState). Agregar state manager seria over-engineering
- Alternativas: Zustand (innecesario), Redux (overkill)

### DEC-012: Cormorant Garamond + Inter como font pairing (2026-02-18)
- Decision: Cormorant Garamond (serif) para titulos, Inter (sans-serif) para cuerpo
- Razon: Cormorant evoca autoridad financiera londinense. Inter es el estandar de legibilidad en pantalla. Juntos crean la estetica "Apple + Goldman Sachs" solicitada
- Alternativas: Playfair Display + Inter (Playfair mas decorativo, menos financiero), Libre Baskerville + Outfit

### DEC-013: Hero con gradiente CSS sin imagen (2026-02-18)
- Decision: Hero background como CSS gradient oscuro con patron geometrico sutil. Sin dependencia de imagen
- Razon: Carga instantanea (0KB adicional), no bloquea LCP, no hay riesgo de imagen de stock generica. Se puede agregar imagen como progressive enhancement despues
- Alternativas: Imagen de skyline con overlay (dependencia de asset, peso adicional)
