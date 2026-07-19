import { useEffect, useRef, useState } from "react";
import type { SearchResultItem } from "@/types";

type SearchFn<TApi> = (query: string) => Promise<TApi[]>;
type MapperFn<TApi, TResult> = (item: TApi) => TResult;

interface UseDebouncedSearchParams<TApi, TResult> {
  searchFn: SearchFn<TApi>;
  mapper: MapperFn<TApi, TResult>;
  delay?: number;
}

/** Debounced async search + mapper. Domain-agnostic core of SearchBarAdvanced/Table. */
export function useDebouncedSearch<TApi, TResult = SearchResultItem>({
  searchFn,
  mapper,
  delay = 500,
}: UseDebouncedSearchParams<TApi, TResult>) {
  const timeoutRef = useRef<number | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<TResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(async () => {
      setDebouncedQuery(value);
      if (!value.trim()) {
        setLoading(false);
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchFn(value);
        setResults(data.map(mapper));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { query, debouncedQuery, results, loading, handleSearch, setResults };
}
