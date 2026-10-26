import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const SESSION_KEY = "phantom-profile-view-token";

function createSessionToken() {
  return crypto.randomUUID();
}

export function ProfileViews() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    let sessionToken: string | null;
    try {
      sessionToken = window.sessionStorage.getItem(SESSION_KEY);
    } catch {
      sessionToken = null;
    }

    const requestToken = sessionToken ?? createSessionToken();
    const request = sessionToken
      ? fetch("/api/views", { cache: "no-store" })
      : fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionToken: requestToken }),
          cache: "no-store",
        });

    request
      .then((response) => {
        if (!response.ok) throw new Error("counter unavailable");
        return response.json() as Promise<{ count?: number }>;
      })
      .then((data) => {
        if (active && typeof data.count === "number") {
          if (!sessionToken) {
            try {
              window.sessionStorage.setItem(SESSION_KEY, requestToken);
            } catch {
              // The server-side dedupe remains active for this request.
            }
          }
          setCount(data.count);
        }
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
    <div className="mt-5 flex items-center justify-center gap-2 text-center" aria-label={`${count.toLocaleString()} profile views`}>
      <span className="font-sans text-[11px] font-medium text-white/70">Profile Views</span>
      <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-white/60">
        <Eye className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}
