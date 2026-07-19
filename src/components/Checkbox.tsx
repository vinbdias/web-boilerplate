import { forwardRef, type InputHTMLAttributes } from "react";
import "./Checkbox.css";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...rest },
  ref,
) {
  return (
    <label className={["ui-checkbox", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="checkbox" className="ui-checkbox__input" {...rest} />
      <span className="ui-checkbox__label">{label}</span>
    </label>
  );
});
