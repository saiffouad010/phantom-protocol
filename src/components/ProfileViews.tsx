import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const SESSION_KEY = "phantom-profile-view-counted";

export function ProfileViews() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    let countedThisSession = false;

    try {
      countedThisSession = window.sessionStorage.getItem(SESSION_KEY) === "1";
      if (!countedThisSession) window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // The counter still works when browser storage is unavailable.
    }

    const mode = countedThisSession ? "?mode=read" : "";
    fetch(`/api/views${mode}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("counter unavailable");
        return response.json() as Promise<{ count?: number }>;
      })
      .then((data) => {
        if (active && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {
        if (active) setCount(null);
      });

    return () => {
      active = false;
    };
  }, []);

  if (count === null) return null;

  return (
    <div className="mx-auto mt-4 inline-flex flex-col items-center gap-1.5 rounded-xl border border-white/8 bg-black/25 px-4 py-2 text-center shadow-[0_8px_24px_rgba(0,0,0,0.2)]" aria-label={`${count.toLocaleString()} profile views`}>
      <span className="font-sans text-[11px] font-medium text-ink/90">Profile Views</span>
      <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-mute">
        <Eye className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}
