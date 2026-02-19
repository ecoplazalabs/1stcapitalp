import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  useInView,
  type MotionValue,
} from "framer-motion";

type EasingName =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate";

interface UseCounterOptions {
  duration?: number;
  ease?: EasingName | [number, number, number, number];
}

interface UseCounterReturn {
  count: MotionValue<number>;
  rounded: MotionValue<number>;
  ref: React.RefObject<HTMLElement | null>;
}

// Animated counter hook. Counts from 0 to target when element enters viewport.
// Returns count (raw float), rounded (integer), and ref to attach to the trigger element.
export const useCounter = (
  target: number,
  options: UseCounterOptions = {},
): UseCounterReturn => {
  const { duration = 2, ease = "easeOut" } = options;
  const ref = useRef<HTMLElement | null>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, [0, target], {
      duration,
      ease,
      onComplete: () => {
        count.set(target);
      },
    });

    return () => controls.stop();
  }, [isInView, target, count, duration, ease]);

  return { count, rounded, ref };
};
