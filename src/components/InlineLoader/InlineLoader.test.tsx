import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@/test/renderWithTheme";
import { InlineLoader } from "./index";

describe("InlineLoader", () => {
  it("announces its loading state", () => {
    renderWithTheme(<InlineLoader label="Updating total" />);

    expect(screen.getByRole("status", { name: "Updating total" })).toBeInTheDocument();
  });
});
