import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Divider } from "./Divider";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  light?: boolean;
  className?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  alignment = "center",
  light = false,
  className,
}: SectionHeadingProps) => {
  const isCenter = alignment === "center";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "mb-16 md:mb-20",
        isCenter ? "text-center" : "text-left",
        className
      )}
    >
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            "mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-brand-red/80" : "text-brand-red"
          )}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        variants={fadeInUp}
        className={cn(
          "flex items-center gap-4",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        {!isCenter && (
          <Divider
            orientation="vertical"
            className="h-10"
            light={light}
          />
        )}
        <h2
          className={cn(
            "font-heading text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl",
            light ? "text-white" : "text-neutral-950",
            "text-balance"
          )}
        >
          {title}
        </h2>
      </motion.div>

      {isCenter && (
        <motion.div
          variants={fadeInUp}
          className="mt-4 flex justify-center"
        >
          <Divider orientation="horizontal" className="w-10" light={light} />
        </motion.div>
      )}
    </motion.div>
  );
};
