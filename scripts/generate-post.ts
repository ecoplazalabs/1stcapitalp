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

  let chosen: FeedItem | undefined;
  for (const candidate of ranked.slice(0, 8)) {
    const slugCandidate = safeSlug(candidate.title);
    if (!slugCandidate) continue;
    // eslint-disable-next-line no-await-in-loop
    const exists = await postExists(slugCandidate);
    if (!exists) {
      chosen = candidate;
      break;
    }
  }
  if (!chosen) {
    log(`All top candidates already published. Exiting.`);
    process.exit(0);
  }
  log(`Chosen article: "${chosen.title}" (${chosen.sourceName})`);

  const nowIso = new Date().toISOString();

  const ensureSourceLink = (
    body: string,
    lang: "en" | "es"
  ): string => {
    if (body.includes(chosen!.link)) return body;
    const label =
      lang === "en" ? "Read the full article" : "Leer el artículo completo";
    log(`  ↪ ${lang}: source link missing, appending footer automatically`);
    return `${body.trim()}\n\n[${label} →](${chosen!.link})\n`;
  };

  const write = async (
    lang: "en" | "es",
    forcedSlug?: string
  ): Promise<string> => {
    log(`Generating ${lang.toUpperCase()} post with Claude…`);
    const out = await generateWithClaude(lang, chosen!, topic, config);
    const slug =
      forcedSlug ?? (safeSlug(out.slug) || safeSlug(out.title));
    if (forcedSlug) {
      log(`  ↪ ${lang}: using canonical slug "${forcedSlug}"`);
    }
    out.body = ensureSourceLink(out.body, lang);

    const validation = validatePost(out.body, chosen!, config);
    for (const w of validation.warnings) log(`  ⚠ ${lang}: ${w}`);
    if (!validation.ok) {
      log(`  ✗ ${lang}: validation failed`);
      for (const e of validation.errors) log(`      ${e}`);
      throw new Error(`Post failed compliance validation (${lang})`);
    }

    const post: GeneratedPost = {
      title: out.title.slice(0, 120),
      slug,
      excerpt: out.excerpt.slice(0, 240),
      body: out.body,
      topic: topic.id,
      sourceUrl: chosen!.link,
      sourceName: chosen!.sourceName,
      date: nowIso,
      readingMinutes: out.readingMinutes,
      lang,
    };

    if (DRY_RUN) {
      log(`  (dry-run) would write ${lang}/${post.slug}.mdx`);
      console.log("\n----- FRONTMATTER PREVIEW -----");
      console.log(JSON.stringify(post, null, 2).slice(0, 1000));
      console.log("----- BODY PREVIEW -----");
      console.log(post.body.slice(0, 600));
      console.log("-----\n");
      return slug;
    }

    const written = await writePost(post);
    log(`  ✓ wrote ${written}`);
    return slug;
  };

  const canonicalSlug = await write("en");
  await write("es", canonicalSlug);

  log("Done.");
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[blog-gen] fatal:", err instanceof Error ? err.message : err);
    process.exit(1);
  });
