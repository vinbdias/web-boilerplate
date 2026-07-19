import type { ReactNode } from "react";
import { EmptyCell, StyledTable, Wrapper } from "./styles";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  width?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = "No records found.",
}: TableProps<T>) {
  return (
    <Wrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={column.width ? { width: column.width } : undefined}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <EmptyCell colSpan={columns.length}>{emptyMessage}</EmptyCell>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
}
