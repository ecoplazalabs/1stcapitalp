import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]): string => clsx(inputs);

export const scrollToSection = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const formatPhoneHref = (phone: string): string => {
  return `tel:${phone.replace(/\s/g, "")}`;
};

export const formatEmailHref = (email: string): string => {
  return `mailto:${email}`;
};

export const clampNumber = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
