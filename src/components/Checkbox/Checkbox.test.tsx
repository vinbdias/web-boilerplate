import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/test/renderWithTheme";
import { Checkbox } from "./index";
import { Switch } from "../Switch";

describe("Checkbox", () => {
  it("toggles via its label", async () => {
    renderWithTheme(<Checkbox label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).not.toBeChecked();

    await userEvent.click(screen.getByText("Accept terms"));
    expect(checkbox).toBeChecked();
  });
});

describe("Switch", () => {
  it("exposes role switch and toggles", async () => {
    renderWithTheme(<Switch label="Notifications" />);

    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
