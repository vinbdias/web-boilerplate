// Neutral palette. Swap these values (or the whole object) to adopt a brand.
const colors = {
  bg: "#fafafa",
  surface: "#ffffff",
  surfaceHover: "#f4f4f5",
  border: "#e4e4e7",
  borderStrong: "#d4d4d8",

  text: "#18181b",
  textSecondary: "#52525b",
  textMuted: "#a1a1aa",
  textInverse: "#fafafa",

  // Single accent; replace with the brand primary when retheming.
  accent: "#18181b",
  accentHover: "#3f3f46",
  accentSubtle: "#f4f4f5",

  danger: "#dc2626",
  dangerSubtle: "#fef2f2",
  success: "#16a34a",
  successSubtle: "#f0fdf4",
  warning: "#d97706",
  warningSubtle: "#fffbeb",
  info: "#2563eb",
  infoSubtle: "#eff6ff",
} as const;

export default colors;
