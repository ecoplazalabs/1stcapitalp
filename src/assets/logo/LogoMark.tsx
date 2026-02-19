import { cn } from "@/lib/utils";

interface LogoMarkProps {
  /** Color variant: "dark" for light backgrounds, "light" for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Condensed "1st" mark for compact spaces such as mobile header or favicon.
 */
export const LogoMark = ({ variant = "dark", className }: LogoMarkProps) => {
  const isLight = variant === "light";
  const mainColor = isLight ? "#FFFFFF" : "#1A1A1A";

  return (
    <svg
      viewBox="0 0 44 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="1st Capital Partners"
      role="img"
      className={cn("h-10 w-auto", className)}
    >
      {/* "1" numeral */}
      <text
        x="0"
        y="38"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="42"
        fontWeight="700"
        fill={mainColor}
      >
        1
      </text>
      {/* "st" superscript in brand-red */}
      <text
        x="26"
        y="20"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="16"
        fontWeight="600"
        fill="#CC0000"
      >
        st
      </text>
    </svg>
  );
};
