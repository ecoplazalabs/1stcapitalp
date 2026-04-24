import { writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import type { GeneratedPost } from "./types.js";

const CONTENT_ROOT = path.resolve(process.cwd(), "content", "posts");

const slugify = (input: string) =>
  input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

export const safeSlug = slugify;

export const postFilename = (date: string, slug: string) => {
  const d = new Date(date).toISOString().slice(0, 10);
  return `${d}-${slug}.mdx`;
};

export const postExists = async (slug: string): Promise<boolean> => {
  try {
    const files = await readdir(path.join(CONTENT_ROOT, "en"));
    return files.some((f) => f.endsWith(`-${slug}.mdx`));
  } catch {
    return false;
  }
};

const escapeFrontmatter = (s: string) => s.replace(/"/g, '\\"');

export const writePost = async (post: GeneratedPost): Promise<string> => {
  const dir = path.join(CONTENT_ROOT, post.lang);
  await mkdir(dir, { recursive: true });

  const frontmatter = [
    "---",
    `title: "${escapeFrontmatter(post.title)}"`,
    `slug: "${post.slug}"`,
    `date: "${post.date}"`,
    `topic: "${post.topic}"`,
    `excerpt: "${escapeFrontmatter(post.excerpt)}"`,
    `sourceUrl: "${post.sourceUrl}"`,
    `sourceName: "${escapeFrontmatter(post.sourceName)}"`,
    `readingMinutes: ${post.readingMinutes}`,
    "---",
    "",
    post.body.trim(),
    "",
  ].join("\n");

  const filename = postFilename(post.date, post.slug);
  const fullPath = path.join(dir, filename);
  await writeFile(fullPath, frontmatter, "utf8");
  return fullPath;
};
