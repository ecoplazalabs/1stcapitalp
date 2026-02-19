import { useSyncExternalStore } from "react";

// Returns true if the given media query matches.
// Uses useSyncExternalStore for tear-free reads (React 18+).
// SSR-safe: defaults to false via getServerSnapshot.
export const useMediaQuery = (query: string): boolean => {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

// Convenience hook for common breakpoint (mobile-first)
export const useIsMobile = (): boolean => useMediaQuery("(max-width: 767px)");
