import type { ComponentType } from "react";

export type PostLang = "en" | "es";

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  topic: string;
  sourceUrl: string;
  sourceName: string;
  readingMinutes?: number;
}

export interface Post extends PostFrontmatter {
  lang: PostLang;
  Component: ComponentType;
}
