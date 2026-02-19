import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { staggerContainer, heroTextVariants } from "@/lib/animations";
import { COMPANY } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0d0d0d 0%, #111111 40%, #14142a 70%, #0d0d1a 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Red accent gradient — top left corner */}
      <div
        className="absolute left-0 top-0 h-[600px] w-[600px] opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, #CC0000 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <Container className="relative z-10 flex flex-col items-center py-32 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center gap-8"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={heroTextVariants}
            custom={0}
            className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brand-red"
          >
            {t("overview.subtitle")}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={heroTextVariants}
            custom={0.1}
            className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance"
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={heroTextVariants}
            custom={0.2}
            className="flex flex-col items-center gap-3"
          >
            <p className="max-w-2xl font-body text-base text-neutral-300 md:text-lg lg:text-xl">
              {t("hero.subtitle")}
            </p>
            <p className="font-body text-sm font-medium tracking-[0.12em] text-neutral-500">
              {t("hero.locations")}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={heroTextVariants}
            custom={0.3}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("about")}
              className="min-w-[200px]"
            >
              {t("hero.cta")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="min-w-[180px]"
            >
              {t("nav.cta")}
            </Button>
          </motion.div>

          {/* Counters */}
          <motion.div
            variants={heroTextVariants}
            custom={0.5}
            className="mt-8 w-full"
          >
            <div className="mx-auto max-w-2xl">
              {/* Divider line */}
              <div className="mb-10 h-px bg-white/10" aria-hidden="true" />

              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <Counter
                  prefix="$"
                  value={COMPANY.COMMITTED_CAPITAL}
                  suffix="M+"
                  label={t("hero.counter.capital.label")}
                  light
                />
                <Counter
                  value={COMPANY.GLOBAL_OFFICES}
                  label={t("hero.counter.offices.label")}
                  light
                />
                <Counter
                  value={COMPANY.PRACTICE_AREAS}
                  label={t("hero.counter.areas.label")}
                  light
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm p-2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
};
