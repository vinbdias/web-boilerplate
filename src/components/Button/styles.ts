import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const sizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
    font-size: ${({ theme }) => theme.font.size.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
    font-size: ${({ theme }) => theme.font.size.sm};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[5]}`};
    font-size: ${({ theme }) => theme.font.size.base};
  `,
};

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textInverse};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accentHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceHover};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.textInverse};
    &:hover:not(:disabled) {
      filter: brightness(0.92);
    }
  `,
};

export const StyledButton = styled.button<{ $variant: Variant; $size: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  white-space: nowrap;
  transition:
    background ${({ theme }) => theme.transition.fast},
    border-color ${({ theme }) => theme.transition.fast};

  ${({ $size }) => sizes[$size]}
  ${({ $variant }) => variants[$variant]}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
