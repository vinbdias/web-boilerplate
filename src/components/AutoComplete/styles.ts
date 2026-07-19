import styled from "styled-components";

export const Root = styled.div`
  position: relative;
`;

export const List = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  margin: 0;
  padding: ${({ theme }) => theme.space[1]};
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-height: 240px;
  overflow-y: auto;
  z-index: 50;
`;

export const Option = styled.li<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.colors.surfaceHover : "transparent")};

  &[aria-selected="true"] {
    font-weight: ${({ theme }) => theme.font.weight.semibold};
  }
`;

export const Empty = styled.li`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;
