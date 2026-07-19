import { Circle, Label, SrOnly, Wrapper } from "./styles";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function Spinner({ size = "md", label }: SpinnerProps) {
  return (
    <Wrapper role="status" aria-live="polite">
      <Circle $size={size} aria-hidden="true" />
      {label ? <Label>{label}</Label> : <SrOnly>Loading</SrOnly>}
    </Wrapper>
  );
}
