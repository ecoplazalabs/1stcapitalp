import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Settings, Shield, Users, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { fadeInUp, fadeIn, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

interface PillarProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  index: number;
}

const Pillar = ({ icon: Icon, title, description, index }: PillarProps) => (
  <motion.div
    variants={fadeInUp}
    custom={index * 0.15}
    className="group flex flex-col gap-5 rounded-sm border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-red/20 hover:shadow-lg hover:-translate-y-1"
  >
    {/* Icon */}
    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-brand-red/6 text-brand-red transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
      <Icon size={20} />
    </div>

    {/* Header row */}
    <div className="flex items-start gap-3">
      <Divider orientation="vertical" className="h-auto self-stretch flex-shrink-0 mt-1" />
      <h3 className="font-heading text-xl font-semibold text-neutral-950 md:text-2xl">
        {title}
      </h3>
    </div>

    {/* Description */}
    <p className="font-body text-sm leading-relaxed text-neutral-500">
      {description}
    </p>

    {/* Bottom accent */}
    <div className="mt-auto h-0.5 w-0 bg-brand-red transition-all duration-500 group-hover:w-full" />
  </motion.div>
);

export const ValueCreation = () => {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Settings,
      title: t("value.pillar1.title"),
      description: t("value.pillar1.desc"),
    },
    {
      icon: Shield,
      title: t("value.pillar2.title"),
      description: t("value.pillar2.desc"),
    },
    {
      icon: Users,
      title: t("value.pillar3.title"),
      description: t("value.pillar3.desc"),
    },
    {
      icon: TrendingUp,
      title: t("value.pillar4.title"),
      description: t("value.pillar4.desc"),
    },
  ];

  return (
    <section
      id="value"
      className="bg-white py-24 md:py-32"
      aria-labelledby="value-heading"
    >
      <Container>
        <SectionHeading
          id="value-heading"
          title={t("value.title")}
          subtitle={t("value.subtitle")}
        />

        {/* Intro text + central concept */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="font-body text-base leading-relaxed text-neutral-500 md:text-lg">
            {t("value.intro")}
          </p>
        </motion.div>

        {/* Central concept badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="mb-12 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-brand-red/20 bg-brand-red/4 px-6 py-3">
            <div className="h-2 w-2 rounded-full bg-brand-red" aria-hidden="true" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              {t("value.center")}
            </span>
            <div className="h-2 w-2 rounded-full bg-brand-red" aria-hidden="true" />
          </div>
        </motion.div>

        {/* 4 Pillars */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar, index) => (
            <Pillar key={pillar.title} {...pillar} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
