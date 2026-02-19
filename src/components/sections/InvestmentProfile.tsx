import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  BarChart2,
  GitMerge,
  Landmark,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  description: string;
}

const StatCard = ({ icon: Icon, label, value, description }: StatCardProps) => (
  <motion.div
    variants={fadeInUp}
    className="group relative overflow-hidden rounded-sm bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    {/* Top accent */}
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

    <div className="flex flex-col gap-6">
      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-brand-red/8 text-brand-red transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
        <Icon size={20} />
      </div>

      {/* Label */}
      <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
        {label}
      </p>

      {/* Value — big Cormorant number */}
      <p className="font-heading text-4xl font-bold leading-none text-brand-red md:text-5xl">
        {value}
      </p>

      {/* Description */}
      <p className="font-body text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  </motion.div>
);

export const InvestmentProfile = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: TrendingUp,
      label: t("strategy.card1.label"),
      value: t("strategy.card1.value"),
      description: t("strategy.card1.desc"),
    },
    {
      icon: BarChart2,
      label: t("strategy.card2.label"),
      value: t("strategy.card2.value"),
      description: t("strategy.card2.desc"),
    },
    {
      icon: GitMerge,
      label: t("strategy.card3.label"),
      value: t("strategy.card3.value"),
      description: t("strategy.card3.desc"),
    },
    {
      icon: Landmark,
      label: t("strategy.card4.label"),
      value: t("strategy.card4.value"),
      description: t("strategy.card4.desc"),
    },
  ];

  return (
    <section
      id="strategy"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#F5F5F5" }}
      aria-labelledby="strategy-heading"
    >
      <Container>
        <SectionHeading
          title={t("strategy.title")}
          subtitle={t("strategy.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
