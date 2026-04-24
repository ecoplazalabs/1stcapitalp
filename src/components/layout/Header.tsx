import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { LogoFull } from "@/assets/logo/LogoFull";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isBlog = location.pathname.startsWith("/blog");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = Object.values(SECTION_IDS).filter(
    (id) => id !== "hero"
  ) as SectionId[];
  const activeSection = useActiveSection(isLanding ? sectionIds : []) ?? "";
  const { scrollY } = useScroll();

  // On non-landing routes, keep the solid background always so text remains legible
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    isLanding
      ? ["rgba(17,17,17,0)", "rgba(17,17,17,0.97)"]
      : ["rgba(17,17,17,0.97)", "rgba(17,17,17,0.97)"]
  );

  const headerBorderOpacity = useTransform(
    scrollY,
    [0, 80],
    isLanding ? [0, 0.15] : [0.15, 0.15]
  );

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => setScrolled(y > 50));
    return unsubscribe;
  }, [scrollY]);

  const handleNavClick = (id: string) => {
    if (isLanding) {
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
    setMobileOpen(false);
  };

  const handleCtaClick = () => {
    if (isLanding) {
      scrollToSection("contact");
    } else {
      navigate("/#contact");
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-shadow duration-300",
          scrolled || !isLanding ? "shadow-lg shadow-black/20" : ""
        )}
        aria-label="Main navigation"
      >
        <motion.div
          style={{
            borderBottomColor: `rgba(255,255,255,${headerBorderOpacity})`,
          }}
          className="border-b border-transparent"
        >
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
            {/* Logo */}
            {isLanding ? (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-sm"
                aria-label="1st Capital Partners - Go to top"
              >
                <LogoFull variant="light" />
              </button>
            ) : (
              <Link
                to="/"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-sm"
                aria-label="1st Capital Partners - Home"
              >
                <LogoFull variant="light" />
              </Link>
            )}

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Primary navigation"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "font-body text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm px-1 py-0.5",
                    isLanding && activeSection === item.id
                      ? "text-brand-red"
                      : "text-neutral-300 hover:text-white"
                  )}
                >
                  {t(item.label)}
                </button>
              ))}
              <Link
                to="/blog"
                className={cn(
                  "font-body text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm px-1 py-0.5",
                  isBlog
                    ? "text-brand-red"
                    : "text-neutral-300 hover:text-white"
                )}
              >
                {t("nav.blog")}
              </Link>
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden items-center gap-6 lg:flex">
              <LanguageToggle light />
              <Button variant="primary" size="sm" onClick={handleCtaClick}>
                {t("nav.cta")}
              </Button>
            </div>

            {/* Mobile: Lang + Hamburger */}
            <div className="flex items-center gap-4 lg:hidden">
              <LanguageToggle light />
              <button
                onClick={() => setMobileOpen(true)}
                aria-label={t("accessibility.menu.open")}
                className="p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavClick={handleNavClick}
        onCtaClick={handleCtaClick}
        activeSection={activeSection}
        isBlog={isBlog}
      />
    </>
  );
};
