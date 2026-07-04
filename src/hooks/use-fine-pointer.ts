import { useEffect, useState } from "react";

/**
 * True only for devices with an accurate pointing device (mouse/trackpad).
 * Used to gate the custom cursor and hover-only interactions away from
 * touch devices, where they'd be meaningless or harmful to UX.
 */
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setIsFine(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isFine;
}
