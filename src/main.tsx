import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fonts — must be imported before app styles
import "@fontsource-variable/inter/index.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";

// i18n — must be initialized before any component renders
import "@/i18n/index";

// Global styles
import "@/styles/globals.css";

import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found in DOM.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
