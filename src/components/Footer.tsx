import { profile } from "@/config/profile";

export function Footer({ onReplayIntro }: { onReplayIntro: () => void }) {
  return (
    <footer className="relative z-10 mt-8 flex flex-col items-center gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[11px] tracking-[0.14em] text-white/65 uppercase">
      <span>
        {profile.protocolName}
        <span className="mx-2 text-white/20">/</span>
        <span className="text-[#ff807b] transition hover:text-[#ffaaa6]">{profile.developerIdentity.credit}</span>
      </span>
      <span className="text-[11px] tracking-[0.1em] text-white/50">{new Date().getFullYear()}</span>
      <button type="button" onClick={onReplayIntro} className="text-[11px] tracking-[0.1em] text-white/60 transition hover:text-[#ff807b]">
        Replay Intro
      </button>
    </footer>
  );
}
