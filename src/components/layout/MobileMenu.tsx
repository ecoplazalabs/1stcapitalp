import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { LogoFull } from "@/assets/logo/LogoFull";
import { Button } from "@/components/ui/Button";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (id: string) => void;
  onCtaClick: () => void;
  activeSection: string;
  isBlog?: boolean;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  onNavClick,
  onCtaClick,
  activeSection,
  isBlog = false,
}: MobileMenuProps) => {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap: focus the close button when menu opens
  useEffect(() => {
    if (!isOpen) return;
    const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-full flex-col bg-neutral-950"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <LogoFull variant="light" />
              <button
                onClick={onClose}
                aria-label={t("accessibility.menu.close")}
                className="p-2 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
              >
                <X size={22} />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col gap-1 px-4 py-8"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                  onClick={() => onNavClick(item.id)}
                  className={cn(
                    "w-full rounded-sm px-4 py-3 text-left font-body text-sm font-medium uppercase tracking-[0.12em]",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red",
                    activeSection === item.id
                      ? "text-brand-red bg-brand-red/5"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {t(item.label)}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: NAV_ITEMS.length * 0.05 + 0.1,
                  duration: 0.3,
                }}
              >
                <Link
                  to="/blog"
                  onClick={onClose}
                  className={cn(
                    "block w-full rounded-sm px-4 py-3 text-left font-body text-sm font-medium uppercase tracking-[0.12em]",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red",
                    isBlog
                      ? "text-brand-red bg-brand-red/5"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {t("nav.blog")}
                </Link>
              </motion.div>
            </nav>

            <div className="border-t border-white/10 px-6 py-6">
              <Button
                variant="primary"
                size="md"
                onClick={onCtaClick}
                className="w-full"
              >
                {t("nav.cta")}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
