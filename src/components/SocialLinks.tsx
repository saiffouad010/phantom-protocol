import { motion } from "motion/react";
import { configuredSocialLinks } from "@/config/profile";
import { SocialGlyph } from "@/components/icons";
import { Magnetic } from "@/components/Magnetic";

export function SocialLinks({ delay = 0.45 }: { delay?: number }) {
  const links = configuredSocialLinks();
  if (links.length === 0) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
      {links.map((link, index) => (
        <motion.div
          key={link.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.05, duration: 0.32 }}
        >
          <Magnetic>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${link.label}`}
              title={link.label}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-elevated/80 text-ink/80 transition duration-300 hover:-translate-y-0.5 hover:border-crimson/50 hover:text-ink hover:shadow-[0_10px_24px_rgba(164,22,26,0.28)]"
            >
              <SocialGlyph id={link.icon} className="h-[18px] w-[18px]" />
              <span className="pointer-events-none absolute bottom-[calc(100%+0.55rem)] left-1/2 z-20 w-max max-w-[220px] -translate-x-1/2 translate-y-1 rounded-lg border border-white/10 bg-[#0b0b0e]/95 px-2.5 py-1.5 text-[10px] text-ink opacity-0 shadow-xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {link.label}
              </span>
            </a>
          </Magnetic>
        </motion.div>
      ))}
    </div>
  );
}
