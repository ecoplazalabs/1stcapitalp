import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter as render } from "@/test/router-wrapper";
import { BlogCard } from "../BlogCard";
import type { Post } from "@/types/blog";

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

const basePost: Post = {
  title: "ECB Holds Rates as Eurozone Inflation Cools",
  slug: "ecb-holds-rates",
  date: "2026-04-22T08:00:00Z",
  excerpt: "The ECB kept its deposit rate at 2.50% for the third consecutive meeting.",
  topic: "macro",
  sourceUrl: "https://ecb.europa.eu/example",
  sourceName: "European Central Bank",
  readingMinutes: 3,
  lang: "en",
  Component: () => null,
};

describe("BlogCard", () => {
  it("renders the post title", () => {
    render(<BlogCard post={basePost} lang="en" />);
    expect(
      screen.getByText("ECB Holds Rates as Eurozone Inflation Cools")
    ).toBeInTheDocument();
  });

  it("renders the topic label", () => {
    render(<BlogCard post={basePost} lang="en" />);
    expect(screen.getByText("blog.topics.macro")).toBeInTheDocument();
  });

  it("renders the excerpt", () => {
    render(<BlogCard post={basePost} lang="en" />);
    expect(
      screen.getByText(/deposit rate at 2.50%/i)
    ).toBeInTheDocument();
  });

  it("links to the post detail route", () => {
    render(<BlogCard post={basePost} lang="en" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/ecb-holds-rates");
  });

  it("renders the reading minutes", () => {
    render(<BlogCard post={basePost} lang="en" />);
    expect(
      screen.getByText(/3\s+blog\.readingMinutes/)
    ).toBeInTheDocument();
  });

  it("renders the publication date", () => {
    render(<BlogCard post={basePost} lang="en" />);
    const time = document.querySelector("time");
    expect(time).toHaveAttribute("dateTime", basePost.date);
  });
});
