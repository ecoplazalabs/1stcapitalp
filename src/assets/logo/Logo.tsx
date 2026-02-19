import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * Full horizontal logo for light backgrounds.
 * "1st" in dark, red vertical line, "Capital" in brand-red, "PARTNERS" in gray.
 */
export const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 220 48"
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
        fill="#1A1A1A"
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
        fill="#1A1A1A"
      >
        st
      </text>
      {/* Red vertical divider line */}
      <rect x="48" y="4" width="2" height="40" rx="1" fill="#CC0000" />
      {/* "Capital" in red */}
      <text
        x="58"
        y="26"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="20"
        fontWeight="600"
        fill="#CC0000"
      >
        Capital
      </text>
      {/* "Partners" in dark gray */}
      <text
        x="58"
        y="42"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#555555"
        letterSpacing="2"
      >
        PARTNERS
      </text>
    </svg>
  );
};
