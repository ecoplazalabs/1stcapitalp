import type { Variants } from "framer-motion";

// ============================================================
// Centralized Framer Motion animation variants
// Easing: [0.22, 1, 0.36, 1] - custom spring-like curve
// All scroll animations use once: true (animate once only)
// ============================================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Alias for architecture spec compatibility
export const slideInLeft = fadeInLeft;
export const slideInRight = fadeInRight;

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.0 },
  },
};

// Custom variant with delay parameter - use with custom prop
export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
};

// Grows from left origin - used for accent lines and underlines
export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Grows from top - used for vertical dividers
export const lineGrowVertical: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Card hover state - use with whileHover/initial="rest"
export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  hover: {
    y: -6,
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// Counter variant - use with custom motion values
export const counterVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Subtle blur-in for section backgrounds
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

// Header background fade (used with useScroll)
export const headerBgVariants: Variants = {
  transparent: { backgroundColor: "rgba(17, 17, 17, 0)", backdropFilter: "blur(0px)" },
  solid: {
    backgroundColor: "rgba(17, 17, 17, 0.95)",
    backdropFilter: "blur(12px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Standard viewport config for scroll animations
export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-100px",
} as const;

// Viewport config for elements that should animate immediately
export const VIEWPORT_CONFIG_EAGER = {
  once: true,
  margin: "0px",
} as const;
