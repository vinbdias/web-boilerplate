import type { ReactNode } from "react";
import { Root, Title } from "./styles";

export interface AlertProps {
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: ReactNode;
}

export function Alert({ tone = "info", title, children }: AlertProps) {
  return (
    <Root $tone={tone} role={tone === "danger" ? "alert" : "status"}>
      {title && <Title>{title}</Title>}
      <div>{children}</div>
    </Root>
  );
}
