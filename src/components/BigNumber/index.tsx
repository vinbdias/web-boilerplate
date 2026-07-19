import type { ReactNode } from "react";
import { Hint, Label, Root, Value } from "./styles";

export interface BigNumberProps {
  value: ReactNode;
  label: string;
  hint?: string;
}

/** KPI display: a large value with a label, for dashboards. */
export function BigNumber({ value, label, hint }: BigNumberProps) {
  return (
    <Root>
      <Value>{value}</Value>
      <Label>{label}</Label>
      {hint && <Hint>{hint}</Hint>}
    </Root>
  );
}
