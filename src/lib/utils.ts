import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]): string => clsx(inputs);

export const scrollToSection = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
