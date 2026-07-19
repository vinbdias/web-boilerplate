import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";
import { Input } from "./Input";

describe("FormField", () => {
  it("associates the label with the control", () => {
    render(
      <FormField label="Email">{(fieldProps) => <Input {...fieldProps} />}</FormField>,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("exposes the error via role=alert and aria-describedby", () => {
    render(
      <FormField label="Email" error="Required field">
        {(fieldProps) => <Input {...fieldProps} />}
      </FormField>,
    );

    const input = screen.getByLabelText("Email");
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("Required field");
    expect(input).toHaveAttribute("aria-describedby", alert.id);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
