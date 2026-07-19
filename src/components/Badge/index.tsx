import type { ReactNode } from "react";
import { Root } from "./styles";

export interface BadgeProps {
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  children: ReactNode;
}

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return <Root $tone={tone}>{children}</Root>;
}
