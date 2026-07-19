import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Spinner } from "../Spinner";
import { StyledButton } from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading = false, disabled, children, ...rest },
  ref,
) {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </StyledButton>
  );
});
