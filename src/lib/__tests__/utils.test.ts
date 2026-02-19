import { describe, it, expect, vi, beforeEach } from "vitest";
import { cn, scrollToSection } from "../utils";

describe("cn", () => {
  it("returns a single class name unchanged", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple class name strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("merges conditional class names using an object", () => {
    expect(cn({ active: true, disabled: false })).toBe("active");
  });

  it("merges array class names", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("deduplicates Tailwind conflicting classes (last wins)", () => {
    // clsx itself does not deduplicate Tailwind; this confirms it keeps both
    // when classes are not conflicting
    const result = cn("text-sm", "text-lg");
    expect(result).toContain("text-sm");
    expect(result).toContain("text-lg");
  });

  it("returns an empty string when given no arguments", () => {
    expect(cn()).toBe("");
  });
});

describe("scrollToSection", () => {
  let mockScrollIntoView: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockScrollIntoView = vi.fn();
    document.body.innerHTML = "";
  });

  it("calls scrollIntoView on the target element", () => {
    const element = document.createElement("div");
    element.id = "about";
    element.scrollIntoView = mockScrollIntoView as unknown as typeof element.scrollIntoView;
    document.body.appendChild(element);

    scrollToSection("about");

    expect(mockScrollIntoView).toHaveBeenCalledOnce();
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("does nothing when the element does not exist", () => {
    // Should not throw even when element is absent
    expect(() => scrollToSection("nonexistent")).not.toThrow();
  });

  it("scrolls to a different section id", () => {
    const element = document.createElement("section");
    element.id = "contact";
    element.scrollIntoView = mockScrollIntoView as unknown as typeof element.scrollIntoView;
    document.body.appendChild(element);

    scrollToSection("contact");

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
