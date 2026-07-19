import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.base};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const HeaderCell = styled.th<{ $width?: string; $sortable?: boolean }>`
  text-align: left;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  white-space: nowrap;
  width: ${({ $width }) => $width};
  cursor: ${({ $sortable }) => ($sortable ? "pointer" : "default")};
  user-select: none;
`;

export const HeaderContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const BodyRow = styled.tr<{ $nested?: boolean }>`
  ${({ theme, $nested }) =>
    $nested &&
    css`
      background: ${theme.colors.accentSubtle};
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const BodyCell = styled.td<{ $wrap?: boolean }>`
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: ${({ $wrap }) => ($wrap ? "normal" : "nowrap")};
  vertical-align: middle;
`;

export const ColorCell = styled.td`
  width: 4px;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ColorBar = styled.span<{ $color?: string }>`
  display: block;
  width: 4px;
  height: 100%;
  min-height: 2.5rem;
  background: ${({ theme, $color }) => $color ?? theme.colors.accent};
`;

export const EmptyCell = styled.td`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.space[6]} !important;
`;

export const ActionsCell = styled.td`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

export const DrawerRow = styled.tr``;

export const DrawerContent = styled.td`
  padding: ${({ theme }) => theme.space[4]};
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  flex-wrap: wrap;
`;

export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
`;
