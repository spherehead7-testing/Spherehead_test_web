import { useState, useEffect } from "react";

/**
 * Returns true when the viewport is below the md breakpoint (768px).
 * Uses matchMedia for efficiency — no resize listener needed.
 */
export function useIsMobile(breakpoint = 1368): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
