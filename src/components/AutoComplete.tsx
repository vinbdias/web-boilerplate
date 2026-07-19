import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Input } from "./Input";
import "./AutoComplete.css";

export interface AutoCompleteOption {
  value: string;
  label: string;
}

export interface AutoCompleteProps {
  options: AutoCompleteOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  id?: string;
  invalid?: boolean;
  "aria-describedby"?: string;
}

/**
 * Combobox with local filtering and full keyboard support
 * (ArrowUp/ArrowDown/Enter/Escape). For async sources, filter the `options`
 * you pass in based on your own query state.
 */
export function AutoComplete({
  options,
  value,
  onChange,
  placeholder,
  id,
  invalid,
  "aria-describedby": ariaDescribedBy,
}: AutoCompleteProps) {
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value) ?? null;

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options;
    return options.filter((option) => option.label.toLowerCase().includes(term));
  }, [options, query]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function select(option: AutoCompleteOption) {
    onChange(option.value);
    setQuery("");
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setOpen(true);
      setActiveIndex(0);
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
        event.preventDefault();
        break;
      case "ArrowUp":
        setActiveIndex((index) => Math.max(index - 1, 0));
        event.preventDefault();
        break;
      case "Enter": {
        const option = filtered[activeIndex];
        if (open && option) {
          select(option);
          event.preventDefault();
        }
        break;
      }
      case "Escape":
        setOpen(false);
        break;
    }
  }

  return (
    <div className="ui-autocomplete" ref={rootRef}>
      <Input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
        aria-describedby={ariaDescribedBy}
        invalid={invalid}
        placeholder={placeholder}
        value={open ? query : (selected?.label ?? "")}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
          if (event.target.value === "") onChange(null);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <ul className="ui-autocomplete__list" role="listbox" id={listboxId}>
          {filtered.length === 0 ? (
            <li className="ui-autocomplete__empty">No results</li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={option.value === value}
                className={[
                  "ui-autocomplete__option",
                  index === activeIndex && "ui-autocomplete__option--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  select(option);
                }}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
