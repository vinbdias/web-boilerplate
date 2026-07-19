import { useId, type ReactNode } from "react";
import { ErrorText, Field, Hint, Label, Required } from "./styles";

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
    <Field>
      <Label htmlFor={id}>
        {label}
        {required && <Required aria-hidden="true">*</Required>}
      </Label>
      {children({ id, "aria-describedby": descriptionId, invalid: Boolean(error) })}
      {error ? (
        <ErrorText id={descriptionId} role="alert">
          {error}
        </ErrorText>
      ) : hint ? (
        <Hint id={descriptionId}>{hint}</Hint>
      ) : null}
    </Field>
  );
}
