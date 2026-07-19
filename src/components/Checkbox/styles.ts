import styled from "styled-components";

export const Root = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};

  &:has(input:disabled) {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const NativeInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
