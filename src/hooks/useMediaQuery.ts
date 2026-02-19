import { useState, useEffect } from "react";

// Returns true if the given media query matches.
// Uses matchMedia API with addEventListener for modern browsers.
// SSR-safe: defaults to false until mounted.
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

// Convenience hooks for common breakpoints (mobile-first)
export const useIsMobile = (): boolean => useMediaQuery("(max-width: 767px)");
export const useIsTablet = (): boolean =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = (): boolean => useMediaQuery("(min-width: 1024px)");
export const useIsLargeDesktop = (): boolean => useMediaQuery("(min-width: 1280px)");
export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
