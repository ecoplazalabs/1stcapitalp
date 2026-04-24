import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPosts } from "@/lib/posts";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { PostLang } from "@/types/blog";

export const BlogListPage = () => {
  const { t, i18n } = useTranslation();
  const lang: PostLang = i18n.language.startsWith("es") ? "es" : "en";
  const posts = useMemo(() => getPosts(lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0 });
  }, [lang]);

  return (
    <>
      <a
        href="#blog-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brand-red focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t("accessibility.skip")}
      </a>

      <Header />

      <main
        id="blog-main"
        className="bg-white pt-32 pb-24 md:pt-40 md:pb-32"
      >
        <Container>
          <motion.header
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16 flex flex-col gap-5 border-b border-neutral-200 pb-12 md:mb-20 md:pb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red"
            >
              {t("blog.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="max-w-3xl font-heading text-4xl font-semibold leading-tight text-neutral-950 md:text-5xl lg:text-6xl"
            >
              {t("blog.title")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl font-body text-base leading-relaxed text-neutral-600 md:text-lg"
            >
              {t("blog.subtitle")}
            </motion.p>
          </motion.header>

          {posts.length === 0 ? (
            <p className="font-body text-base text-neutral-500">
              {t("blog.empty")}
            </p>
          ) : (
            <motion.div
              key={lang}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3"
            >
              {posts.map((post, i) => (
                <BlogCard
                  key={`${post.lang}-${post.slug}`}
                  post={post}
                  lang={lang}
                  index={i}
                />
              ))}
            </motion.div>
          )}
        </Container>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};
