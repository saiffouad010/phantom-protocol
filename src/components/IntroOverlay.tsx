/**
 * PHANTOM PROTOCOL
 * Developed by ENG - SAIF
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SESSION_KEY = "phantom-protocol-entered-v2";
const command = "whoami";
const identityLines = [
  "saif fouad",
  "> Developer",
  "> Cybersecurity Enthusiast",
  "> Gamer",
  "[ IDENTITY VERIFIED ✓ ]",
  "[ PHANTOM PROTOCOL INITIALIZED ]",
];

function hasEnteredThisSession() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberEntry() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // The experience remains usable when storage is unavailable.
  }
}

export function IntroOverlay({
  reducedMotion,
  onComplete,
  replayKey = 0,
}: {
  reducedMotion: boolean;
  onComplete: () => void;
  replayKey?: number;
}) {
  const [visible, setVisible] = useState(() => replayKey > 0 || !hasEnteredThisSession());
  const [typed, setTyped] = useState("");
  const [lineCount, setLineCount] = useState(0);
  const [complete, setComplete] = useState(false);
  const [entering, setEntering] = useState(false);
  const [showEntering, setShowEntering] = useState(false);

  useEffect(() => {
    if (!visible) {
      onComplete();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let cancelled = false;
    const timers: number[] = [];
    const addTimer = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    for (let index = 1; index <= command.length; index += 1) {
      addTimer(() => {
        if (!cancelled) setTyped(command.slice(0, index));
      }, 720 + index * 70);
    }

    identityLines.forEach((_, index) => {
      addTimer(() => {
        if (!cancelled) setLineCount(index + 1);
      }, 1_350 + index * 285);
    });

    addTimer(() => {
      if (!cancelled) setComplete(true);
    }, 3_150);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, reducedMotion, visible]);

  function exit(skip = false) {
    if (entering) return;
    setEntering(true);
    if (skip || reducedMotion || !complete) {
      rememberEntry();
      setVisible(false);
      return;
    }
    setShowEntering(true);
    window.setTimeout(() => {
      rememberEntry();
      setVisible(false);
    }, 420);
  }

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        exit(true);
      } else if (event.key === "Enter" && complete && event.target === document.body) {
        event.preventDefault();
        exit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [complete, entering, visible]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 grid min-h-dvh place-items-center overflow-hidden bg-[#050506] px-4 py-8 text-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.78, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Phantom Access identity initialization"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(164,22,26,0.14),transparent_38%),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:auto,36px_36px,36px_36px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(5,5,6,0.8)_100%)]" />

          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[720px] overflow-hidden rounded-2xl border border-crimson/35 bg-[#0b0b0e]/95 shadow-[0_30px_100px_rgba(0,0,0,0.7),0_0_70px_rgba(164,22,26,0.14)]"
          >
            <header className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e53935]/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-2 font-mono text-[11px] tracking-[0.16em] text-white/70">phantom@identity:~</span>
            </header>

            <div className="min-h-[310px] px-5 py-6 font-mono text-[12px] leading-[1.9] sm:px-8 sm:py-8 sm:text-[13px]">
              <p className="text-ink/85">┌──(saif㉿phantom)-[~]</p>
              <p className="text-ink/85">
                └─$ <span className="text-crimson">{typed}</span>
                {!complete && !showEntering ? <span className="ml-1 inline-block h-[1.1em] w-[7px] translate-y-[2px] animate-pulse bg-crimson/90" /> : null}
              </p>
              <div className="mt-4 space-y-0.5" aria-live="off">
                {identityLines.slice(0, lineCount).map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28 }}
                    className={index >= 4 ? "text-[#ff6b66]" : index === 0 ? "text-ink" : "text-mute"}
                  >
                    {line}
                  </motion.p>
                ))}
                {complete ? <p className="mt-2 text-signal">&gt; ACCESS GRANTED</p> : null}
                {showEntering ? <p className="mt-3 text-crimson">&gt; ENTERING THE VOID...</p> : null}
              </div>
            </div>

            <footer className="flex flex-col gap-3 border-t border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <span className="font-mono text-[11px] tracking-[0.1em] text-white/70">PHANTOM ACCESS // IDENTITY INITIALIZATION</span>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => exit(true)}
                  className="rounded-full border border-white/15 px-3 py-2 font-mono text-[11px] tracking-[0.08em] text-white/75 transition hover:border-crimson/50 hover:text-ink"
                >
                  SKIP INTRO
                </button>
                {complete && !showEntering ? (
                  <button
                    type="button"
                    onClick={() => exit()}
                    autoFocus
                    className="rounded-full border border-crimson/60 bg-crimson/10 px-3 py-2 font-mono text-[11px] tracking-[0.08em] text-ink transition hover:bg-crimson/20"
                  >
                    <span className="hidden sm:inline">[ PRESS ENTER TO ENTER THE VOID ]</span>
                    <span className="sm:hidden">[ TAP TO ENTER THE VOID ]</span>
                  </button>
                ) : null}
              </div>
            </footer>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
