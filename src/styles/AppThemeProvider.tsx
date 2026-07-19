import type { ReactNode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme";

/**
 * Bridges the styled-components theme to CSS variables, so the plain-CSS
 * component kit and any styled-components consume the same values. Retheming
 * the app = editing src/styles/{colors,fonts,theme}.ts only.
 */
const GlobalTokens = createGlobalStyle`
  :root {
    --color-bg: ${({ theme }) => theme.colors.bg};
    --color-surface: ${({ theme }) => theme.colors.surface};
    --color-surface-hover: ${({ theme }) => theme.colors.surfaceHover};
    --color-border: ${({ theme }) => theme.colors.border};
    --color-border-strong: ${({ theme }) => theme.colors.borderStrong};

    --color-text: ${({ theme }) => theme.colors.text};
    --color-text-secondary: ${({ theme }) => theme.colors.textSecondary};
    --color-text-muted: ${({ theme }) => theme.colors.textMuted};
    --color-text-inverse: ${({ theme }) => theme.colors.textInverse};

    --color-accent: ${({ theme }) => theme.colors.accent};
    --color-accent-hover: ${({ theme }) => theme.colors.accentHover};
    --color-accent-subtle: ${({ theme }) => theme.colors.accentSubtle};

    --color-danger: ${({ theme }) => theme.colors.danger};
    --color-danger-subtle: ${({ theme }) => theme.colors.dangerSubtle};
    --color-success: ${({ theme }) => theme.colors.success};
    --color-success-subtle: ${({ theme }) => theme.colors.successSubtle};
    --color-warning: ${({ theme }) => theme.colors.warning};
    --color-warning-subtle: ${({ theme }) => theme.colors.warningSubtle};
    --color-info: ${({ theme }) => theme.colors.info};
    --color-info-subtle: ${({ theme }) => theme.colors.infoSubtle};

    --font-sans: ${({ theme }) => theme.font.family.base};
    --font-mono: ${({ theme }) => theme.font.family.mono};
    --text-xs: ${({ theme }) => theme.font.size.xs};
    --text-sm: ${({ theme }) => theme.font.size.sm};
    --text-base: ${({ theme }) => theme.font.size.base};
    --text-lg: ${({ theme }) => theme.font.size.lg};
    --text-xl: ${({ theme }) => theme.font.size.xl};
    --text-2xl: ${({ theme }) => theme.font.size["2xl"]};

    --space-1: ${({ theme }) => theme.space[1]};
    --space-2: ${({ theme }) => theme.space[2]};
    --space-3: ${({ theme }) => theme.space[3]};
    --space-4: ${({ theme }) => theme.space[4]};
    --space-5: ${({ theme }) => theme.space[5]};
    --space-6: ${({ theme }) => theme.space[6]};
    --space-8: ${({ theme }) => theme.space[8]};

    --radius-sm: ${({ theme }) => theme.radius.sm};
    --radius-md: ${({ theme }) => theme.radius.md};
    --radius-lg: ${({ theme }) => theme.radius.lg};

    --shadow-sm: ${({ theme }) => theme.shadow.sm};
    --shadow-md: ${({ theme }) => theme.shadow.md};
    --shadow-lg: ${({ theme }) => theme.shadow.lg};

    --transition-fast: ${({ theme }) => theme.transition.fast};
    --focus-ring: ${({ theme }) => theme.focusRing};
  }
`;

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalTokens />
      {children}
    </ThemeProvider>
  );
}
