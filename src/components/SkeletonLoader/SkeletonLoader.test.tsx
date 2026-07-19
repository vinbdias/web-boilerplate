import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { SkeletonLoader } from "./index";

describe("SkeletonLoader", () => {
  it("is hidden from assistive technologies", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SkeletonLoader />
      </ThemeProvider>,
    );

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
