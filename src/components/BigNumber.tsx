import type { ReactNode } from "react";
import "./BigNumber.css";

export interface BigNumberProps {
  value: ReactNode;
  label: string;
  hint?: string;
}

/** KPI display: a large value with a label, for dashboards. */
export function BigNumber({ value, label, hint }: BigNumberProps) {
  return (
    <div className="ui-big-number">
      <span className="ui-big-number__value">{value}</span>
      <span className="ui-big-number__label">{label}</span>
      {hint && <span className="ui-big-number__hint">{hint}</span>}
    </div>
  );
}
