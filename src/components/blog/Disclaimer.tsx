import { useTranslation } from "react-i18next";
import { ShieldAlert } from "lucide-react";

export const Disclaimer = () => {
  const { t } = useTranslation();

  return (
    <aside
      role="note"
      aria-label={t("blog.disclaimer.ariaLabel")}
      className="mt-16 flex gap-4 rounded-sm border border-neutral-200 bg-neutral-50 p-5"
    >
      <ShieldAlert
        size={18}
        className="mt-0.5 flex-shrink-0 text-neutral-500"
        aria-hidden="true"
      />
      <p className="font-body text-xs leading-relaxed text-neutral-600">
        <span className="font-semibold text-neutral-700">
          {t("blog.disclaimer.title")}
        </span>{" "}
        {t("blog.disclaimer.body")}
      </p>
    </aside>
  );
};
