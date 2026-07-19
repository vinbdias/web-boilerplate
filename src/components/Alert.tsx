import type { ReactNode } from "react";
import "./Alert.css";

export interface AlertProps {
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: ReactNode;
}

export function Alert({ tone = "info", title, children }: AlertProps) {
  return (
    <div className={`ui-alert ui-alert--${tone}`} role={tone === "danger" ? "alert" : "status"}>
      {title && <p className="ui-alert__title">{title}</p>}
      <div className="ui-alert__body">{children}</div>
    </div>
  );
}
