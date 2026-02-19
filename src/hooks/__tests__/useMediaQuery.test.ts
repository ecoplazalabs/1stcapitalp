import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMediaQuery, useIsMobile } from "../useMediaQuery";

// Each test gets a fresh matchMedia mock so we can control `matches`
function createMatchMediaMock(matches: boolean) {
  const listeners: Array<() => void> = [];

  const mql = {
    matches,
    media: "",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (_event: string, cb: () => void) => {
      listeners.push(cb);
    },
    removeEventListener: (_event: string, cb: () => void) => {
      const idx = listeners.indexOf(cb);
      if (idx !== -1) listeners.splice(idx, 1);
    },
    dispatchEvent: vi.fn(),
    // Helper to simulate a media-query state change
    _triggerChange: (newMatches: boolean) => {
      mql.matches = newMatches;
      listeners.forEach((cb) => cb());
    },
  };

  return mql;
}

describe("useMediaQuery", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when matchMedia reports no match", () => {
    const mql = createMatchMediaMock(false);
    vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);
  });

  it("returns true when matchMedia reports a match", () => {
    const mql = createMatchMediaMock(true);
    vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);
  });

  it("updates the return value when the media query state changes", () => {
    const mql = createMatchMediaMock(false);
    vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);

    act(() => {
      mql._triggerChange(true);
    });

    expect(result.current).toBe(true);
  });

  it("removes the event listener on unmount", () => {
    const mql = createMatchMediaMock(false);
    const removeEventListenerSpy = vi.spyOn(mql, "removeEventListener");
    vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("change", expect.any(Function));
  });
});

describe("useIsMobile", () => {
  it("returns false when the viewport is not mobile-sized", () => {
    const mql = createMatchMediaMock(false);
    vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when the viewport is mobile-sized", () => {
    const mql = createMatchMediaMock(true);
    vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("passes the correct query string to matchMedia", () => {
    const mql = createMatchMediaMock(false);
    const matchMediaSpy = vi.spyOn(window, "matchMedia").mockReturnValue(mql as unknown as MediaQueryList);

    renderHook(() => useIsMobile());

    expect(matchMediaSpy).toHaveBeenCalledWith("(max-width: 767px)");
  });
});
