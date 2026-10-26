import { profile } from "@/config/profile";
import { Avatar } from "@/components/Avatar";

export function ProfileHeader() {
  return (
    <header className="relative">
      <div className="relative h-40 overflow-hidden sm:h-44">
        <img
          src={profile.media.banner}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-void/25 to-void/35" />
        <p className="absolute top-3 left-4 font-mono text-[10px] tracking-[0.28em] text-white/70">
          {profile.protocolName}
        </p>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <Avatar />
      </div>
    </header>
  );
}
