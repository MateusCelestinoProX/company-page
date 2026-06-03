"use client";

import * as React from "react";

export function srOnlyStyles() {
  return {
    position: "absolute" as const,
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden" as const,
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap" as const,
    borderWidth: 0,
  };
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();

    // Safari fallback
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    // Legacy Safari / older browsers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mql as any).addListener(onChange);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => (mql as any).removeListener(onChange);
  }, []);

  return reduced;
}
