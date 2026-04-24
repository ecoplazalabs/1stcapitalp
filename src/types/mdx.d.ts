declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  export const frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    topic: string;
    sourceUrl: string;
    sourceName: string;
    slug: string;
    readingMinutes?: number;
  };
  const MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
}
