import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, type RenderOptions } from "@testing-library/react";

export const renderWithRouter = (
  ui: ReactElement,
  {
    route = "/",
    ...options
  }: { route?: string } & Omit<RenderOptions, "wrapper"> = {}
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
    ...options,
  });
