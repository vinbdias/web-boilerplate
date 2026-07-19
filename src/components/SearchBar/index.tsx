import { useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { ClearButton, InputWrapper, Root } from "./styles";

export interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  /** Milliseconds to debounce keystrokes before firing onSearch. */
  debounceMs?: number;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Search…",
  debounceMs = 300,
  initialValue = "",
}: SearchBarProps) {
  const [term, setTerm] = useState(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    timeoutRef.current = setTimeout(() => onSearch(term), debounceMs);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire only on term change
  }, [term, debounceMs]);

  return (
    <Root role="search">
      <InputWrapper>
        <Input
          type="search"
          value={term}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(event) => setTerm(event.target.value)}
        />
      </InputWrapper>
      {term && (
        <ClearButton type="button" aria-label="Clear search" onClick={() => setTerm("")}>
          ✕
        </ClearButton>
      )}
    </Root>
  );
}
