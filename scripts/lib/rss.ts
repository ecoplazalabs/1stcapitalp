import Parser from "rss-parser";
import type { FeedItem, Source, Topic } from "./types.js";

const parser = new Parser({
  timeout: 12_000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; 1stCapitalPartnersBot/1.0; +https://1stcapitalp.com)",
  },
});

const FRESH_WINDOW_MS = 36 * 60 * 60 * 1000;

export const fetchAllFeeds = async (sources: Source[]): Promise<FeedItem[]> => {
  const results = await Promise.allSettled(
    sources.map(async (s) => {
      const feed = await parser.parseURL(s.url);
      return (feed.items ?? []).map<FeedItem>((item) => ({
        title: (item.title ?? "").trim(),
        link: item.link ?? "",
        pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
        contentSnippet: (item.contentSnippet ?? item.content ?? "").trim(),
        sourceName: s.name,
        sourceTier: s.tier,
      }));
    })
  );

  const items: FeedItem[] = [];
  const now = Date.now();
  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const it of r.value) {
      if (!it.title || !it.link) continue;
      const ts = new Date(it.pubDate).getTime();
      if (Number.isFinite(ts) && now - ts > FRESH_WINDOW_MS) continue;
      items.push(it);
    }
  }
  return items;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const titleSimilarity = (a: string, b: string) => {
  const ta = new Set(normalize(a).split(" ").filter((w) => w.length > 3));
  const tb = new Set(normalize(b).split(" ").filter((w) => w.length > 3));
  if (ta.size === 0 || tb.size === 0) return 0;
  let shared = 0;
  for (const w of ta) if (tb.has(w)) shared += 1;
  return shared / Math.min(ta.size, tb.size);
};

export const dedupItems = (items: FeedItem[]): FeedItem[] => {
  const kept: FeedItem[] = [];
  for (const it of items) {
    const isDup = kept.some((k) => titleSimilarity(k.title, it.title) >= 0.6);
    if (!isDup) kept.push(it);
  }
  return kept;
};

export const filterByTopic = (items: FeedItem[], topic: Topic): FeedItem[] => {
  const kws = topic.keywords.map((k) => k.toLowerCase());
  return items.filter((it) => {
    const haystack = normalize(`${it.title} ${it.contentSnippet}`);
    return kws.some((k) => haystack.includes(k.toLowerCase()));
  });
};

export const rankItems = (items: FeedItem[]): FeedItem[] =>
  [...items].sort((a, b) => {
    const tierDelta =
      (a.sourceTier === "official" ? 1 : 0) -
      (b.sourceTier === "official" ? 1 : 0);
    if (tierDelta !== 0) return -tierDelta;
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
