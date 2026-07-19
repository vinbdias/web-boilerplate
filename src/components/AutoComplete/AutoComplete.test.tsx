import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@/test/renderWithTheme";
import { AutoComplete } from "./index";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("AutoComplete", () => {
  it("filters options as the user types and selects with click", async () => {
    const onChange = vi.fn();
    renderWithTheme(<AutoComplete options={options} value={null} onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "ban");

    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Apple" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("option", { name: "Banana" }));
    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("supports keyboard navigation with Enter", async () => {
    const onChange = vi.fn();
    renderWithTheme(<AutoComplete options={options} value={null} onChange={onChange} />);

    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith("banana");
  });
});
