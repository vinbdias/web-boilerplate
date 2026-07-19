import { useEffect, useState } from "react";

/** True when the window is scrolled within `thresholdPx` of the document bottom. */
export function usePageBottom(thresholdPx = 10): boolean {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    function onScroll() {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      setAtBottom(scrollY + innerHeight >= scrollHeight - thresholdPx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return atBottom;
}
