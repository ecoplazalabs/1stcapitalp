import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  light?: boolean;
  className?: string;
}

export const LanguageToggle = ({ light = false, className }: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.startsWith("es") ? "es" : "en";

  const toggle = () => {
    const next = currentLang === "en" ? "es" : "en";
    void i18n.changeLanguage(next);
    document.documentElement.lang = next;
  };

  return (
    <button
      onClick={toggle}
      aria-label={t("accessibility.lang.switch")}
      className={cn(
        "flex items-center gap-1 font-body text-xs font-semibold tracking-widest",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2",
        light
          ? "text-neutral-300 hover:text-white"
          : "text-neutral-500 hover:text-neutral-950",
        className
      )}
    >
      <span
        className={cn(
          currentLang === "en" ? "text-brand-red" : ""
        )}
      >
        EN
      </span>
      <span className={light ? "text-neutral-500" : "text-neutral-300"}>|</span>
      <span
        className={cn(
          currentLang === "es" ? "text-brand-red" : ""
        )}
      >
        ES
      </span>
    </button>
  );
};
