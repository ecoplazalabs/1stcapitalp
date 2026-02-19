import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterProps {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
  className?: string;
}

export const Counter = ({
  prefix = "",
  value,
  suffix = "",
  label,
  light = false,
  className,
}: CounterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const isInView = useInView(containerRef, { once: true });

  if (isInView) {
    void animate(count, value, { duration: 2.2, ease: "easeOut" });
  }

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col items-center gap-2 text-center", className)}
    >
      <div className="flex items-baseline gap-0.5">
        {prefix && (
          <span
            className={cn(
              "font-heading text-2xl font-bold md:text-3xl",
              light ? "text-white" : "text-neutral-950"
            )}
          >
            {prefix}
          </span>
        )}
        <motion.span
          className={cn(
            "font-heading text-5xl font-bold leading-none md:text-6xl lg:text-7xl",
            light ? "text-white" : "text-neutral-950"
          )}
        >
          {rounded}
        </motion.span>
        {suffix && (
          <span
            className={cn(
              "font-heading text-3xl font-bold md:text-4xl",
              light ? "text-white" : "text-neutral-950"
            )}
          >
            {suffix}
          </span>
        )}
      </div>
      <p
        className={cn(
          "font-body text-xs font-medium uppercase tracking-[0.15em]",
          light ? "text-neutral-300" : "text-neutral-500"
        )}
      >
        {label}
      </p>
    </div>
  );
};
