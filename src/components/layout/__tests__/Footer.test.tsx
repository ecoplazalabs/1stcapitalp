import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: vi.fn() },
  }),
}));

vi.mock("@/lib/utils", async () => {
  const actual = await vi.importActual<typeof import("@/lib/utils")>("@/lib/utils");
  return { ...actual, scrollToSection: vi.fn() };
});

describe("Footer", () => {
  it("renders the footer landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the company logo with accessible label", () => {
    render(<Footer />);
    expect(screen.getByRole("img", { name: "1st Capital Partners" })).toBeInTheDocument();
  });

  it("renders the footer tagline from translations", () => {
    render(<Footer />);
    expect(screen.getByText("footer.tagline")).toBeInTheDocument();
  });

  it("renders the footer navigation section heading", () => {
    render(<Footer />);
    expect(screen.getByText("footer.nav.title")).toBeInTheDocument();
  });

  it("renders navigation links for all NAV_ITEMS", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: "nav.about" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "nav.strategy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "nav.sectors" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "nav.value" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "nav.services" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "nav.contact" })).toBeInTheDocument();
  });

  it("renders the footer navigation landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("navigation", { name: "Footer navigation" })).toBeInTheDocument();
  });

  it("renders the CEO contact information", () => {
    render(<Footer />);
    // COMPANY.CEO is a constant — assert the literal value
    expect(screen.getByText("Cesar A. Forero J.")).toBeInTheDocument();
  });

  it("renders the company email as a mailto link", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: /cesar\.forero/i });
    expect(emailLink).toHaveAttribute("href", expect.stringContaining("mailto:"));
  });

  it("renders the disclaimer text from translations", () => {
    render(<Footer />);
    expect(screen.getByText("footer.disclaimer")).toBeInTheDocument();
  });

  it("renders the copyright text from translations", () => {
    render(<Footer />);
    expect(screen.getByText("footer.copyright")).toBeInTheDocument();
  });

  it("renders London address from company constants", () => {
    render(<Footer />);
    expect(screen.getByText(/27 Old Gloucester Street/)).toBeInTheDocument();
  });
});
