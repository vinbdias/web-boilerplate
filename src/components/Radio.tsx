import { forwardRef, type InputHTMLAttributes } from "react";
import "./Radio.css";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, ...rest },
  ref,
) {
  return (
    <label className={["ui-radio", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="radio" className="ui-radio__input" {...rest} />
      <span className="ui-radio__label">{label}</span>
    </label>
  );
});

export interface RadioGroupProps {
  label: string;
  children: React.ReactNode;
}

/** Groups radios with an accessible fieldset/legend. */
export function RadioGroup({ label, children }: RadioGroupProps) {
  return (
    <fieldset className="ui-radio-group">
      <legend className="ui-radio-group__legend">{label}</legend>
      <div className="ui-radio-group__options">{children}</div>
    </fieldset>
  );
}
