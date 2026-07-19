import { Fragment, useMemo, useState, type ReactNode } from "react";
import { FaIcon } from "../FaIcon";
import { Button } from "../Button";
import {
  ActionsCell,
  BodyCell,
  BodyRow,
  ColorBar,
  ColorCell,
  DrawerContent,
  DrawerRow,
  EmptyCell,
  HeaderCell,
  HeaderContent,
  PaginationBar,
  PaginationButtons,
  PaginationInfo,
  StyledTable,
  TableContainer,
  Title,
  Wrapper,
} from "./styles";

export type RenderCellFunction = (row: TableRow) => ReactNode;

export interface TableHeader {
  name: string;
  label?: string;
  sortable?: boolean;
  width?: string;
  renderCell?: RenderCellFunction;
  renderHeader?: () => ReactNode;
  wrap?: boolean;
}

export type TableHeaders = TableHeader[];

export interface TableRow {
  [key: string]: unknown;
  color?: string;
}

export type TableUsability = "pagination" | "internal-pagination" | "load-more";
export type TableRowSurface = "default" | "nested";
export type TableDrawerExpandMode = "toggle" | "always";

export interface TableDataProps {
  data: TableRow[];
  headers?: TableHeaders;
  title?: string;
  usability?: TableUsability;
  page?: number;
  pageSize?: number;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (column: string, direction: "asc" | "desc" | null) => void;
  actions?: ReactNode | ((row: TableRow, index: number) => ReactNode);
  renderExpandedRow?: (row: TableRow, index: number) => ReactNode;
  isRowExpanded?: (row: TableRow, index: number) => boolean;
  drawerExpandMode?: TableDrawerExpandMode;
  hasDrawerContent?: (row: TableRow, index: number) => boolean;
  getRowSurface?: (row: TableRow, index: number) => TableRowSurface;
  showRowColorBar?: boolean | ((row: TableRow, index: number) => boolean);
  emptyMessage?: string;
}

type SortState = { column: string; direction: "asc" | "desc" } | null;

function getVisiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

/**
 * Dataset table with configurable headers (`renderCell` / sortable / width),
 * client or server sort, and pagination / load-more modes.
 */
export function TableData({
  data,
  headers: headersProp,
  title,
  usability = "pagination",
  page = 1,
  pageSize = 10,
  totalRecords,
  onPageChange,
  onSortChange,
  actions,
  renderExpandedRow,
  isRowExpanded,
  drawerExpandMode = "toggle",
  hasDrawerContent,
  getRowSurface,
  showRowColorBar = false,
  emptyMessage = "No records found.",
}: TableDataProps) {
  const [sort, setSort] = useState<SortState>(null);
  const [internalPage, setInternalPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const headers: TableHeaders = useMemo(() => {
    if (headersProp?.length) return headersProp;
    if (!data[0]) return [];
    return Object.keys(data[0])
      .filter((key) => key !== "color")
      .map((key) => ({ name: key, label: key }));
  }, [headersProp, data]);

  const sortedData = useMemo(() => {
    if (!sort || onSortChange) return data;
    const { column, direction } = sort;
    return [...data].sort((a, b) => {
      const av = a[column];
      const bv = b[column];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return direction === "asc" ? cmp : -cmp;
    });
  }, [data, sort, onSortChange]);

  const currentPage = usability === "internal-pagination" ? internalPage : page;
  const total = totalRecords ?? sortedData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const visibleRows = useMemo(() => {
    if (usability === "load-more") return sortedData.slice(0, visibleCount);
    if (usability === "internal-pagination") {
      const start = (internalPage - 1) * pageSize;
      return sortedData.slice(start, start + pageSize);
    }
    if (usability === "pagination" && totalRecords == null) {
      const start = (page - 1) * pageSize;
      return sortedData.slice(start, start + pageSize);
    }
    return sortedData;
  }, [sortedData, usability, visibleCount, internalPage, page, pageSize, totalRecords]);

  function handleSort(column: string) {
    let next: SortState = null;
    if (!sort || sort.column !== column) next = { column, direction: "asc" };
    else if (sort.direction === "asc") next = { column, direction: "desc" };
    else next = null;

    setSort(next);
    onSortChange?.(column, next?.direction ?? null);
  }

  function changePage(next: number) {
    if (usability === "internal-pagination") setInternalPage(next);
    else onPageChange?.(next);
  }

  const showColorBar = typeof showRowColorBar === "boolean" ? () => showRowColorBar : showRowColorBar;
  const colSpan = headers.length + (actions ? 1 : 0) + 1;

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <HeaderCell aria-hidden="true" style={{ width: 4, padding: 0 }} />
              {headers.map((header) => (
                <HeaderCell
                  key={header.name}
                  $width={header.width}
                  $sortable={header.sortable}
                  onClick={header.sortable ? () => handleSort(header.name) : undefined}
                >
                  <HeaderContent>
                    {header.renderHeader ? header.renderHeader() : (header.label ?? header.name)}
                    {header.sortable && (
                      <FaIcon
                        name={
                          sort?.column === header.name
                            ? sort.direction === "asc"
                              ? "sortUp"
                              : "sortDown"
                            : "sort"
                        }
                        size="xs"
                      />
                    )}
                  </HeaderContent>
                </HeaderCell>
              ))}
              {actions && <HeaderCell>Actions</HeaderCell>}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <EmptyCell colSpan={colSpan}>{emptyMessage}</EmptyCell>
              </tr>
            ) : (
              visibleRows.map((row, index) => {
                const expanded =
                  drawerExpandMode === "always"
                    ? (hasDrawerContent?.(row, index) ?? true)
                    : (isRowExpanded?.(row, index) ?? false);
                const surface = getRowSurface?.(row, index) ?? "default";

                return (
                  <Fragment key={`row-${index}`}>
                    <BodyRow $nested={surface === "nested"}>
                      <ColorCell>
                        {showColorBar(row, index) && <ColorBar $color={row.color} />}
                      </ColorCell>
                      {headers.map((header) => (
                        <BodyCell key={header.name} $wrap={header.wrap}>
                          {header.renderCell
                            ? header.renderCell(row)
                            : ((row[header.name] as ReactNode) ?? "—")}
                        </BodyCell>
                      ))}
                      {actions && (
                        <ActionsCell>
                          {typeof actions === "function" ? actions(row, index) : actions}
                        </ActionsCell>
                      )}
                    </BodyRow>
                    {renderExpandedRow && expanded && (
                      <DrawerRow>
                        <DrawerContent colSpan={colSpan}>{renderExpandedRow(row, index)}</DrawerContent>
                      </DrawerRow>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </StyledTable>
      </TableContainer>

      {usability === "load-more" && visibleCount < sortedData.length && (
        <PaginationBar>
          <Button variant="secondary" size="sm" onClick={() => setVisibleCount((n) => n + pageSize)}>
            Load more
          </Button>
        </PaginationBar>
      )}

      {(usability === "pagination" || usability === "internal-pagination") && totalPages > 1 && (
        <PaginationBar>
          <PaginationInfo>
            Page {currentPage} of {totalPages} ({total} items)
          </PaginationInfo>
          <PaginationButtons>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => changePage(currentPage - 1)}
            >
              Previous
            </Button>
            {getVisiblePages(currentPage, totalPages).map((item, i) =>
              item === "…" ? (
                <span key={`ellipsis-${i}`}>…</span>
              ) : (
                <Button
                  key={item}
                  variant={item === currentPage ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => changePage(item)}
                >
                  {item}
                </Button>
              ),
            )}
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </Button>
          </PaginationButtons>
        </PaginationBar>
      )}
    </Wrapper>
  );
}
