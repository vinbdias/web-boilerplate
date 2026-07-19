import styled from "styled-components";

export {
  Root,
  InputWrap,
  IconLeft,
  Field,
} from "../SearchBarAdvanced/styles";

export const TableDropdown = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $maxHeight: number;
}>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: max(${({ $width }) => $width}px, 420px);
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: auto;
  z-index: 1000;
`;

export const MiniTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.font.size.sm};

  thead th {
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.bg};
    text-align: left;
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  tbody td {
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    cursor: pointer;
  }

  tbody tr:hover td {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const Empty = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;
