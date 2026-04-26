import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  dedupItems,
  fetchAllFeeds,
  filterByTopic,
  rankItems,
} from "./lib/rss.js";
import { generateWithClaude } from "./lib/claude.js";
import { validatePost } from "./lib/validate.js";
import { postExists, safeSlug, writePost } from "./lib/mdx.js";
import type {
  FeedItem,
  GeneratedPost,
  Topic,
  TopicsConfig,
} from "./lib/types.js";

const args = process.argv.slice(2);
const getFlag = (name: string) => {
  const prefix = `--${name}=`;
  const match = args.find((a) => a.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
};
const hasFlag = (name: string) => args.includes(`--${name}`);

const DRY_RUN = hasFlag("dry-run");
const TOPIC_OVERRIDE = getFlag("topic");

const loadConfig = async (): Promise<TopicsConfig> => {
  const raw = await readFile(
    path.resolve(process.cwd(), "content", "topics.json"),
    "utf8"
  );
  return JSON.parse(raw) as TopicsConfig;
};

const pickTopic = (config: TopicsConfig): Topic => {
  if (TOPIC_OVERRIDE) {
    const t = config.topics.find(
      (x) => x.id === TOPIC_OVERRIDE && x.enabled
    );
    if (!t) throw new Error(`Topic "${TOPIC_OVERRIDE}" not enabled in topics.json`);
    return t;
  }
  const enabled = config.topics.filter((t) => t.enabled);
  if (enabled.length === 0) {
    throw new Error("No topics enabled in topics.json");
  }
  const pool: Topic[] = [];
  for (const t of enabled) {
    const w = config.weights[t.id] ?? 1;
    for (let i = 0; i < w; i++) pool.push(t);
  }
  return pool[Math.floor(Math.random() * pool.length)];
};

const log = (msg: string) => console.log(`[blog-gen] ${msg}`);

const main = async () => {
  const config = await loadConfig();
  const topic = pickTopic(config);
  log(`Topic selected: ${topic.id} (${topic.label.en})`);

  log(`Fetching ${config.sources.length} RSS feeds…`);
  const all = await fetchAllFeeds(config.sources);
  log(`  → ${all.length} fresh items (last 36h)`);

  const relevant = filterByTopic(all, topic);
  log(`  → ${relevant.length} items match topic keywords`);

  const deduped = dedupItems(relevant);
  log(`  → ${deduped.length} after dedup`);

  const ranked = rankItems(deduped);
  if (ranked.length === 0) {
    log(`No suitable article found for topic "${topic.id}". Exiting.`);
    process.exit(0);
  }

  const nowIso = new Date().toISOString();

  const ensureSourceLink = (
    body: string,
    lang: "en" | "es",
    chosen: FeedItem
  ): string => {
    if (body.includes(chosen.link)) return body;
    const label =
      lang === "en" ? "Read the full article" : "Leer el artículo completo";
    log(`  ↪ ${lang}: source link missing, appending footer automatically`);
    return `${body.trim()}\n\n[${label} →](${chosen.link})\n`;
  };

  const buildPost = async (
    chosen: FeedItem,
    lang: "en" | "es",
    forcedSlug?: string
  ): Promise<GeneratedPost | null> => {
    log(`Generating ${lang.toUpperCase()} post with Claude…`);
    const out = await generateWithClaude(lang, chosen, topic, config);
    const slug =
      forcedSlug ?? (safeSlug(out.slug) || safeSlug(out.title));
    if (forcedSlug) {
      log(`  ↪ ${lang}: using canonical slug "${forcedSlug}"`);
    }
    out.body = ensureSourceLink(out.body, lang, chosen);

    const validation = validatePost(out.body, chosen, config);
    for (const w of validation.warnings) log(`  ⚠ ${lang}: ${w}`);
    if (!validation.ok) {
      log(`  ✗ ${lang}: validation failed`);
      for (const e of validation.errors) log(`      ${e}`);
      return null;
    }

    return {
      title: out.title.slice(0, 120),
      slug,
      excerpt: out.excerpt.slice(0, 240),
      body: out.body,
      topic: topic.id,
      sourceUrl: chosen.link,
      sourceName: chosen.sourceName,
      date: nowIso,
      readingMinutes: out.readingMinutes,
      lang,
    };
  };

  const MAX_ATTEMPTS = 3;
  let attempts = 0;
  for (const candidate of ranked) {
    if (attempts >= MAX_ATTEMPTS) break;
    const slugCandidate = safeSlug(candidate.title);
    if (!slugCandidate) continue;
    // eslint-disable-next-line no-await-in-loop
    const exists = await postExists(slugCandidate);
    if (exists) continue;

    attempts += 1;
    log(
      `Attempt ${attempts}/${MAX_ATTEMPTS}: "${candidate.title}" (${candidate.sourceName})`
    );

    // eslint-disable-next-line no-await-in-loop
    const enPost = await buildPost(candidate, "en");
    if (!enPost) {
      log(`  ⤳ EN failed validation, trying next candidate.`);
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const esPost = await buildPost(candidate, "es", enPost.slug);
    if (!esPost) {
      log(`  ⤳ ES failed validation, trying next candidate.`);
      continue;
    }

    if (DRY_RUN) {
      log(`  (dry-run) would write en/${enPost.slug}.mdx and es/${esPost.slug}.mdx`);
      console.log("\n----- EN PREVIEW -----");
      console.log(enPost.body.slice(0, 400));
      console.log("\n----- ES PREVIEW -----");
      console.log(esPost.body.slice(0, 400));
      console.log("-----\n");
      log("Done.");
      return;
    }

    // eslint-disable-next-line no-await-in-loop
    const enPath = await writePost(enPost);
    log(`  ✓ wrote ${enPath}`);
    // eslint-disable-next-line no-await-in-loop
    const esPath = await writePost(esPost);
    log(`  ✓ wrote ${esPath}`);
    log("Done.");
    return;
  }

  log(
    `No candidate passed validation after ${attempts} attempt(s). Exiting cleanly without publishing.`
  );
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[blog-gen] fatal:", err instanceof Error ? err.message : err);
    process.exit(1);
  });
