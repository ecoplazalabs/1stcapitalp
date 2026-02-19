import { cn } from "@/lib/utils";

interface LogoFullProps {
  variant?: "dark" | "light";
  className?: string;
}

export const LogoFull = ({ variant = "dark", className }: LogoFullProps) => {
  const isLight = variant === "light";
  const textColor = isLight ? "#FFFFFF" : "#1A1A1A";
  const redColor = "#CC0000";
  const subtextColor = isLight ? "#B0B0B0" : "#555555";

  return (
    <svg
      viewBox="0 0 220 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="1st Capital Partners"
      role="img"
      className={cn("h-10 w-auto", className)}
    >
      {/* "1" numeral - large */}
      <text
        x="0"
        y="38"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="42"
        fontWeight="700"
        fill={textColor}
      >
        1
      </text>
      {/* "st" superscript */}
      <text
        x="26"
        y="20"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="16"
        fontWeight="600"
        fill={textColor}
      >
        st
      </text>

      {/* Red vertical divider line */}
      <rect x="48" y="4" width="2" height="40" rx="1" fill={redColor} />

      {/* "Capital" in red */}
      <text
        x="58"
        y="26"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="20"
        fontWeight="600"
        fill={redColor}
      >
        Capital
      </text>

      {/* "Partners" below in text color */}
      <text
        x="58"
        y="42"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill={subtextColor}
        letterSpacing="2"
      >
        PARTNERS
      </text>
    </svg>
  );
};
