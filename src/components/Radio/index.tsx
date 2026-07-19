import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { Group, Legend, NativeInput, Options, Root } from "./styles";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, ...rest },
  ref,
) {
  return (
    <Root className={className}>
      <NativeInput ref={ref} type="radio" {...rest} />
      <span>{label}</span>
    </Root>
  );
});

export interface RadioGroupProps {
  label: string;
  children: ReactNode;
}

/** Groups radios with an accessible fieldset/legend. */
export function RadioGroup({ label, children }: RadioGroupProps) {
  return (
    <Group>
      <Legend>{label}</Legend>
      <Options>{children}</Options>
    </Group>
  );
}
