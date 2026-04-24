import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "nav.about", href: "#about", id: "about" },
  { label: "nav.strategy", href: "#strategy", id: "strategy" },
  { label: "nav.sectors", href: "#sectors", id: "sectors" },
  { label: "nav.value", href: "#value", id: "value" },
  { label: "nav.services", href: "#services", id: "services" },
  { label: "nav.contact", href: "#contact", id: "contact" },
];

export const SECTION_IDS = {
  HERO: "hero",
  ABOUT: "about",
  STRATEGY: "strategy",
  SECTORS: "sectors",
  VALUE: "value",
  SERVICES: "services",
  CONTACT: "contact",
} as const;

export const COMPANY = {
  NAME: "1st Capital Partners",
  LEGAL_NAME: "1st Capital Partners",
  TAGLINE: "Boutique Merchant Finance",
  CEO: "Cesar A. Forero J.",
  CEO_TITLE: "CEO, 1st Capital Partners",
  EMAIL: "Cesar.forero@1stcapitalp.com",
  PHONE: "+971 50 721 8491",
  ADDRESS_LINE1: "27 Old Gloucester Street",
  ADDRESS_LINE2: "London WC1N 3AX",
  ADDRESS_COUNTRY: "United Kingdom",
  WEBSITE: "https://1stcapitalp.com",
  LOCATIONS: ["London", "Luxembourg", "UAE"],
  COMMITTED_CAPITAL: 1500,
  GLOBAL_OFFICES: 3,
  PRACTICE_AREAS: 4,
  SECTORS: 4,
} as const;
