import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="mb-6 font-heading text-4xl font-semibold text-neutral-950 md:text-5xl"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mb-4 mt-12 font-heading text-2xl font-semibold text-neutral-950 md:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mb-3 mt-8 font-heading text-xl font-semibold text-neutral-950 md:text-2xl"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p
      className="mb-5 font-body text-base leading-relaxed text-neutral-700 md:text-lg"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="mb-6 list-disc space-y-2 pl-6 font-body text-base leading-relaxed text-neutral-700 md:text-lg"
      {...props}
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="mb-6 list-decimal space-y-2 pl-6 font-body text-base leading-relaxed text-neutral-700 md:text-lg"
      {...props}
    />
  ),
  li: (props: ComponentProps<"li">) => <li className="pl-1" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-brand-red pl-6 font-heading text-xl italic text-neutral-800 md:text-2xl"
      {...props}
    />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="font-medium text-brand-red underline decoration-brand-red/30 underline-offset-4 transition-colors hover:decoration-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={
        props.href?.startsWith("http") ? "noopener noreferrer" : undefined
      }
      {...props}
    />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-neutral-950" {...props} />
  ),
  hr: () => <hr className="my-12 border-neutral-200" />,
};
