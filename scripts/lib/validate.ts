import type { FeedItem, TopicsConfig } from "./types.js";

export interface ValidationResult {
  ok: boolean;
  warnings: string[];
  errors: string[];
}

const extractNumbers = (text: string): string[] => {
  const matches = text.match(/\d[\d.,]*\s*(?:%|bp|bps|basis points|bn|m|k|trillion|billion|million)?/gi);
  return matches ? matches.map((n) => n.trim().toLowerCase()) : [];
};

const normalizeNumber = (n: string) =>
  n.replace(/\s+/g, "").replace(/,/g, "");

export const validatePost = (
  body: string,
  source: FeedItem,
  config: TopicsConfig
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sourceHaystack = `${source.title} ${source.contentSnippet}`.toLowerCase();

  if (config.compliance.requireSourceLink && !body.includes(source.link)) {
    errors.push(`Source link ${source.link} is missing from the post body.`);
  }

  const quoteMatches = body.match(/"([^"]{1,400})"/g) ?? [];
  for (const raw of quoteMatches) {
    const inner = raw.slice(1, -1);
    const wordCount = inner.split(/\s+/).filter(Boolean).length;
    if (wordCount > config.compliance.maxQuoteWords) {
      errors.push(
        `Direct quote exceeds ${config.compliance.maxQuoteWords} words (${wordCount}): "${inner.slice(0, 80)}…"`
      );
    }
  }

  const bodyNumbers = extractNumbers(body);
  for (const n of bodyNumbers) {
    const clean = normalizeNumber(n);
    if (clean.length < 2) continue;
    const bareDigits = clean.replace(/[^\d.]/g, "");
    if (!bareDigits) continue;
    if (
      !sourceHaystack.includes(bareDigits) &&
      !sourceHaystack.includes(clean)
    ) {
      warnings.push(`Number "${n}" not found verbatim in source snippet.`);
    }
  }

  return {
    ok: errors.length === 0,
    warnings,
    errors,
  };
};
