import { useEffect, useState } from "react";

function getFlags() {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const data = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  return {
    reducedMotion: motion,
    coarsePointer: coarse,
    compact: narrow,
    reducedData: data,
    simplifyAtmosphere: motion || data || (coarse && narrow),
  };
}

export function useMediaFlags() {
  const [flags, setFlags] = useState(getFlags);

  useEffect(() => {
    const update = () => setFlags(getFlags());
    const queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(max-width: 768px)"),
      window.matchMedia("(prefers-reduced-data: reduce)"),
    ];
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return flags;
}
