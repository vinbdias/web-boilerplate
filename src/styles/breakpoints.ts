// Usage with styled-components:
//   @media ${({ theme }) => theme.breakpoints.up.md} { ... }
const sizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

const breakpoints = {
  sizes,
  up: {
    sm: `(min-width: ${sizes.sm}px)`,
    md: `(min-width: ${sizes.md}px)`,
    lg: `(min-width: ${sizes.lg}px)`,
    xl: `(min-width: ${sizes.xl}px)`,
  },
  down: {
    sm: `(max-width: ${sizes.sm - 1}px)`,
    md: `(max-width: ${sizes.md - 1}px)`,
    lg: `(max-width: ${sizes.lg - 1}px)`,
    xl: `(max-width: ${sizes.xl - 1}px)`,
  },
} as const;

export default breakpoints;
