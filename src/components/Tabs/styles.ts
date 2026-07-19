import styled from "styled-components";

export const List = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[1]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border: none;
  background: transparent;
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.accent : "transparent")};
  margin-bottom: -1px;
`;

export const Panel = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
`;
