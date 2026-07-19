import { useCallback, useRef, type RefObject } from "react";

/** Keyed dynamic ref registry — useful for focusing fields by name. */
export function useDynamicRefs<T extends HTMLElement = HTMLElement>() {
  const map = useRef(new Map<string, T>());

  const setRef = useCallback((key: string) => {
    return (node: T | null) => {
      if (node) map.current.set(key, node);
      else map.current.delete(key);
    };
  }, []);

  const getRef = useCallback((key: string): RefObject<T | null> => {
    return { current: map.current.get(key) ?? null };
  }, []);

  return [getRef, setRef] as const;
}
