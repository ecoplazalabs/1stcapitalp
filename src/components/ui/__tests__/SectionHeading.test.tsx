import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "../SectionHeading";

vi.mock("framer-motion", async () => {
  const { createFramerMotionMock } = await import("@/test/framer-mock");
  return createFramerMotionMock();
});

describe("SectionHeading", () => {
  it("renders the title text in an h2", () => {
    render(<SectionHeading title="Executive Overview" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Executive Overview" });
    expect(heading).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Our Strategy" subtitle="Boutique Merchant Finance" />);
    expect(screen.getByText("Boutique Merchant Finance")).toBeInTheDocument();
  });

  it("does not render subtitle element when subtitle is omitted", () => {
    render(<SectionHeading title="Title Only" />);
    // The subtitle <p> should not appear at all
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it("passes id prop to the h2 element", () => {
    render(<SectionHeading id="contact-heading" title="Contact" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Contact" });
    expect(heading).toHaveAttribute("id", "contact-heading");
  });

  it("applies light variant text colour to h2", () => {
    render(<SectionHeading title="Light Heading" light />);
    const heading = screen.getByRole("heading", { level: 2, name: "Light Heading" });
    expect(heading).toHaveClass("text-white");
  });

  it("applies dark (default) text colour to h2 when light is false", () => {
    render(<SectionHeading title="Dark Heading" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Dark Heading" });
    expect(heading).toHaveClass("text-neutral-950");
  });

  it("applies light subtitle colour when light prop is set", () => {
    render(<SectionHeading title="Title" subtitle="Sub" light />);
    const subtitle = screen.getByText("Sub");
    expect(subtitle).toHaveClass("text-brand-red/80");
  });

  it("applies centre alignment class by default", () => {
    const { container } = render(<SectionHeading title="Centred" />);
    // The wrapping motion.div receives text-center
    expect(container.firstChild).toHaveClass("text-center");
  });

  it("applies left alignment class when alignment is left", () => {
    const { container } = render(<SectionHeading title="Left" alignment="left" />);
    expect(container.firstChild).toHaveClass("text-left");
  });
});
