import type { ComponentType } from "react";
import type { Post, PostFrontmatter, PostLang } from "@/types/blog";

interface MDXModule {
  default: ComponentType;
  frontmatter: PostFrontmatter;
}

const modulesEn = import.meta.glob<MDXModule>("/content/posts/en/*.mdx", {
  eager: true,
});
const modulesEs = import.meta.glob<MDXModule>("/content/posts/es/*.mdx", {
  eager: true,
});

const toPosts = (
  mods: Record<string, MDXModule>,
  lang: PostLang
): Post[] =>
  Object.values(mods).map((m) => ({
    ...m.frontmatter,
    lang,
    Component: m.default,
  }));

const allPosts: Post[] = [
  ...toPosts(modulesEn, "en"),
  ...toPosts(modulesEs, "es"),
].sort((a, b) => b.date.localeCompare(a.date));

export const getPosts = (lang: PostLang): Post[] =>
  allPosts.filter((p) => p.lang === lang);

export const getPostBySlug = (
  slug: string,
  lang: PostLang
): Post | undefined => {
  const match = allPosts.find((p) => p.slug === slug && p.lang === lang);
  if (match) return match;
  const fallbackLang: PostLang = lang === "en" ? "es" : "en";
  return allPosts.find((p) => p.slug === slug && p.lang === fallbackLang);
};

export const formatPostDate = (iso: string, lang: PostLang): string => {
  const date = new Date(iso);
  return date.toLocaleDateString(lang === "en" ? "en-GB" : "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
