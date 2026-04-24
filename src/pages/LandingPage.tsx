import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

import { Hero } from "@/components/sections/Hero";
import { ExecutiveOverview } from "@/components/sections/ExecutiveOverview";
import { InvestmentProfile } from "@/components/sections/InvestmentProfile";
import { SectorExpertise } from "@/components/sections/SectorExpertise";
import { ValueCreation } from "@/components/sections/ValueCreation";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Contact } from "@/components/sections/Contact";

export const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const { hash } = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith("es") ? "es" : "en";
  }, [i18n.language]);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [hash]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brand-red focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t("accessibility.skip")}
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <ExecutiveOverview />
        <InvestmentProfile />
        <SectorExpertise />
        <ValueCreation />
        <PracticeAreas />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};
