import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "../Hero";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: vi.fn() },
  }),
}));

vi.mock("framer-motion", async () => {
  const { createFramerMotionMock } = await import("@/test/framer-mock");
  return createFramerMotionMock();
});

vi.mock("@/lib/utils", async () => {
  const actual = await vi.importActual<typeof import("@/lib/utils")>("@/lib/utils");
  return {
    ...actual,
    scrollToSection: vi.fn(),
  };
});

describe("Hero", () => {
  it("renders the section with id hero", () => {
    render(<Hero />);
    expect(document.getElementById("hero")).toBeInTheDocument();
  });

  it("renders the h1 headline using the translation key", () => {
    render(<Hero />);
    // The mock t() returns the key itself
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("hero.title");
  });

  it("renders the committed capital counter label", () => {
    render(<Hero />);
    expect(screen.getByText("hero.counter.capital.label")).toBeInTheDocument();
  });

  it("renders the global offices counter label", () => {
    render(<Hero />);
    expect(screen.getByText("hero.counter.offices.label")).toBeInTheDocument();
  });

  it("renders the practice areas counter label", () => {
    render(<Hero />);
    expect(screen.getByText("hero.counter.areas.label")).toBeInTheDocument();
  });

  it("renders the primary CTA button", () => {
    render(<Hero />);
    expect(screen.getByRole("button", { name: "hero.cta" })).toBeInTheDocument();
  });

  it("renders the secondary CTA button", () => {
    render(<Hero />);
    expect(screen.getByRole("button", { name: "nav.cta" })).toBeInTheDocument();
  });

  it("renders the scroll down button with accessible label", () => {
    render(<Hero />);
    expect(screen.getByRole("button", { name: "Scroll down" })).toBeInTheDocument();
  });

  it("calls scrollToSection when primary CTA is clicked", async () => {
    const { scrollToSection } = await import("@/lib/utils");
    render(<Hero />);
    await userEvent.click(screen.getByRole("button", { name: "hero.cta" }));
    expect(scrollToSection).toHaveBeenCalledWith("about");
  });

  it("calls scrollToSection with contact when secondary CTA is clicked", async () => {
    const { scrollToSection } = await import("@/lib/utils");
    render(<Hero />);
    await userEvent.click(screen.getByRole("button", { name: "nav.cta" }));
    expect(scrollToSection).toHaveBeenCalledWith("contact");
  });
});
