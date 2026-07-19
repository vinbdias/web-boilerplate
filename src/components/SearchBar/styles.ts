import styled from "styled-components";

export const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  flex: 1;

  input {
    padding-right: ${({ theme }) => theme.space[6]};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space[2]};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: ${({ theme }) => theme.space[1]};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
