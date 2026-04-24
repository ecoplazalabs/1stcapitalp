import { describe, it, expect } from "vitest";
import { validatePost } from "../lib/validate";
import type { FeedItem, TopicsConfig } from "../lib/types";

const baseSource: FeedItem = {
  title: "ECB keeps rates unchanged",
  link: "https://ecb.europa.eu/example",
  pubDate: "2026-04-22T08:00:00Z",
  contentSnippet:
    "The ECB held its deposit rate at 2.50% and the main refinancing rate at 2.65%. Inflation was 2.1% in March.",
  sourceName: "European Central Bank",
  sourceTier: "official",
};

const compliance: TopicsConfig["compliance"] = {
  maxQuoteWords: 25,
  maxSummarySentences: 6,
  requireSourceLink: true,
  requireDisclaimer: true,
};
const config = { compliance } as TopicsConfig;

describe("validatePost", () => {
  it("passes when numbers are in source and link is present", () => {
    const body = [
      "## What happened",
      "The ECB kept the deposit rate at 2.50% and the main refinancing rate at 2.65%.",
      "[Read the full article →](https://ecb.europa.eu/example)",
    ].join("\n");
    const result = validatePost(body, baseSource, config);
    expect(result.ok).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails when source link is missing", () => {
    const body = "The ECB kept the deposit rate at 2.50%.";
    const result = validatePost(body, baseSource, config);
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("Source link"))).toBe(true);
  });

  it("fails when a direct quote exceeds the word limit", () => {
    const longQuote = Array.from({ length: 40 }, (_, i) => `word${i}`).join(" ");
    const body = `"${longQuote}" — Source.\n[Read](https://ecb.europa.eu/example)`;
    const result = validatePost(body, baseSource, config);
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("exceeds"))).toBe(true);
  });

  it("warns when a cited number is not in the source snippet", () => {
    const body = [
      "The ECB raised rates by 400 basis points since 2022.",
      "[Read](https://ecb.europa.eu/example)",
    ].join("\n");
    const result = validatePost(body, baseSource, config);
    expect(result.ok).toBe(true);
    expect(result.warnings.some((w) => w.includes("400"))).toBe(true);
  });

  it("passes when a quote is under the word limit", () => {
    const body = [
      '"Rates are on hold." — ECB.',
      "[Read](https://ecb.europa.eu/example)",
    ].join("\n");
    const result = validatePost(body, baseSource, config);
    expect(result.ok).toBe(true);
  });
});
