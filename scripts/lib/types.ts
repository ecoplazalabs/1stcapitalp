export interface Topic {
  id: string;
  label: { en: string; es: string };
  keywords: string[];
  enabled: boolean;
}

export interface Source {
  name: string;
  url: string;
  tier: "primary" | "official";
}

export interface TopicsConfig {
  topics: Topic[];
  weights: Record<string, number>;
  sources: Source[];
  compliance: {
    maxQuoteWords: number;
    maxSummarySentences: number;
    requireSourceLink: boolean;
    requireDisclaimer: boolean;
  };
}

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  sourceName: string;
  sourceTier: "primary" | "official";
}

export interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  topic: string;
  sourceUrl: string;
  sourceName: string;
  date: string;
  readingMinutes: number;
  lang: "en" | "es";
}
