import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/config/profile";

export function AboutModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-mute transition hover:border-crimson/45 hover:text-ink"
      >
        DECRYPT PROFILE
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-[#050506]/80 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            onClick={() => setOpen(false)}
          >
            <motion.section
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[min(620px,calc(100dvh-3rem))] w-full max-w-[520px] overflow-y-auto rounded-3xl border border-white/10 bg-[#0d0d10]/95 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close About Me"
                className="absolute right-4 top-4 rounded-full p-2 text-mute transition hover:bg-white/[0.06] hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-mono text-[10px] tracking-[0.24em] text-crimson">IDENTITY FILE // 001</p>
              <h2 id="about-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">About Me</h2>
              <p className="mt-3 text-sm leading-relaxed text-mute">A personal space for code, games, and focused security learning.</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <InfoGroup title="Programming" items={profile.about.programming} />
                <InfoGroup title="Games" items={profile.about.games} />
                <InfoGroup title="Security" items={profile.about.security} />
              </div>

              <a
                href={profile.about.credentialsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-between rounded-2xl border border-crimson/25 bg-crimson/[0.06] px-4 py-3 text-sm transition hover:border-crimson/55 hover:bg-crimson/[0.1]"
              >
                <span>
                  <span className="block font-display font-semibold text-ink">Certificates</span>
                  <span className="mt-1 block text-xs text-mute">Open credential wallet</span>
                </span>
                <ExternalLink className="h-4 w-4 text-crimson" />
              </a>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function InfoGroup({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
      <h3 className="font-mono text-[10px] tracking-[0.12em] text-ink/80 uppercase">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-mute">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
