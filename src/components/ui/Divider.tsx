import { cn } from "@/lib/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  light?: boolean;
}

export const Divider = ({
  orientation = "vertical",
  className,
  light = false,
}: DividerProps) => {
  if (orientation === "vertical") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "w-0.5 flex-shrink-0 rounded-full",
          light ? "bg-brand-red/70" : "bg-brand-red",
          className
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-0.5 w-12 rounded-full",
        light ? "bg-brand-red/70" : "bg-brand-red",
        className
      )}
    />
  );
};
