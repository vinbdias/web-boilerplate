import { useCallback, useLayoutEffect, useState, type RefObject } from "react";

export interface PortalPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  placement: "below" | "above";
}

/**
 * Positions a floating panel (dropdown/calendar) relative to an anchor,
 * flipping above when there is not enough space below. Recomputes on
 * scroll/resize so it escapes overflow:hidden ancestors via a portal.
 */
export function usePortalAnchor(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
  gap = 4,
): PortalPosition | null {
  const [position, setPosition] = useState<PortalPosition | null>(null);

  const recompute = useCallback(() => {
    const el = anchorRef.current;
    if (!el || !open) {
      setPosition(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const preferBelow = spaceBelow >= 200 || spaceBelow >= spaceAbove;
    const maxHeight = Math.min(280, preferBelow ? spaceBelow - gap : spaceAbove - gap);

    setPosition({
      top: preferBelow ? rect.bottom + gap : rect.top - gap - maxHeight,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(120, maxHeight),
      placement: preferBelow ? "below" : "above",
    });
  }, [anchorRef, open, gap]);

  useLayoutEffect(() => {
    recompute();
    if (!open) return;
    window.addEventListener("scroll", recompute, true);
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", recompute, true);
      window.removeEventListener("resize", recompute);
    };
  }, [open, recompute]);

  return position;
}
