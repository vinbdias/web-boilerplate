import styled, { css } from "styled-components";

const base = css<{ $invalid?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.borderStrong)};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: border-color ${({ theme }) => theme.transition.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.focusRing};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

export const StyledInput = styled.input<{ $invalid?: boolean }>`
  ${base}
`;

export const StyledTextArea = styled.textarea<{ $invalid?: boolean }>`
  ${base}
  min-height: 90px;
  resize: vertical;
`;

export const StyledSelect = styled.select<{ $invalid?: boolean }>`
  ${base}
  appearance: auto;
`;
