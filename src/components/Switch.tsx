import { forwardRef, type InputHTMLAttributes } from "react";
import "./Switch.css";

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
    <label className={["ui-switch", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="checkbox" role="switch" className="ui-switch__input" {...rest} />
      <span className="ui-switch__track" aria-hidden="true">
        <span className="ui-switch__thumb" />
      </span>
      <span className="ui-switch__label">{label}</span>
    </label>
  );
});
