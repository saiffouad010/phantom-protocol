import { profile } from "@/config/profile";

export function Footer({ onReplayIntro }: { onReplayIntro: () => void }) {
  return (
    <footer className="relative z-10 mt-8 flex flex-col items-center gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">
      <span>
        {profile.protocolName}
        <span className="mx-2 text-white/20">/</span>
        <span className="text-crimson/70 transition hover:text-crimson">{profile.developerIdentity.credit}</span>
      </span>
      <span className="text-[9px] tracking-[0.16em] text-white/20">{new Date().getFullYear()}</span>
      <button type="button" onClick={onReplayIntro} className="text-[9px] tracking-[0.16em] text-white/25 transition hover:text-crimson">
        Replay Intro
      </button>
    </footer>
  );
}
