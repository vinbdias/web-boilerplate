import { forwardRef, type InputHTMLAttributes } from "react";
import { NativeInput, Root, Thumb, Track } from "./styles";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Toggle switch backed by a native checkbox, so it works with form libraries
 * (react-hook-form register) and keyboards out of the box.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, ...rest },
  ref,
) {
  return (
    <Root className={className}>
      <NativeInput ref={ref} type="checkbox" role="switch" {...rest} />
      <Track aria-hidden="true">
        <Thumb />
      </Track>
      <span>{label}</span>
    </Root>
  );
});
