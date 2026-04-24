import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Container } from "@/components/ui/Container";
import { Disclaimer } from "@/components/blog/Disclaimer";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { formatPostDate, getPostBySlug } from "@/lib/posts";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { PostLang } from "@/types/blog";

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang: PostLang = i18n.language.startsWith("es") ? "es" : "en";
  const post = useMemo(
    () => (slug ? getPostBySlug(slug, lang) : undefined),
    [slug, lang]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0 });
  }, [lang, slug]);

  if (!slug || !post) {
    return <Navigate to="/blog" replace />;
  }

  const topicLabel = t(`blog.topics.${post.topic}`, {
    defaultValue: post.topic,
  });
  const PostContent = post.Component;

  return (
    <>
      <a
        href="#post-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brand-red focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t("accessibility.skip")}
      </a>

      <Header />

      <main
        id="post-main"
        className="bg-white pt-32 pb-24 md:pt-40 md:pb-32"
      >
        <Container>
          <motion.article
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                {t("blog.backToList")}
              </Link>
            </motion.div>

            <motion.header variants={fadeInUp} className="mb-10">
              <div className="mb-5 flex flex-wrap items-center gap-3 font-body text-xs uppercase tracking-[0.12em] text-neutral-500">
                <span className="font-semibold text-brand-red">
                  {topicLabel}
                </span>
                <span
                  className="h-1 w-1 rounded-full bg-neutral-300"
                  aria-hidden="true"
                />
                <time dateTime={post.date}>
                  {formatPostDate(post.date, lang)}
                </time>
                <span
                  className="h-1 w-1 rounded-full bg-neutral-300"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  {post.readingMinutes ?? 3} {t("blog.readingMinutes")}
                </span>
              </div>

              <h1 className="mb-6 font-heading text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <p className="font-body text-lg leading-relaxed text-neutral-600 md:text-xl">
                {post.excerpt}
              </p>
            </motion.header>

            <motion.div variants={fadeInUp}>
              <MDXProvider components={mdxComponents}>
                <PostContent />
              </MDXProvider>
            </motion.div>

            <motion.footer variants={fadeInUp} className="mt-12 border-t border-neutral-200 pt-6">
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-700 transition-colors hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
              >
                {t("blog.source")}: {post.sourceName}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </motion.footer>

            <Disclaimer />
          </motion.article>
        </Container>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};
