import { useTranslation } from "react-i18next";
import { LogoFull } from "@/assets/logo/LogoFull";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, COMPANY } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-black text-neutral-400"
      aria-label="Footer"
    >
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <LogoFull variant="light" />
            <p className="font-body text-sm leading-relaxed text-neutral-500">
              {t("footer.tagline")}
            </p>
            <p className="font-body text-xs text-neutral-600">
              {t("footer.locations")}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
              {t("footer.nav.title")}
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-fit font-body text-sm text-neutral-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm px-0.5"
                >
                  {t(item.label)}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
              {t("contact.ceo.title")}
            </h3>
            <div className="flex flex-col gap-2">
              <p className="font-body text-sm font-medium text-neutral-300">
                {COMPANY.CEO}
              </p>
              <p className="font-body text-xs text-neutral-500">
                {COMPANY.ADDRESS_LINE1}
                <br />
                {COMPANY.ADDRESS_LINE2}
              </p>
              <a
                href={`mailto:${COMPANY.EMAIL}`}
                className="font-body text-xs text-neutral-400 transition-colors hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
              >
                {COMPANY.EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-xl font-body text-xs leading-relaxed text-neutral-600">
            {t("footer.disclaimer")}
          </p>
          <p className="flex-shrink-0 font-body text-xs text-neutral-600">
            {t("footer.copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
};
