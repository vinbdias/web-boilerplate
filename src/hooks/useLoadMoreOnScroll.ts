import { useCallback, useEffect, type RefObject } from "react";

interface UseLoadMoreOnScrollParams {
  containerRef: RefObject<HTMLElement | null>;
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
  enabled?: boolean;
  bottomOffsetPx?: number;
}

/** Infinite-scroll helper for a scrollable container. */
export function useLoadMoreOnScroll({
  containerRef,
  hasMore,
  isLoading,
  loadMore,
  enabled = true,
  bottomOffsetPx = 80,
}: UseLoadMoreOnScrollParams) {
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || !enabled || !hasMore || isLoading) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - bottomOffsetPx) {
      loadMore();
    }
  }, [containerRef, enabled, hasMore, isLoading, loadMore, bottomOffsetPx]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [containerRef, enabled, handleScroll]);

  return { handleScroll };
}
