import React from "react";
import { vi } from "vitest";

const FRAMER_PROPS = new Set([
  "initial", "animate", "whileInView", "variants", "viewport",
  "transition", "custom", "whileHover", "whileTap", "exit",
  "whileFocus", "whileDrag", "layout", "layoutId", "onAnimationComplete",
]);

export async function createFramerMotionMock() {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_target, prop) => {
          if (typeof prop === "string") {
            return ({
              children,
              ...props
            }: React.PropsWithChildren<Record<string, unknown>>) => {
              const Tag = prop as React.ElementType;
              const domProps = Object.fromEntries(
                Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key))
              );
              return <Tag {...domProps}>{children}</Tag>;
            };
          }
        },
      }
    ),
    AnimatePresence: ({ children }: React.PropsWithChildren) => children,
    useScroll: () => ({
      scrollY: {
        on: vi.fn(() => vi.fn()),
        get: vi.fn(() => 0),
      },
    }),
    useTransform: (_value: unknown, _input: unknown, output: unknown[]) =>
      output?.[0] ?? 0,
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
      on: vi.fn(() => vi.fn()),
    }),
    useInView: () => false,
  };
}
