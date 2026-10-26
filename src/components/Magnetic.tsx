import { useRef, type ReactNode } from "react";
import { useMediaFlags } from "@/hooks/useMediaFlags";

export function Magnetic({
  children,
  strength = 7,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const flags = useMediaFlags();

  if (flags.coarsePointer || flags.reducedMotion) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      className="will-change-transform"
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        const node = ref.current;
        if (!node) return;
        node.style.transition = "transform 420ms cubic-bezier(0.22,1,0.36,1)";
        node.style.transform = "translate3d(0,0,0)";
        window.setTimeout(() => {
          if (node) node.style.transition = "";
        }, 420);
      }}
    >
      {children}
    </div>
  );
}
