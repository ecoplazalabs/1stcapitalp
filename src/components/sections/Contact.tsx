import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
  VIEWPORT_CONFIG,
} from "@/lib/animations";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

interface ContactInfoItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}

const ContactInfoItem = ({
  icon: Icon,
  label,
  value,
  href,
}: ContactInfoItemProps) => (
  <div className="flex gap-4">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-brand-red/10 text-brand-red">
      <Icon size={18} />
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="font-body text-xs font-medium uppercase tracking-[0.1em] text-neutral-500">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="font-body text-sm text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
        >
          {value}
        </a>
      ) : (
        <p className="font-body text-sm text-neutral-300 leading-relaxed">
          {value}
        </p>
      )}
    </div>
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-body text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
      {label}
    </label>
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-white/10 bg-white/5 px-4",
        "font-body text-sm text-white placeholder:text-neutral-600",
        "transition-colors duration-200",
        "hover:border-white/20 focus:border-brand-red/50 focus:bg-white/8 focus:outline-none",
        className
      )}
      {...props}
    />
  </div>
);

export const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactItems: ContactInfoItemProps[] = [
    {
      icon: MapPin,
      label: t("contact.address.label"),
      value: `${COMPANY.ADDRESS_LINE1}, ${COMPANY.ADDRESS_LINE2}`,
    },
    {
      icon: Mail,
      label: t("contact.email.label"),
      value: COMPANY.EMAIL,
      href: `mailto:${COMPANY.EMAIL}`,
    },
    {
      icon: Phone,
      label: t("contact.phone.label"),
      value: COMPANY.PHONE,
      href: `tel:${COMPANY.PHONE.replace(/\s/g, "")}`,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#111111" }}
      aria-labelledby="contact-heading"
    >
      {/* Red gradient accent */}
      <div
        className="absolute right-0 top-0 h-[500px] w-[500px] opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, #CC0000 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          light
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          {/* Left: Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-2 flex flex-col gap-10"
          >
            {/* CEO intro */}
            <motion.div variants={fadeInLeft} className="flex flex-col gap-2">
              <p className="font-heading text-2xl font-semibold text-white md:text-3xl">
                {t("contact.ceo")}
              </p>
              <p className="font-body text-sm text-brand-red uppercase tracking-[0.12em]">
                {t("contact.ceo.title")}
              </p>
            </motion.div>

            <motion.p variants={fadeInLeft} className="font-body text-sm leading-relaxed text-neutral-400 md:text-base">
              {t("contact.intro")}
            </motion.p>

            {/* Contact items */}
            <motion.div variants={staggerContainer} className="flex flex-col gap-6">
              {contactItems.map((item) => (
                <motion.div key={item.label} variants={fadeInLeft}>
                  <ContactInfoItem {...item} />
                </motion.div>
              ))}
            </motion.div>

            {/* Locations row */}
            <motion.div variants={fadeInLeft} className="flex flex-wrap gap-3">
              {COMPANY.LOCATIONS.map((location) => (
                <span
                  key={location}
                  className="rounded-sm border border-white/10 px-3 py-1.5 font-body text-xs font-medium text-neutral-500"
                >
                  {location}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-3"
          >
            <div className="rounded-sm border border-white/8 bg-white/3 p-8 md:p-10">
              {submitted ? (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <CheckCircle size={32} />
                  </div>
                  <p className="font-heading text-2xl font-semibold text-white">
                    {t("contact.form.success")}
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input
                      label={t("contact.form.name")}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.name.placeholder")}
                      required
                      autoComplete="name"
                    />
                    <Input
                      label={t("contact.form.email")}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.email.placeholder")}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <Input
                    label={t("contact.form.company")}
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder={t("contact.form.company.placeholder")}
                    autoComplete="organization"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.message.placeholder")}
                      rows={5}
                      required
                      className="w-full resize-none rounded-sm border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-neutral-600 transition-colors duration-200 hover:border-white/20 focus:border-brand-red/50 focus:bg-white/8 focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto sm:self-end gap-2"
                  >
                    <Send size={16} />
                    {t("contact.form.submit")}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
