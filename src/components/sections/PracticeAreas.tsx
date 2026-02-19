import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Lightbulb, BarChart3, ArrowLeftRight, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

interface PracticeCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  index: number;
}

const PracticeCard = ({
  icon: Icon,
  title,
  description,
  index,
}: PracticeCardProps) => (
  <motion.div
    variants={fadeInUp}
    custom={index * 0.1}
    className="group relative overflow-hidden rounded-sm bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:p-10"
  >
    {/* Red left border accent */}
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-red origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100" />

    <div className="flex flex-col gap-6">
      {/* Number + Icon row */}
      <div className="flex items-center justify-between">
        <div className="flex h-13 w-13 items-center justify-center rounded-sm bg-brand-red/8 text-brand-red transition-all duration-300 group-hover:bg-brand-red group-hover:text-white">
          <Icon size={24} />
        </div>
        <span className="font-heading text-5xl font-bold text-neutral-100 transition-colors duration-300 group-hover:text-brand-red/10 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-2xl font-semibold text-neutral-950 transition-colors duration-200 md:text-3xl">
        {title}
      </h3>

      {/* Divider */}
      <div className="h-px bg-neutral-100 transition-colors duration-300 group-hover:bg-brand-red/20" />

      {/* Description */}
      <p className="font-body text-sm leading-relaxed text-neutral-500 md:text-base">
        {description}
      </p>
    </div>
  </motion.div>
);

export const PracticeAreas = () => {
  const { t } = useTranslation();

  const practices = [
    {
      icon: Lightbulb,
      title: t("services.card1.title"),
      description: t("services.card1.desc"),
    },
    {
      icon: BarChart3,
      title: t("services.card2.title"),
      description: t("services.card2.desc"),
    },
    {
      icon: ArrowLeftRight,
      title: t("services.card3.title"),
      description: t("services.card3.desc"),
    },
    {
      icon: Wallet,
      title: t("services.card4.title"),
      description: t("services.card4.desc"),
    },
  ];

  return (
    <section
      id="services"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#F5F5F5" }}
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionHeading
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {practices.map((practice, index) => (
            <PracticeCard
              key={practice.title}
              {...practice}
              index={index}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
