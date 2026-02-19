import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Factory, HeartPulse, Building2, Gem } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

interface SectorCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  index: number;
}

const SectorCard = ({
  icon: Icon,
  title,
  description,
  index,
}: SectorCardProps) => (
  <motion.div
    variants={fadeInUp}
    custom={index * 0.1}
    whileHover="hover"
    initial="rest"
    className="group relative overflow-hidden rounded-sm border border-white/8 bg-white/4 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-red/40 hover:bg-white/7"
  >
    {/* Red corner accent on hover */}
    <div
      className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-red opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
      aria-hidden="true"
    />

    <div className="relative flex flex-col gap-6">
      {/* Icon container */}
      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 group-hover:border-brand-red/30 group-hover:bg-brand-red/10 group-hover:text-brand-red">
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-semibold text-white transition-colors duration-300 group-hover:text-white md:text-2xl">
        {title}
      </h3>

      {/* Divider — grows on hover */}
      <div className="h-px bg-white/10 transition-colors duration-300 group-hover:bg-brand-red/40" />

      {/* Description */}
      <p className="font-body text-sm leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
        {description}
      </p>
    </div>
  </motion.div>
);

export const SectorExpertise = () => {
  const { t } = useTranslation();

  const sectors = [
    {
      icon: Factory,
      title: t("sectors.card1.title"),
      description: t("sectors.card1.desc"),
    },
    {
      icon: HeartPulse,
      title: t("sectors.card2.title"),
      description: t("sectors.card2.desc"),
    },
    {
      icon: Building2,
      title: t("sectors.card3.title"),
      description: t("sectors.card3.desc"),
    },
    {
      icon: Gem,
      title: t("sectors.card4.title"),
      description: t("sectors.card4.desc"),
    },
  ];

  return (
    <section
      id="sectors"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#0a0a0a" }}
      aria-labelledby="sectors-heading"
    >
      <Container>
        <SectionHeading
          title={t("sectors.title")}
          subtitle={t("sectors.subtitle")}
          light
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {sectors.map((sector, index) => (
            <SectorCard key={sector.title} {...sector} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
