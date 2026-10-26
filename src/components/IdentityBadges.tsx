import { Code2, Gamepad2, Shield } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "@/config/profile";

const icons = {
  developer: Code2,
  cybersecurity: Shield,
  gamer: Gamepad2,
} as const;

export function IdentityBadges({ delay = 0.35 }: { delay?: number }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
      {profile.roles.map((role, index) => {
        const Icon = icons[role.id];
        return (
          <motion.span
            key={role.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-ink/88 uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.06, duration: 0.35 }}
          >
            <Icon className="h-3 w-3 text-crimson" strokeWidth={2} />
            {role.label}
          </motion.span>
        );
      })}
    </div>
  );
}
