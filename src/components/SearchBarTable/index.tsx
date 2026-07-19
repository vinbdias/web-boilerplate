import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { usePortalAnchor } from "@/hooks/usePortalAnchor";
import type { SearchResultItem } from "@/types";
import { FaIcon } from "../FaIcon";
import { Spinner } from "../Spinner";
import type { TableHeaders, TableRow } from "../TableData";
import {
  Empty,
  Field,
  IconLeft,
  InputWrap,
  MiniTable,
  Root,
  TableDropdown,
} from "./styles";

export interface SearchBarTableProps<TApi, T extends TableRow> {
  searchFn: (query: string) => Promise<TApi[]>;
  mapper: (item: TApi) => T;
  headers: TableHeaders;
  placeholder?: string;
  selectedLabel?: string;
  onSelect?: (item: T) => void;
  getItemLabel?: (item: T) => string;
  clearOnFocusWhenSelected?: boolean;
  debounceDelay?: number;
  disabled?: boolean;
}

function defaultLabel(item: TableRow): string {
  if ("label" in item && item.label != null) return String(item.label);
  return String(item.id ?? "");
}

/** Same search input as SearchBarAdvanced, but results render as a mini TableData. */
export function SearchBarTable<TApi, T extends TableRow>({
  searchFn,
  mapper,
  headers,
  placeholder = "Search…",
  selectedLabel,
  onSelect,
  getItemLabel = defaultLabel,
  clearOnFocusWhenSelected = true,
  debounceDelay = 500,
  disabled,
}: SearchBarTableProps<TApi, T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState(selectedLabel ?? "");

  const { query, results, loading, handleSearch } = useDebouncedSearch<TApi, T>({
    searchFn,
    mapper,
    delay: debounceDelay,
  });

  const position = usePortalAnchor(inputRef, open);
  useOnClickOutside(rootRef, () => setOpen(false));

  function select(item: T) {
    onSelect?.(item);
    setSelectedDisplay(getItemLabel(item));
    handleSearch("");
    setOpen(false);
  }

  const displayValue = open || !selectedDisplay ? query : selectedDisplay;

  return (
    <Root ref={rootRef}>
      <InputWrap>
        <IconLeft>
          {loading ? <Spinner size="sm" /> : <FaIcon name="magnifyingGlass" size="sm" />}
        </IconLeft>
        <Field
          ref={inputRef}
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          onChange={(event) => {
            setSelectedDisplay("");
            handleSearch(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (clearOnFocusWhenSelected && selectedDisplay) {
              setSelectedDisplay("");
              handleSearch("");
            }
            setOpen(true);
          }}
        />
      </InputWrap>
      {open &&
        position &&
        createPortal(
          <TableDropdown
            $top={position.top}
            $left={position.left}
            $width={position.width}
            $maxHeight={position.maxHeight}
          >
            {!loading && results.length === 0 && query ? (
              <Empty>No results</Empty>
            ) : (
              <MiniTable>
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header.name} style={header.width ? { width: header.width } : undefined}>
                        {header.label ?? header.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr
                      key={index}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        select(row);
                      }}
                    >
                      {headers.map((header) => (
                        <td key={header.name}>
                          {header.renderCell
                            ? header.renderCell(row)
                            : ((row[header.name] as React.ReactNode) ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </MiniTable>
            )}
          </TableDropdown>,
          document.body,
        )}
    </Root>
  );
}

export type { SearchResultItem };
