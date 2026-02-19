import { useRef } from "react";
import { useInView } from "framer-motion";

interface UseScrollAnimationOptions {
  once?: boolean;
  margin?: `${number}px`;
  amount?: number | "some" | "all";
}

// Returns ref and isInView for custom scroll-triggered animations.
// For declarative whileInView usage, prefer the variants from lib/animations.ts directly.
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { once = true, margin = "-100px", amount = 0.1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin, amount });

  return { ref, isInView };
};

// Convenience: returns Framer Motion declarative props for whileInView pattern.
// Usage: <motion.div {...getAnimationProps()} variants={fadeInUp} />
export const getAnimationProps = (margin = "-100px") => ({
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin },
});
