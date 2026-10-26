import { Code2, Gamepad2, Shield } from "lucide-react";
import { profile } from "@/config/profile";

const icons = {
  developer: Code2,
  cybersecurity: Shield,
  gamer: Gamepad2,
} as const;

export function IdentityBadges() {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
      {profile.roles.map((role) => {
        const Icon = icons[role.id];
        return (
          <span
            key={role.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-ink/88 uppercase"
          >
            <Icon className="h-3 w-3 text-crimson" strokeWidth={2} />
            {role.label}
          </span>
        );
      })}
    </div>
  );
}
