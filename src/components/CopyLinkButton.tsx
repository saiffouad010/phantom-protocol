import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyLinkButton() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const input = document.createElement("textarea");
        input.value = window.location.href;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Clipboard fallback failed");
      }
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  const label =
    state === "copied"
      ? "Link copied"
      : state === "failed"
        ? "Copy failed"
        : "Copy profile link";

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      aria-label={label}
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] text-mute uppercase transition duration-300 hover:border-crimson/40 hover:text-ink"
    >
      {state === "copied" ? (
        <Check className="h-3.5 w-3.5 text-signal" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {label}
    </button>
  );
}
