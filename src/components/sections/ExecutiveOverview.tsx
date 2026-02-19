import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
  VIEWPORT_CONFIG,
} from "@/lib/animations";

const LOCATION_DOT_SIZE = 10;

const LocationIndicator = ({
  city,
  role,
  isPrimary = false,
  delay = 0,
}: {
  city: string;
  role: string;
  isPrimary?: boolean;
  delay?: number;
}) => (
  <motion.div
    variants={fadeInUp}
    custom={delay}
    className="flex items-center gap-3"
  >
    <div className="relative flex-shrink-0">
      <div
        style={{ width: LOCATION_DOT_SIZE, height: LOCATION_DOT_SIZE }}
        className={`rounded-full ${isPrimary ? "bg-brand-red" : "bg-neutral-300"}`}
      />
      {isPrimary && (
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-brand-red"
        />
      )}
    </div>
    <div>
      <p
        className={`font-heading text-lg font-semibold ${isPrimary ? "text-neutral-950" : "text-neutral-700"}`}
      >
        {city}
      </p>
      <p className="font-body text-xs text-neutral-500">{role}</p>
    </div>
  </motion.div>
);

export const ExecutiveOverview = () => {
  const { t } = useTranslation();

  const keyPoints = [
    {
      label: t("overview.point1.label"),
      text: t("overview.point1.text"),
    },
    {
      label: t("overview.point2.label"),
      text: t("overview.point2.text"),
    },
    {
      label: t("overview.point3.label"),
      text: t("overview.point3.text"),
    },
  ];

  return (
    <section
      id="about"
      className="bg-white py-24 md:py-32"
      aria-labelledby="overview-heading"
    >
      <Container>
        <SectionHeading
          title={t("overview.title")}
          subtitle={t("overview.subtitle")}
          alignment="left"
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20">
          {/* Left: Text Content (60%) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-3 flex flex-col gap-10"
          >
            <motion.p
              variants={fadeInLeft}
              className="font-body text-base leading-relaxed text-neutral-600 md:text-lg"
            >
              {t("overview.intro")}
            </motion.p>

            <div className="flex flex-col gap-8">
              {keyPoints.map((point) => (
                <motion.div
                  key={point.label}
                  variants={fadeInLeft}
                  className="flex gap-5"
                >
                  <Divider orientation="vertical" className="h-auto self-stretch flex-shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading text-xl font-semibold text-neutral-950">
                      {point.label}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-neutral-600 md:text-base">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Location Indicators (40%) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <motion.div
              variants={fadeInRight}
              className="rounded-sm border border-neutral-100 bg-neutral-50 p-8 md:p-10"
            >
              {/* Map grid — abstract city nodes */}
              <div className="mb-8 h-40 relative overflow-hidden rounded-sm bg-white border border-neutral-100">
                {/* Subtle world map lines simulation */}
                <svg
                  viewBox="0 0 400 160"
                  className="absolute inset-0 h-full w-full opacity-10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M0 80 Q100 40 200 80 Q300 120 400 80" stroke="#333" strokeWidth="1" />
                  <path d="M0 50 Q100 70 200 50 Q300 30 400 50" stroke="#333" strokeWidth="0.5" />
                  <path d="M0 110 Q100 90 200 110 Q300 130 400 110" stroke="#333" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="0" y2="160" stroke="#333" strokeWidth="0.5" />
                  <line x1="80" y1="0" x2="80" y2="160" stroke="#333" strokeWidth="0.3" />
                  <line x1="160" y1="0" x2="160" y2="160" stroke="#333" strokeWidth="0.3" />
                  <line x1="240" y1="0" x2="240" y2="160" stroke="#333" strokeWidth="0.3" />
                  <line x1="320" y1="0" x2="320" y2="160" stroke="#333" strokeWidth="0.3" />
                  <line x1="400" y1="0" x2="400" y2="160" stroke="#333" strokeWidth="0.5" />
                </svg>

                {/* London dot — leftmost */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute"
                  style={{ left: "22%", top: "35%" }}
                >
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-brand-red" />
                    <motion.div
                      animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-brand-red"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                      <p className="font-body text-[10px] font-semibold text-neutral-700">
                        London
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Luxembourg dot — center */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="absolute"
                  style={{ left: "28%", top: "42%" }}
                >
                  <div className="h-2 w-2 rounded-full bg-neutral-400" />
                </motion.div>

                {/* UAE dot — rightmost */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute"
                  style={{ left: "68%", top: "50%" }}
                >
                  <div className="h-2 w-2 rounded-full bg-neutral-400" />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap">
                    <p className="font-body text-[10px] font-semibold text-neutral-700">
                      UAE
                    </p>
                  </div>
                </motion.div>

                {/* Connecting lines */}
                <svg
                  viewBox="0 0 400 160"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.line
                    x1="88" y1="58" x2="112" y2="70"
                    stroke="#CC0000"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                  <motion.line
                    x1="112" y1="70" x2="272" y2="82"
                    stroke="#CC0000"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  />
                </svg>
              </div>

              {/* City list */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                className="flex flex-col gap-5"
              >
                <LocationIndicator
                  city={t("overview.london")}
                  role={t("overview.london.role")}
                  isPrimary
                  delay={0}
                />
                <LocationIndicator
                  city={t("overview.luxembourg")}
                  role={t("overview.luxembourg.role")}
                  delay={0.1}
                />
                <LocationIndicator
                  city={t("overview.uae")}
                  role={t("overview.uae.role")}
                  delay={0.2}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
