import styled from "styled-components";

export const Wrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.font.size.sm};

  th {
    text-align: left;
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.bg};
    white-space: nowrap;
  }

  td {
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const EmptyCell = styled.td`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.space[6]} !important;
`;
