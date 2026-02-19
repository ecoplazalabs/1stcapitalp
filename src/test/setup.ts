import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock IntersectionObserver — JSDOM does not implement it
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// Mock window.matchMedia — JSDOM does not implement it
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.scrollTo used by the Header logo button
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});
