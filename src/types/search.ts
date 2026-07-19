/** Canonical shape for search-result rows across SearchBarAdvanced / SearchBarTable. */
export interface SearchResultItem {
  id: string | number;
  label: string;
  description?: string;
  /** Original API payload for downstream navigation / form fill. */
  payload?: unknown;
}
