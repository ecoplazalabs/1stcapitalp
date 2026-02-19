import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "elevated" | "bordered" | "glass" | "flat";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  hoverable?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  elevated: "bg-white shadow-sm hover:shadow-lg",
  bordered: "bg-white border border-neutral-200 hover:border-brand-red/30",
  glass:
    "bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-white/20",
  flat: "bg-neutral-100",
};

export const Card = ({
  children,
  variant = "elevated",
  className,
  hoverable = true,
}: CardProps) => {
  return (
    <motion.div
      whileHover={
        hoverable
          ? { y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }
          : undefined
      }
      className={cn(
        "rounded-sm p-6 transition-all duration-300",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
};
