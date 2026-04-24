import { describe, it, expect } from "vitest";
import { dedupItems, filterByTopic, rankItems } from "../lib/rss";
import type { FeedItem, Topic } from "../lib/types";

const makeItem = (overrides: Partial<FeedItem> = {}): FeedItem => ({
  title: "ECB keeps rates unchanged at 2.50%",
  link: "https://example.com/a",
  pubDate: "2026-04-22T08:00:00Z",
  contentSnippet: "Fed watchers and ECB policy update.",
  sourceName: "Reuters",
  sourceTier: "primary",
  ...overrides,
});

const macroTopic: Topic = {
  id: "macro",
  label: { en: "Macro", es: "Macro" },
  keywords: ["ECB", "Fed", "inflation"],
  enabled: true,
};

describe("filterByTopic", () => {
  it("keeps items matching any topic keyword (case-insensitive)", () => {
    const items = [
      makeItem({ title: "ECB holds rates" }),
      makeItem({ title: "Tech earnings beat estimates", contentSnippet: "" }),
    ];
    const filtered = filterByTopic(items, macroTopic);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe("ECB holds rates");
  });

  it("matches keywords in the snippet even if title does not", () => {
    const items = [
      makeItem({
        title: "European central bank press conference",
        contentSnippet: "inflation data released today",
      }),
    ];
    const filtered = filterByTopic(items, macroTopic);
    expect(filtered).toHaveLength(1);
  });
});

describe("dedupItems", () => {
  it("removes near-duplicate titles", () => {
    const items = [
      makeItem({ title: "ECB holds deposit rate at 2.50% for third meeting" }),
      makeItem({
        title: "ECB holds deposit rate at 2.50% for the third consecutive meeting",
        link: "https://b.com",
      }),
      makeItem({
        title: "Tech earnings season kicks off strong",
        link: "https://c.com",
      }),
    ];
    const deduped = dedupItems(items);
    expect(deduped).toHaveLength(2);
  });

  it("keeps all items when titles are distinct", () => {
    const items = [
      makeItem({ title: "ECB decision" }),
      makeItem({ title: "Oil prices surge" }),
      makeItem({ title: "Tech merger announced" }),
    ];
    expect(dedupItems(items)).toHaveLength(3);
  });
});

describe("rankItems", () => {
  it("places official sources before primary sources", () => {
    const items = [
      makeItem({ title: "Reuters story", sourceTier: "primary" }),
      makeItem({ title: "ECB communique", sourceTier: "official" }),
    ];
    const ranked = rankItems(items);
    expect(ranked[0].title).toBe("ECB communique");
  });

  it("within same tier, newer items first", () => {
    const items = [
      makeItem({ title: "older", pubDate: "2026-04-20T00:00:00Z" }),
      makeItem({ title: "newer", pubDate: "2026-04-22T00:00:00Z" }),
    ];
    const ranked = rankItems(items);
    expect(ranked[0].title).toBe("newer");
  });
});
