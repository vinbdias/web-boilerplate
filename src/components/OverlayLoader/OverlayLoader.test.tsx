import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@/test/renderWithTheme";
import { OverlayLoader } from "./index";

describe("OverlayLoader", () => {
  it("renders nothing while idle", () => {
    renderWithTheme(<OverlayLoader />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("blocks and announces while loading", () => {
    renderWithTheme(<OverlayLoader loading text="Saving changes…" />);

    const loader = screen.getByRole("status", { name: "Saving changes…" });
    expect(loader).toHaveAttribute("aria-busy", "true");
  });

  it("portals a full-screen loader to the document body", () => {
    renderWithTheme(<OverlayLoader loading fullScreen text="Loading application…" />);

    expect(
      screen.getByRole("status", { name: "Loading application…" }).parentElement,
    ).toBe(document.body);
  });
});
