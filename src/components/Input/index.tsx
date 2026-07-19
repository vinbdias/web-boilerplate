import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { StyledInput, StyledSelect, StyledTextArea } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, ...rest },
  ref,
) {
  return <StyledInput ref={ref} $invalid={invalid} aria-invalid={invalid || undefined} {...rest} />;
});

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { invalid, ...rest },
  ref,
) {
  return (
    <StyledTextArea ref={ref} $invalid={invalid} aria-invalid={invalid || undefined} {...rest} />
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, children, ...rest },
  ref,
) {
  return (
    <StyledSelect ref={ref} $invalid={invalid} aria-invalid={invalid || undefined} {...rest}>
      {children}
    </StyledSelect>
  );
});
