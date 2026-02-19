import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "../Contact";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: vi.fn() },
  }),
}));

vi.mock("framer-motion", async () => {
  const { createFramerMotionMock } = await import("@/test/framer-mock");
  return createFramerMotionMock();
});

describe("Contact", () => {
  it("renders the contact section with id contact", () => {
    render(<Contact />);
    expect(document.getElementById("contact")).toBeInTheDocument();
  });

  it("renders the full name input with associated label", () => {
    render(<Contact />);
    const label = screen.getByText("contact.form.name");
    expect(label).toBeInTheDocument();
    const input = document.getElementById("contact-name");
    expect(input).toBeInTheDocument();
    expect(input?.tagName).toBe("INPUT");
  });

  it("renders the email input with associated label", () => {
    render(<Contact />);
    expect(screen.getByText("contact.form.email")).toBeInTheDocument();
    expect(document.getElementById("contact-email")).toBeInTheDocument();
  });

  it("renders the company input with associated label", () => {
    render(<Contact />);
    expect(screen.getByText("contact.form.company")).toBeInTheDocument();
    expect(document.getElementById("contact-company")).toBeInTheDocument();
  });

  it("renders the message textarea with associated label", () => {
    render(<Contact />);
    expect(screen.getByText("contact.form.message")).toBeInTheDocument();
    expect(document.getElementById("contact-message")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<Contact />);
    expect(screen.getByRole("button", { name: /contact\.form\.submit/i })).toBeInTheDocument();
  });

  it("shows success message after form submission", async () => {
    render(<Contact />);

    fireEvent.change(document.getElementById("contact-name")!, { target: { value: "Jane Doe" } });
    fireEvent.change(document.getElementById("contact-email")!, { target: { value: "jane@example.com" } });
    fireEvent.change(document.getElementById("contact-message")!, { target: { value: "Hello there" } });

    await userEvent.click(screen.getByRole("button", { name: /contact\.form\.submit/i }));

    await waitFor(() => {
      expect(screen.getByText("contact.form.success")).toBeInTheDocument();
    });
  });

  it("resets form fields after submission", async () => {
    render(<Contact />);

    fireEvent.change(document.getElementById("contact-name")!, { target: { value: "Jane Doe" } });
    fireEvent.change(document.getElementById("contact-email")!, { target: { value: "jane@test.com" } });
    fireEvent.change(document.getElementById("contact-message")!, { target: { value: "Test" } });

    await userEvent.click(screen.getByRole("button", { name: /contact\.form\.submit/i }));

    await waitFor(() => {
      expect(screen.queryByDisplayValue("Jane Doe")).not.toBeInTheDocument();
    });
  });

  it("updates input value as the user types", () => {
    render(<Contact />);
    const emailInput = document.getElementById("contact-email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    expect(emailInput.value).toBe("test@test.com");
  });
});
