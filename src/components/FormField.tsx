import { useId, type ReactNode } from "react";
import "./FormField.css";

export interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: { id: string; "aria-describedby"?: string; invalid: boolean }) => ReactNode;
}

/**
 * Accessible field wrapper: wires label, hint and error to the control via
 * render prop, so any input component can be used inside.
 */
export function FormField({ label, error, hint, required, children }: FormFieldProps) {
  const id = useId();
  const descriptionId = error || hint ? `${id}-description` : undefined;

  return (
    <div className="ui-form-field">
      <label className="ui-form-field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="ui-form-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({ id, "aria-describedby": descriptionId, invalid: Boolean(error) })}
      {error ? (
        <p className="ui-form-field__error" id={descriptionId} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="ui-form-field__hint" id={descriptionId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
