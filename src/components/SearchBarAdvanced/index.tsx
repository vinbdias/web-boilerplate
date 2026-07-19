import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { usePortalAnchor } from "@/hooks/usePortalAnchor";
import type { SearchResultItem } from "@/types";
import { FaIcon } from "../FaIcon";
import { Spinner } from "../Spinner";
import {
  Dropdown,
  Empty,
  Field,
  IconLeft,
  InputWrap,
  Loading,
  Option,
  OptionDescription,
  OptionLabel,
  Root,
} from "./styles";

interface AutoModeProps<TApi, TResult> {
  mode?: "auto";
  searchFn: (query: string) => Promise<TApi[]>;
  mapper: (item: TApi) => TResult;
  debounceDelay?: number;
}

interface ControlledModeProps<TResult> {
  mode: "controlled";
  value: string;
  onChange: (value: string) => void;
  results?: TResult[];
  loading?: boolean;
}

type CommonProps<TResult> = {
  placeholder?: string;
  selectedLabel?: string;
  disabled?: boolean;
  clearOnFocusWhenSelected?: boolean;
  getItemLabel?: (item: TResult) => string;
  renderResult?: (item: TResult) => ReactNode;
  onSelect?: (item: TResult) => void;
  onSearchChange?: (query: string) => void;
};

export type SearchBarAdvancedProps<TApi = unknown, TResult = SearchResultItem> = CommonProps<TResult> &
  (AutoModeProps<TApi, TResult> | ControlledModeProps<TResult>);

function defaultLabel(item: unknown): string {
  if (item && typeof item === "object" && "label" in item) {
    return String((item as SearchResultItem).label);
  }
  return String(item);
}

/**
 * Search input with portal dropdown. Auto mode wires `searchFn` + `mapper`
 * through `useDebouncedSearch`; controlled mode lets the parent own results.
 */
export function SearchBarAdvanced<TApi = unknown, TResult = SearchResultItem>(
  props: SearchBarAdvancedProps<TApi, TResult>,
) {
  const {
    placeholder = "Search…",
    selectedLabel,
    disabled,
    clearOnFocusWhenSelected = true,
    getItemLabel = defaultLabel,
    renderResult,
    onSelect,
    onSearchChange,
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedDisplay, setSelectedDisplay] = useState(selectedLabel ?? "");

  const isControlled = props.mode === "controlled";

  const auto = useDebouncedSearch<TApi, TResult>({
    searchFn: isControlled
      ? async () => []
      : (props as AutoModeProps<TApi, TResult>).searchFn,
    mapper: isControlled
      ? (item) => item as unknown as TResult
      : (props as AutoModeProps<TApi, TResult>).mapper,
    delay: isControlled ? 0 : ((props as AutoModeProps<TApi, TResult>).debounceDelay ?? 500),
  });

  const query = isControlled ? props.value : auto.query;
  const results = isControlled ? (props.results ?? []) : auto.results;
  const loading = isControlled ? Boolean(props.loading) : auto.loading;

  const position = usePortalAnchor(inputRef, open);
  useOnClickOutside(rootRef, () => setOpen(false));

  function setQuery(value: string) {
    if (isControlled) props.onChange(value);
    else auto.handleSearch(value);
    onSearchChange?.(value);
    setSelectedDisplay("");
    setOpen(true);
    setActiveIndex(0);
  }

  function select(item: TResult) {
    onSelect?.(item);
    setSelectedDisplay(getItemLabel(item));
    if (!isControlled) auto.handleSearch("");
    else props.onChange("");
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open) return;
    if (event.key === "ArrowDown") {
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      setActiveIndex((i) => Math.max(i - 1, 0));
      event.preventDefault();
    } else if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      select(results[activeIndex]);
      event.preventDefault();
    } else if (event.key === "Escape") {
      setOpen(false);
    }
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
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (clearOnFocusWhenSelected && selectedDisplay) {
              setSelectedDisplay("");
              setQuery("");
            }
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />
      </InputWrap>
      {open &&
        position &&
        createPortal(
          <Dropdown
            role="listbox"
            $top={position.top}
            $left={position.left}
            $width={position.width}
            $maxHeight={position.maxHeight}
          >
            {loading && <Loading>Searching…</Loading>}
            {!loading && results.length === 0 && query && <Empty>No results</Empty>}
            {!loading &&
              results.map((item, index) => (
                <Option
                  key={index}
                  role="option"
                  aria-selected={index === activeIndex}
                  $active={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    select(item);
                  }}
                >
                  {renderResult ? (
                    renderResult(item)
                  ) : (
                    <>
                      <OptionLabel>{getItemLabel(item)}</OptionLabel>
                      {item &&
                        typeof item === "object" &&
                        "description" in item &&
                        Boolean((item as unknown as SearchResultItem).description) && (
                          <OptionDescription>
                            {(item as unknown as SearchResultItem).description}
                          </OptionDescription>
                        )}
                    </>
                  )}
                </Option>
              ))}
          </Dropdown>,
          document.body,
        )}
    </Root>
  );
}
