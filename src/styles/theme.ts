// Application theme: single source of truth for every visual value.
// Consumed two ways:
//   1. styled-components ThemeProvider → `${({ theme }) => theme.colors.accent}`
//   2. GlobalTokens exposes everything as CSS variables (--color-*, --space-*)
//      so plain-CSS components share the exact same values.
import breakpoints from "./breakpoints";
import colors from "./colors";
import fonts from "./fonts";

const theme = {
  colors,
  font: fonts,
  breakpoints,
  space: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.5rem",
    6: "2rem",
    8: "3rem",
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
  },
  shadow: {
    sm: "0 1px 2px rgb(0 0 0 / 0.05)",
    md: "0 4px 12px rgb(0 0 0 / 0.08)",
    lg: "0 12px 32px rgb(0 0 0 / 0.14)",
  },
  transition: {
    fast: "120ms ease",
  },
  focusRing: "0 0 0 3px rgb(24 24 27 / 0.25)",
} as const;

export type AppTheme = typeof theme;

export default theme;
