import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { configuredFeaturedLinks, type FeaturedLink } from "@/config/profile";
import { featuredIsSocial, SocialGlyph } from "@/components/icons";

function CardIcon({ item }: { item: FeaturedLink }) {
  if (item.iconAsset) {
    return (
      <img
        src={item.iconAsset}
        alt=""
        className="h-10 w-10 rounded-xl object-cover"
      />
    );
  }
  if (featuredIsSocial(item.icon)) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-ink">
        <SocialGlyph id={item.icon} className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] font-mono text-xs text-mute">
      /
    </span>
  );
}

function LinkCard({ item, index, delay }: { item: FeaturedLink; index: number; delay: number }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-center gap-3 overflow-hidden border-b border-white/10 px-1 py-3.5 transition duration-300 hover:border-crimson/55 hover:bg-white/[0.025]"
      onPointerMove={(event) => {
        const node = event.currentTarget;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--cx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--cy", `${event.clientY - rect.top}px`);
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--cx, 50%) var(--cy, 50%), rgba(229,57,53,0.16), transparent 55%)",
        }}
      />
      <CardIcon item={item} />
      <span className="relative min-w-0 flex-1">
        <span className="block truncate font-display text-[15px] font-semibold tracking-tight text-ink">
          {item.title}
        </span>
        <span className="mt-0.5 block truncate text-[12.5px] text-mute">
          {item.description}
        </span>
      </span>
      <ArrowUpRight className="relative h-4 w-4 shrink-0 text-mute transition duration-300 group-hover:text-crimson" />
    </motion.a>
  );
}

export function LinkCards({ delay = 0.55 }: { delay?: number }) {
  const links = configuredFeaturedLinks();
  if (links.length === 0) return null;

  return (
    <div className="mt-5 grid gap-2">
      {links.map((item, index) => (
        <LinkCard key={item.id} item={item} index={index} delay={delay} />
      ))}
    </div>
  );
}
