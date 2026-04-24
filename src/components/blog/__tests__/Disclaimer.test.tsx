import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Disclaimer } from "../Disclaimer";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "blog.disclaimer.ariaLabel": "Legal disclaimer",
        "blog.disclaimer.title": "Disclaimer.",
        "blog.disclaimer.body":
          "This content is for informational purposes only and does not constitute investment advice.",
      };
      return map[key] ?? key;
    },
    i18n: { language: "en", changeLanguage: vi.fn() },
  }),
}));

describe("Disclaimer", () => {
  it("renders the legal note landmark", () => {
    render(<Disclaimer />);
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it("renders the disclaimer title and body text", () => {
    render(<Disclaimer />);
    expect(screen.getByText("Disclaimer.")).toBeInTheDocument();
    expect(
      screen.getByText(/does not constitute investment advice/i)
    ).toBeInTheDocument();
  });

  it("has aria-label for accessibility", () => {
    render(<Disclaimer />);
    const note = screen.getByRole("note");
    expect(note).toHaveAttribute("aria-label", "Legal disclaimer");
  });
});
