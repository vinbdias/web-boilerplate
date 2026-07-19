import { forwardRef, type InputHTMLAttributes } from "react";
import { NativeInput, Root } from "./styles";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...rest },
  ref,
) {
  return (
    <Root className={className}>
      <NativeInput ref={ref} type="checkbox" {...rest} />
      <span>{label}</span>
    </Root>
  );
});
