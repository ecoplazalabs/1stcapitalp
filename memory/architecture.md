# Architecture - 1st Capital Partners Landing Page

**Version:** 1.0
**Date:** 2026-02-18
**Author:** Architect Agent (Opus)
**Status:** Approved for Sprint 1

---

## 1. Tech Stack

| Layer | Technology | Version | Reason |
|-------|-----------|---------|--------|
| Bundler | Vite | ^6.1 | Fast HMR, native ESM, optimal for SPA landing pages |
| Framework | React | ^19.0 | Client decision, team experience from eptokens/acobsouth |
| Language | TypeScript | ^5.7 | Strict mode, zero `any` policy |
| Styling | Tailwind CSS | ^4.0 | Utility-first, JIT, client decision |
| Animations | Framer Motion | ^12.4 | Best React integration, scroll-triggered animations, lightweight API |
| i18n | react-i18next + i18next | ^15.4 / ^24.2 | Industry standard, lazy loading, namespace support, no page reload |
| Icons | Lucide React | ^0.475 | Consistent line icons, tree-shakeable, MIT license |
| Fonts | Google Fonts (self-hosted via fontsource) | -- | Optimal performance: no external requests, font-display swap |
| Linting | ESLint + Prettier | ^9.x / ^3.x | Consistent code style across team |
| Testing | Vitest + React Testing Library | ^3.x / ^16.x | Native Vite integration, fast, compatible with Jest API |

### DEC-006: Vite over Create React App (2026-02-18)

- **Decision:** Use Vite as bundler/dev server
- **Alternatives evaluated:** CRA (deprecated, slow), Webpack manual (overkill), Astro (SSG/MPA oriented, not pure SPA)
- **Reason:** Vite is the de facto standard for React SPAs in 2026. Sub-second HMR, native ESM, optimized production builds with Rollup. CRA is officially deprecated. Amplify supports Vite out of the box.
- **Risk:** None. Vite is stable and widely adopted.

### DEC-007: Framer Motion over GSAP (2026-02-18)

- **Decision:** Use Framer Motion for all animations
- **Alternatives evaluated:** GSAP (powerful but heavy, commercial license for some features), CSS-only (limited scroll triggers), AOS (abandoned, jQuery-era patterns), Motion One (lighter but less React-native)
- **Reason:** Framer Motion provides declarative React animations with built-in `whileInView` for scroll-triggered effects, `useScroll` for parallax, `AnimatePresence` for mount/unmount. Covers all needs: fade-in, slide-up, counters, stagger, hover states. 18KB gzipped. No license concerns.
- **Risk:** Slightly larger than CSS-only approach. Mitigated by tree-shaking and the fact that animation-heavy pages benefit from a dedicated library.

### DEC-008: react-i18next for internationalization (2026-02-18)

- **Decision:** Use react-i18next with JSON translation files
- **Alternatives evaluated:** Custom context-based solution (fragile, no tooling), react-intl (heavier, ICU message format overkill for this), lingui (good but smaller community)
- **Reason:** react-i18next is the most adopted React i18n library. Supports lazy loading of languages, namespace splitting, interpolation, and has excellent TypeScript support. For a landing page with EN/ES, it provides the right balance of power and simplicity. Language switch without page reload is native behavior.
- **Risk:** None. Well-maintained, lightweight for our use case.

### DEC-009: Self-hosted fonts via Fontsource (2026-02-18)

- **Decision:** Use @fontsource packages instead of Google Fonts CDN
- **Alternatives evaluated:** Google Fonts CDN (external request, GDPR concerns, render-blocking potential), Adobe Fonts (paid, heavier)
- **Reason:** Self-hosting eliminates external network requests (better FCP/LCP), avoids GDPR issues with Google tracking, enables font-display: swap by default, and allows subsetting. Critical for the Lighthouse 90+ target.
- **Risk:** Slightly larger initial bundle. Mitigated by loading only needed weights (400, 500, 600, 700).

---

## 2. Folder Structure

```
src/
├── main.tsx                          # React entry point
├── App.tsx                           # Root component, layout shell
├── vite-env.d.ts                     # Vite type declarations
│
├── components/                       # Reusable UI components
│   ├── ui/                           # Atomic design elements
│   │   ├── Button.tsx                # CTA buttons (primary, secondary, outline)
│   │   ├── SectionHeading.tsx        # Consistent section title + subtitle
│   │   ├── Card.tsx                  # Reusable card with hover effect
│   │   ├── Counter.tsx               # Animated number counter
│   │   ├── LanguageToggle.tsx        # EN|ES selector
│   │   ├── Container.tsx             # Max-width wrapper with padding
│   │   └── Divider.tsx               # Red vertical line brand motif
│   │
│   ├── layout/                       # Structural components
│   │   ├── Header.tsx                # Sticky header with scroll behavior
│   │   ├── MobileMenu.tsx            # Hamburger slide-out menu
│   │   ├── Footer.tsx                # Section 4.9
│   │   └── ScrollToTop.tsx           # Floating back-to-top button
│   │
│   └── sections/                     # Landing page sections (one per spec section)
│       ├── Hero.tsx                   # Section 4.2 - Full-viewport hero
│       ├── ExecutiveOverview.tsx      # Section 4.3 - Who We Are
│       ├── InvestmentProfile.tsx      # Section 4.4 - Strategy & numbers
│       ├── SectorExpertise.tsx        # Section 4.5 - 4 sector cards
│       ├── ValueCreation.tsx          # Section 4.6 - Holding model diagram
│       ├── PracticeAreas.tsx          # Section 4.7 - 4 practice area cards
│       └── Contact.tsx               # Section 4.8 - CTA + form
│
├── hooks/                            # Custom React hooks
│   ├── useScrollAnimation.ts         # Framer Motion scroll-triggered reveal
│   ├── useCounter.ts                 # Animated counter logic
│   ├── useActiveSection.ts           # Track which section is in viewport (for nav highlight)
│   └── useMediaQuery.ts             # Responsive breakpoint detection
│
├── i18n/                             # Internationalization
│   ├── index.ts                      # i18next initialization config
│   ├── en/                           # English translations
│   │   └── translation.json          # All EN strings
│   └── es/                           # Spanish translations
│       └── translation.json          # All ES strings
│
├── assets/                           # Static assets
│   ├── logo/                         # SVG logo variants
│   │   ├── logo-full.svg             # Full logo (1st | Capital Partners)
│   │   ├── logo-mark.svg             # Icon-only version for mobile/favicon
│   │   └── logo-white.svg            # White variant for dark backgrounds
│   ├── icons/                        # Custom SVG icons (if Lucide doesn't cover)
│   └── images/                       # Background images, hero overlays
│       └── hero-bg.webp              # Hero background (optimized)
│
├── styles/                           # Global styles
│   └── globals.css                   # Tailwind directives, font imports, base resets
│
├── lib/                              # Utilities and constants
│   ├── constants.ts                  # Company data, navigation items, section IDs
│   ├── animations.ts                 # Shared Framer Motion animation variants
│   └── utils.ts                      # Helper functions (classnames merge, etc.)
│
└── types/                            # TypeScript type definitions
    └── index.ts                      # Shared interfaces (SectionProps, NavItem, etc.)
```

```
Root files:
├── index.html                        # Vite entry HTML (meta tags, OG, schema markup)
├── package.json
├── tsconfig.json                     # Strict mode TypeScript config
├── tsconfig.node.json                # Node-specific TS config for vite.config
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts                # Tailwind theme extensions (NOT needed in v4, see note)
├── postcss.config.js                 # PostCSS with Tailwind plugin
├── eslint.config.js                  # Flat ESLint config
├── .prettierrc                       # Prettier config
├── .env.example                      # Template for environment variables
├── .gitignore
└── amplify.yml                       # AWS Amplify build configuration
```

**Note on Tailwind v4:** Tailwind CSS v4 uses a CSS-first configuration approach. Theme customization goes in `src/styles/globals.css` using `@theme` directive instead of a separate `tailwind.config.ts`. If Tailwind v4 proves unstable for the team, fall back to v3.4 with the traditional config file. See Section 9 for the theme definition.

### Design Principles Behind This Structure

1. **Flat over nested.** No more than 2 levels of nesting. A landing page does not need deep folder hierarchies.
2. **One component per file.** Each `.tsx` file exports exactly one component. No barrel files except `types/index.ts`.
3. **Sections are first-class.** Each landing page section is a standalone component in `components/sections/`. They compose `ui/` components but own their layout.
4. **Translations are data.** JSON files, not code. Easy to hand off for professional translation.
5. **Assets co-located by type.** SVGs, images, and icons each have their place. No scattering.

---

## 3. Design Patterns

### Component Architecture

**Pattern: Presentational Sections with Shared Animation Variants**

Each section component follows this structure:

```tsx
// components/sections/SectorExpertise.tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { fadeInUp, staggerContainer } from "../../lib/animations";

export const SectorExpertise = () => {
  const { t } = useTranslation();

  return (
    <section id="sectors" className="py-24 bg-neutral-950">
      <SectionHeading
        title={t("sectors.title")}
        subtitle={t("sectors.subtitle")}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {/* Cards here */}
      </motion.div>
    </section>
  );
};
```

### Key Patterns Used

| Pattern | Where | Why |
|---------|-------|-----|
| **Composition** | All UI components | Small, reusable pieces compose into sections. No inheritance. |
| **Custom Hooks** | `useCounter`, `useScrollAnimation`, `useActiveSection` | Extract reusable logic from components. Keep components declarative. |
| **Animation Variants** | `lib/animations.ts` | Single source of truth for animation configs. Consistent timing across sections. |
| **Translation Keys** | All visible text | Zero hardcoded strings. Every text goes through `t()` function. |
| **Section ID Convention** | Each section has a unique `id` | Enables smooth scroll navigation and active section tracking. |
| **Early Return** | All components | Guard clauses first, happy path last. No deep nesting. |

### State Management

**No state management library needed.** This is a landing page with minimal state:

- **Language toggle:** Handled by i18next's built-in state (persisted in localStorage)
- **Mobile menu open/close:** Local `useState` in Header
- **Active navigation section:** Custom hook with IntersectionObserver
- **Form inputs:** Local `useState` in Contact component
- **Scroll position:** Framer Motion's `useScroll` hook

Adding Zustand or Redux for a landing page would be over-engineering.

---

## 4. Animation Strategy

### Animation Library: Framer Motion

All animations use a centralized variants file for consistency.

```tsx
// lib/animations.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
```

### Animation Catalogue by Section

| Section | Animation | Trigger |
|---------|-----------|---------|
| Hero | Staggered fade-in-up for headline, subtitle, CTA | On mount (immediate) |
| Hero counters | Count from 0 to target number | `whileInView` |
| Executive Overview | Fade-in-up for text block, slide-in for location indicators | `whileInView`, once |
| Investment Profile | Cards stagger in from bottom | `whileInView`, once |
| Sector Expertise | 4 cards stagger in, hover: scale + shadow | `whileInView` + hover |
| Value Creation | Center diagram fades in, 4 pillars stagger around it | `whileInView`, once |
| Practice Areas | Cards/tabs slide in from alternating sides | `whileInView`, once |
| Contact | Form fades in, CTA button pulse subtle | `whileInView`, once |
| Header | Background opacity transitions from 0 to solid on scroll | Scroll position > 50px |
| All sections | `viewport={{ once: true, margin: "-100px" }}` | Triggers 100px before entering viewport |

### Counter Animation

```tsx
// hooks/useCounter.ts
import { useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";

export const useCounter = (target: number, ref: React.RefObject<HTMLElement>) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, target, count]);

  return rounded;
};
```

### Performance Rules for Animations

1. **`once: true` on all scroll animations.** Animate once, not every time user scrolls past.
2. **`will-change: transform` only during animation.** Framer Motion handles this automatically.
3. **No animations on mobile below 768px for heavy elements.** Use `useMediaQuery` to conditionally apply.
4. **`prefers-reduced-motion` respected.** Wrap animations in a check for accessibility.

---

## 5. i18n System

### Architecture

```
i18n/
├── index.ts              # i18next init
├── en/
│   └── translation.json  # { "hero.title": "Empowering Growth...", ... }
└── es/
    └── translation.json  # { "hero.title": "Impulsando el Crecimiento...", ... }
```

### Configuration

```tsx
// i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import es from "./es/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: "en",                          // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }, // React already escapes
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
});

export default i18n;
```

### Translation Key Convention

Flat dot-notation keys organized by section:

```json
{
  "nav.about": "About",
  "nav.strategy": "Strategy",
  "nav.sectors": "Sectors",
  "nav.services": "Services",
  "nav.contact": "Contact",
  "nav.cta": "Get in Touch",

  "hero.title": "Empowering Growth in the Lower Middle-Market",
  "hero.subtitle": "Strategic capital solutions for companies with $10M - $100M in revenue.",
  "hero.locations": "London | Luxembourg | UAE",
  "hero.cta": "Explore Our Approach",
  "hero.counter.capital": "Committed Capital",
  "hero.counter.offices": "Global Offices",
  "hero.counter.areas": "Practice Areas",

  "overview.title": "Executive Overview",
  "overview.subtitle": "Boutique Merchant Finance",

  "contact.form.name": "Full Name",
  "contact.form.email": "Email Address",
  "contact.form.company": "Company",
  "contact.form.message": "Message",
  "contact.form.submit": "Send Message",

  "footer.disclaimer": "This website is for informational purposes only and does not constitute an offer or solicitation.",
  "footer.copyright": "2026 1st Capital Partners. All rights reserved."
}
```

### Language Toggle Behavior

- Toggle in Header: `EN | ES` with active state on current language
- Switches instantly via `i18n.changeLanguage("es")`
- Persisted in `localStorage` key `i18nextLng`
- No page reload, no URL change (this is a single-page landing, not a routed app)
- `<html lang="">` attribute updates dynamically via `useEffect`

---

## 6. Typography

### Font Pairing

| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| **Headings** (h1-h3, hero, section titles) | **Cormorant Garamond** | 500 (Medium), 600 (SemiBold), 700 (Bold) | Georgia, "Times New Roman", serif |
| **Body** (paragraphs, nav, buttons, form) | **Inter** | 400 (Regular), 500 (Medium), 600 (SemiBold) | system-ui, -apple-system, sans-serif |

### Why This Pairing

- **Cormorant Garamond:** High-contrast serif with sharp, authoritative strokes. Used by luxury brands and financial institutions. Evokes London, heritage, trust. Excellent display characteristics at large sizes. Free, open source.
- **Inter:** The gold standard of UI sans-serif fonts. Designed for screens, exceptional legibility at all sizes. Used by Linear, Vercel, and numerous fintech products. Pairs naturally with high-contrast serifs.
- **Together:** The serif/sans-serif contrast creates visual hierarchy instantly. Serif titles demand attention; sans-serif body is effortless to read. This is the Apple + Goldman Sachs aesthetic the client wants.

### Implementation

```tsx
// Install via fontsource (no external requests)
// npm install @fontsource-variable/cormorant-garamond @fontsource-variable/inter

// In main.tsx or globals.css:
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
```

### Type Scale (Tailwind)

| Element | Desktop | Tablet | Mobile | Weight | Font |
|---------|---------|--------|--------|--------|------|
| Hero H1 | 5xl (3rem) | 4xl (2.25rem) | 3xl (1.875rem) | 700 | Cormorant |
| Section H2 | 4xl (2.25rem) | 3xl (1.875rem) | 2xl (1.5rem) | 600 | Cormorant |
| Section subtitle | lg (1.125rem) | base (1rem) | base | 400 | Inter |
| Body text | base (1rem) | base | sm (0.875rem) | 400 | Inter |
| Nav links | sm (0.875rem) | -- | -- | 500 | Inter |
| Button text | sm (0.875rem) | sm | sm | 600 | Inter |
| Counter numbers | 6xl (3.75rem) | 5xl | 4xl | 700 | Cormorant |

---

## 7. Component Strategy

### Component Hierarchy

```
App
├── Header (sticky)
│   ├── Logo (SVG component)
│   ├── NavLinks (smooth scroll anchors)
│   ├── LanguageToggle (EN|ES)
│   ├── CTA Button ("Get in Touch")
│   └── MobileMenu (hamburger + slide panel)
│
├── main
│   ├── Hero
│   │   ├── Container
│   │   ├── Heading (animated)
│   │   ├── Subtitle (animated, staggered)
│   │   ├── CTA Button (animated, staggered)
│   │   └── CounterGroup
│   │       └── Counter x3 (animated on view)
│   │
│   ├── ExecutiveOverview
│   │   ├── SectionHeading
│   │   ├── Content text block
│   │   └── LocationIndicators (London, Luxembourg, UAE)
│   │
│   ├── InvestmentProfile
│   │   ├── SectionHeading
│   │   └── StatsGrid
│   │       └── Card x4 (Revenue, EBITDA, Mix, Vehicle)
│   │
│   ├── SectorExpertise
│   │   ├── SectionHeading
│   │   └── SectorGrid
│   │       └── Card x4 (Industrial, Essential, Real Estate, Commodities)
│   │
│   ├── ValueCreation
│   │   ├── SectionHeading
│   │   └── PillarLayout (center + 4 pillars)
│   │       └── PillarCard x4
│   │
│   ├── PracticeAreas
│   │   ├── SectionHeading
│   │   └── PracticeGrid or Accordion
│   │       └── PracticeCard x4
│   │
│   └── Contact
│       ├── SectionHeading
│       ├── ContactInfo (address, email, phone)
│       └── ContactForm
│           ├── Input x3 (name, email, company)
│           ├── Textarea (message)
│           └── Button (submit)
│
└── Footer
    ├── Logo
    ├── NavLinks (quick section links)
    ├── Locations
    ├── Disclaimer
    └── Copyright
```

### Component Design Rules

1. **Every section gets a unique `id` attribute** matching navigation: `about`, `strategy`, `sectors`, `services`, `contact`.
2. **SectionHeading is reused everywhere.** It takes `title`, `subtitle`, optional `alignment` (center/left), optional `light` (for dark backgrounds).
3. **Card is generic.** It accepts `icon`, `title`, `description`, and optional `variant` (elevated, bordered, glass).
4. **No prop drilling deeper than 2 levels.** If data needs to go deeper, restructure the component.
5. **All text through `useTranslation()`.** No hardcoded English or Spanish strings in JSX.

---

## 8. Assets Strategy

### Logo

- **Source:** Recreate from `1CP Company Presentation Feb 26.pdf`
- **Format:** SVG, inline in React components (not `<img>` tags) for color control
- **Variants needed:**
  - `logo-full.svg`: Full horizontal logo for header and footer
  - `logo-mark.svg`: Just the "1st" mark for favicon and mobile header
  - `logo-white.svg`: White version for dark section backgrounds
- **Implementation:** SVG as React components using `vite-plugin-svgr` or direct JSX

### Hero Background

- **Option A (recommended):** CSS gradient with subtle geometric pattern. No external image dependency. Instant load. Dark (#111) to slightly lighter (#1a1a2e) diagonal gradient with subtle grid/line pattern via CSS.
- **Option B:** High-quality compressed WebP image of London skyline with dark overlay. Must be < 150KB, with blur-up placeholder.
- **Decision:** Start with Option A for performance. Add Option B as progressive enhancement if client wants photography.

### Section Backgrounds

| Section | Background |
|---------|-----------|
| Hero | Dark gradient (#111 to #1a1a2e) |
| Executive Overview | White (#FFFFFF) |
| Investment Profile | Light gray (#F5F5F5) |
| Sector Expertise | Near-black (#0a0a0a) |
| Value Creation | White (#FFFFFF) |
| Practice Areas | Light gray (#F5F5F5) |
| Contact | Dark (#111111) with red accent |
| Footer | Black (#000000) |

This alternating light/dark pattern creates visual rhythm and breaks the page into digestible segments.

### Icons

- **Primary:** Lucide React icons for sector cards, practice areas, value creation pillars
- **Custom:** Only if Lucide doesn't have the exact icon needed (unlikely for our use case)
- **Style:** Consistent 24px stroke width, corporate red (#CC0000) on light backgrounds, white on dark backgrounds

### Favicon

- SVG favicon (modern browsers) + PNG fallback (32x32, 16x16)
- Use the "1st" mark from the logo
- Apple touch icon: 180x180 PNG

### Image Optimization Rules

1. All raster images in WebP format
2. Lazy loading via `loading="lazy"` on all images below the fold
3. Explicit `width` and `height` attributes to prevent CLS
4. Hero background (if used): preloaded via `<link rel="preload">`
5. SVGs inlined as React components for dynamic styling

---

## 9. Tailwind CSS Theme

### Tailwind v4 CSS-First Configuration

In Tailwind v4, theme customization is done in CSS using the `@theme` directive.

```css
/* src/styles/globals.css */

@import "tailwindcss";

@theme {
  /* Colors - Corporate Palette */
  --color-brand-red: #CC0000;
  --color-brand-red-dark: #A30000;
  --color-brand-red-light: #FF1A1A;

  --color-neutral-950: #111111;
  --color-neutral-900: #1A1A1A;
  --color-neutral-800: #2A2A2A;
  --color-neutral-700: #333333;
  --color-neutral-500: #6B6B6B;
  --color-neutral-300: #B0B0B0;
  --color-neutral-100: #F5F5F5;
  --color-neutral-50: #FAFAFA;

  --color-gold: #C5A45A;
  --color-gold-light: #D4B96A;

  /* Typography */
  --font-heading: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;

  /* Spacing - Section padding */
  --spacing-section: 6rem;
  --spacing-section-mobile: 4rem;

  /* Border radius */
  --radius-card: 0.5rem;

  /* Transitions */
  --transition-default: 300ms cubic-bezier(0.22, 1, 0.36, 1);

  /* Breakpoints (Tailwind v4 defaults cover our needs) */
  /* sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px */
  /* Add custom if needed: */
  --breakpoint-3xl: 1920px;
}

/* Base layer overrides */
@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-body);
    color: var(--color-neutral-700);
    background-color: #ffffff;
  }

  h1, h2, h3 {
    font-family: var(--font-heading);
    color: var(--color-neutral-950);
  }

  ::selection {
    background-color: var(--color-brand-red);
    color: #ffffff;
  }
}
```

### Usage in Components

```tsx
{/* Corporate red button */}
<button className="bg-brand-red hover:bg-brand-red-dark text-white font-body font-semibold px-6 py-3 rounded-card transition-default">
  Get in Touch
</button>

{/* Section heading */}
<h2 className="font-heading text-4xl font-semibold text-neutral-950">
  Executive Overview
</h2>

{/* Dark section */}
<section className="bg-neutral-950 text-white py-section">
  ...
</section>
```

### Tailwind v4 Fallback Plan

If Tailwind v4 causes issues during development (it was released in January 2025 and some edge cases may exist), the fallback is:

1. Install `tailwindcss@3.4` instead
2. Move the theme config to `tailwind.config.ts` using the traditional `extend` syntax
3. Everything else stays the same -- class names are identical

---

## 10. AWS Amplify Deployment

### Build Configuration

```yaml
# amplify.yml (project root)
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

### Amplify Settings

| Setting | Value |
|---------|-------|
| Framework | Vite (auto-detected) |
| Build output directory | `dist` |
| Node.js version | 20.x (LTS) |
| Build command | `npm run build` |
| Environment variables | None needed for MVP (no backend) |

### SPA Routing

Since this is a single-page landing (no client-side routing), no special redirect rules are needed. However, add this for safety in case direct URL access is attempted:

```json
// Amplify console > Rewrites and redirects
[
  {
    "source": "/<*>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  }
]
```

### Custom Domain

- Configure in Amplify console: `1stcapitalp.com`
- SSL certificate: Auto-provisioned by Amplify (ACM)
- HTTPS enforced automatically
- www redirect: `www.1stcapitalp.com` -> `1stcapitalp.com`

### Performance Headers

Add via Amplify custom headers configuration:

```yaml
# amplify.yml (add under frontend)
customHeaders:
  - pattern: "**/*"
    headers:
      - key: "X-Content-Type-Options"
        value: "nosniff"
      - key: "X-Frame-Options"
        value: "DENY"
      - key: "X-XSS-Protection"
        value: "1; mode=block"
      - key: "Referrer-Policy"
        value: "strict-origin-when-cross-origin"
      - key: "Strict-Transport-Security"
        value: "max-age=31536000; includeSubDomains"
  - pattern: "/assets/**"
    headers:
      - key: "Cache-Control"
        value: "public, max-age=31536000, immutable"
```

---

## 11. SEO & Meta Configuration

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta -->
  <title>1st Capital Partners | Boutique Merchant Finance - London</title>
  <meta name="description" content="Boutique Financial Holding Company empowering lower middle-market companies with innovative capital structuring. London | Luxembourg | UAE. $150M+ committed capital." />

  <!-- Open Graph (LinkedIn critical) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="1st Capital Partners | Boutique Merchant Finance" />
  <meta property="og:description" content="Strategic capital solutions for companies with $10M - $100M in revenue. London | Luxembourg | UAE." />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:url" content="https://1stcapitalp.com" />
  <meta property="og:site_name" content="1st Capital Partners" />

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="1st Capital Partners | Boutique Merchant Finance" />
  <meta name="twitter:description" content="Strategic capital solutions for companies with $10M - $100M in revenue." />
  <meta name="twitter:image" content="/og-image.png" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

  <!-- Font preload (critical for FCP) -->
  <link rel="preload" href="/assets/fonts/cormorant-garamond-latin-700.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/inter-latin-400.woff2" as="font" type="font/woff2" crossorigin />

  <!-- Schema.org Organization markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "1st Capital Partners",
    "legalName": "1st Capital Partners",
    "url": "https://1stcapitalp.com",
    "logo": "https://1stcapitalp.com/logo.svg",
    "description": "Boutique Financial Holding Company empowering lower middle-market companies.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "27 Old Gloucester Street",
      "addressLocality": "London",
      "postalCode": "WC1N 3AX",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971-50-721-8491",
      "email": "Cesar.forero@1stcapitalp.com",
      "contactType": "customer service"
    },
    "sameAs": []
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### OG Image

Create a 1200x630px branded image for LinkedIn sharing. Dark background with the 1st Capital Partners logo, tagline, and London skyline silhouette.

---

## 12. Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| FCP | < 2s | Self-hosted fonts, no render-blocking CSS, minimal JS in critical path |
| LCP | < 3s | Hero content is text (instant), preload hero background if image |
| TBT | < 200ms | No heavy JS computation, Framer Motion is async |
| CLS | < 0.1 | Explicit dimensions on all media, font-display: swap |
| Bundle size (gzipped) | < 120KB JS | Tree-shaking, no unused libraries |
| Lighthouse score | 90+ all categories | Semantic HTML, ARIA, meta tags, HTTPS, headers |

### Bundle Size Estimates

| Package | Gzipped Size |
|---------|-------------|
| React + ReactDOM | ~45KB |
| Framer Motion (tree-shaken) | ~18KB |
| react-i18next + i18next | ~12KB |
| Lucide React (tree-shaken, ~20 icons) | ~5KB |
| Application code | ~15KB |
| Tailwind CSS (purged) | ~8KB |
| **Total estimated** | **~103KB** |

Well within budget. No lazy loading or code splitting needed for a single-page landing.

---

## Summary of Architecture Decisions

| ID | Decision | Date |
|----|----------|------|
| DEC-001 | React + Tailwind CSS for frontend | 2026-02-18 |
| DEC-002 | AWS Amplify for hosting | 2026-02-18 |
| DEC-003 | Recreate logo from PDF as SVG | 2026-02-18 |
| DEC-004 | Contact form frontend-only for MVP | 2026-02-18 |
| DEC-005 | Bilingual EN/ES with selector, no reload | 2026-02-18 |
| DEC-006 | Vite as bundler (over CRA, Webpack) | 2026-02-18 |
| DEC-007 | Framer Motion for animations (over GSAP) | 2026-02-18 |
| DEC-008 | react-i18next for i18n | 2026-02-18 |
| DEC-009 | Self-hosted fonts via Fontsource | 2026-02-18 |
| DEC-010 | Tailwind v4 CSS-first config (v3.4 fallback) | 2026-02-18 |
| DEC-011 | No state management library (local state only) | 2026-02-18 |
| DEC-012 | Cormorant Garamond + Inter font pairing | 2026-02-18 |
| DEC-013 | CSS gradient hero background (no image dependency) | 2026-02-18 |
