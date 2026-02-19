export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface CounterItem {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}

export type SectionId =
  | "hero"
  | "about"
  | "strategy"
  | "sectors"
  | "value"
  | "services"
  | "contact";
