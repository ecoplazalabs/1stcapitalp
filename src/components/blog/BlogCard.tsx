import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post, PostLang } from "@/types/blog";
import { formatPostDate } from "@/lib/posts";
import { fadeInUp } from "@/lib/animations";

interface BlogCardProps {
  post: Post;
  lang: PostLang;
  index?: number;
}

export const BlogCard = ({ post, lang }: BlogCardProps) => {
  const { t } = useTranslation();
  const topicLabel = t(`blog.topics.${post.topic}`, { defaultValue: post.topic });

  return (
    <motion.article
      variants={fadeInUp}
      className="group flex flex-col"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="flex flex-1 flex-col gap-5 rounded-sm p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        <div className="flex items-center gap-3 font-body text-xs uppercase tracking-[0.12em] text-neutral-500">
          <span className="font-semibold text-brand-red">{topicLabel}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-300" aria-hidden="true" />
          <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
        </div>

        <h3 className="font-heading text-2xl font-semibold leading-snug text-neutral-950 transition-colors duration-300 group-hover:text-brand-red md:text-3xl">
          {post.title}
        </h3>

        <p className="font-body text-base leading-relaxed text-neutral-600">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-200 pt-4">
          <div className="flex items-center gap-2 font-body text-xs text-neutral-500">
            <Clock size={13} aria-hidden="true" />
            <span>
              {post.readingMinutes ?? 3} {t("blog.readingMinutes")}
            </span>
          </div>
          <span
            className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-[0.12em] text-neutral-700 transition-colors duration-300 group-hover:text-brand-red"
          >
            {t("blog.readMore")}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};
