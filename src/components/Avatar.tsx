import { motion } from "motion/react";
import { profile } from "@/config/profile";

export function Avatar({ delay = 0.2 }: { delay?: number }) {
  return (
    <motion.div
      className="relative mx-auto h-[108px] w-[108px]"
      initial={{ opacity: 0, scale: 0.86, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="avatar-ring avatar-breathe absolute inset-0 rounded-full" />
      <img
        src={profile.media.avatar}
        alt={`${profile.displayName} avatar`}
        width={108}
        height={108}
        className="relative h-full w-full rounded-full object-cover"
      />
      <span
        className="status-dot absolute right-1 bottom-2 h-3.5 w-3.5 rounded-full border-2 border-void bg-signal"
        title={profile.status}
      />
    </motion.div>
  );
}
