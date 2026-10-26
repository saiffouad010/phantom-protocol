import { useRef } from "react";
import { motion } from "motion/react";
import { profile } from "@/config/profile";
import { ProfileHeader } from "@/components/ProfileHeader";
import { IdentityBadges } from "@/components/IdentityBadges";
import { SocialLinks } from "@/components/SocialLinks";
import { LinkCards } from "@/components/LinkCards";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { ProfileViews } from "@/components/ProfileViews";
import { AboutModal } from "@/components/AboutModal";
import { useMediaFlags } from "@/hooks/useMediaFlags";

export function ProfileCard({ ready }: { ready: boolean }) {
  const cardRef = useRef<HTMLElement>(null);
  const flags = useMediaFlags();

  return (
    <motion.article
      ref={cardRef}
      className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-surface/72 shadow-[0_40px_90px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl"
      initial={flags.reducedMotion ? false : { opacity: 0, y: 28 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.05 }}
      onPointerMove={(event) => {
        if (flags.coarsePointer) return;
        const node = cardRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        node.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }}
    >
      <div className="card-glow pointer-events-none absolute inset-0" />
      <ProfileHeader />
      <div className="relative px-5 pt-16 pb-6 sm:px-6">
        <h1 className="text-center font-display text-[32px] leading-none font-semibold tracking-tight text-ink">
          {profile.displayName}
        </h1>
        {profile.username ? (
          <p className="mt-2 text-center font-mono text-[13px] text-mute">@{profile.username}</p>
        ) : null}
        <IdentityBadges />
        <p className="mx-auto mt-4 max-w-[34ch] text-center text-[13.5px] leading-relaxed text-mute">
          {profile.bio}
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.08em] text-ink/80">
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-signal" />
          {profile.status}
        </p>
        <p className="mt-3 text-center font-mono text-[11px] text-mute/80">
          {profile.terminalLine}
          <span className="ml-2 text-signal/80">{profile.terminalValue}</span>
        </p>
        <SocialLinks />
        <LinkCards />
        <CopyLinkButton />
        <ProfileViews />
        <AboutModal />
      </div>
    </motion.article>
  );
}
