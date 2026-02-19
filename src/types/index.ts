import type { ComponentType } from "react";

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
}

export interface CounterItem {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}

export interface SectorCard {
  icon: ComponentType<{ size?: number; className?: string }>;
  titleKey: string;
  descriptionKey: string;
}

export interface PillarCard {
  icon: ComponentType<{ size?: number; className?: string }>;
  titleKey: string;
  descriptionKey: string;
}

export interface PracticeCard {
  icon: ComponentType<{ size?: number; className?: string }>;
  titleKey: string;
  descriptionKey: string;
}

export interface ContactInfo {
  icon: ComponentType<{ size?: number; className?: string }>;
  labelKey: string;
  value: string;
  href?: string;
}

export interface InvestmentStat {
  labelKey: string;
  valueKey: string;
  descriptionKey: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export type Language = "en" | "es";

export type SectionId =
  | "hero"
  | "about"
  | "strategy"
  | "sectors"
  | "value"
  | "services"
  | "contact";
