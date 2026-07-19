import styled from "styled-components";

export const Root = styled.div`
  position: relative;
  width: 100%;
`;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconLeft = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
  z-index: 1;
`;

export const Field = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  padding-left: ${({ theme }) => theme.space[8]};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radius.md};

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.focusRing};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceHover};
    cursor: not-allowed;
  }
`;

export const Dropdown = styled.ul<{ $top: number; $left: number; $width: number; $maxHeight: number }>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: ${({ $width }) => $width}px;
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  margin: 0;
  padding: ${({ theme }) => theme.space[1]};
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow-y: auto;
  z-index: 1000;
`;

export const Option = styled.li<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.colors.surfaceHover : "transparent")};
`;

export const OptionLabel = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export const OptionDescription = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Empty = styled.li`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Loading = styled.li`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
