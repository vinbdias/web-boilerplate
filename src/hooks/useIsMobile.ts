import { useEffect, useState } from "react";
import breakpoints from "@/styles/breakpoints";

/** True when viewport width is at or below the `md` breakpoint. */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoints.sizes.md : false,
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpoints.sizes.md);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}
