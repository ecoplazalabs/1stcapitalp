import { useState, useEffect, useRef } from "react";
import type { SectionId } from "@/types";

interface UseActiveSectionOptions {
  threshold?: number;
  rootMargin?: string;
}

// Tracks which section is currently in the viewport using IntersectionObserver.
// Returns the ID of the active section for nav link highlighting.
export const useActiveSection = (
  sectionIds: SectionId[],
  options: UseActiveSectionOptions = {},
): SectionId | null => {
  const { threshold = 0.4, rootMargin = "-80px 0px -40% 0px" } = options;
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionId);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    const observer = observerRef.current;

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
};
