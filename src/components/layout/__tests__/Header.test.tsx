import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

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
  return { ...actual, scrollToSection: vi.fn() };
});

describe("Header", () => {
  it("renders the header landmark element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the logo with accessible label", () => {
    render(<Header />);
    expect(screen.getByRole("img", { name: "1st Capital Partners" })).toBeInTheDocument();
  });

  it("renders the logo button to go to top", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: "1st Capital Partners - Go to top" })
    ).toBeInTheDocument();
  });

  it("renders all desktop navigation items", () => {
    render(<Header />);
    expect(screen.getAllByRole("button", { name: "nav.about" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "nav.strategy" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "nav.sectors" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "nav.value" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "nav.services" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "nav.contact" })[0]).toBeInTheDocument();
  });

  it("renders the language toggle with EN and ES labels", () => {
    render(<Header />);
    expect(screen.getAllByText("EN").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ES").length).toBeGreaterThan(0);
  });

  it("renders the CTA button in the desktop header", () => {
    render(<Header />);
    expect(screen.getAllByRole("button", { name: "nav.cta" })[0]).toBeInTheDocument();
  });

  it("renders the mobile hamburger menu button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: "accessibility.menu.open" })
    ).toBeInTheDocument();
  });

  it("renders a primary navigation landmark", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
  });
});
