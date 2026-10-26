import { profile } from "@/config/profile";

export function Avatar() {
  return (
    <div className="relative mx-auto h-[108px] w-[108px]">
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
    </div>
  );
}
