import type { ComponentType, SVGProps } from "react";
import type { FeaturedIcon, SocialPlatform } from "@/config/profile";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg {...base({ fill: "currentColor", stroke: "none", ...props })}>
      <path d="M19.7 5.3A17 17 0 0 0 15.3 4l-.4.8a15 15 0 0 1 3.6 1.4 13.7 13.7 0 0 0-13 0A15 15 0 0 1 9 4.8L8.7 4A17 17 0 0 0 4.3 5.3C1.8 9.1 1.1 12.8 1.4 16.4a17.3 17.3 0 0 0 5.2 2.6l1.1-1.8a11 11 0 0 1-1.7-.8l.4-.3a8.8 8.8 0 0 0 12.2 0l.4.3a11 11 0 0 1-1.7.8l1.1 1.8a17.3 17.3 0 0 0 5.2-2.6c.5-4.3-.5-8-2.9-11.1ZM8.8 13.9c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Zm6.4 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Z" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base({ fill: "currentColor", stroke: "none", ...props })}>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.4.1-2.8 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.8.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.2c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base({ fill: "currentColor", stroke: "none", ...props })}>
      <path d="M14.2 3h2.2a6.4 6.4 0 0 0 4.4 4.2v2.3A8.5 8.5 0 0 1 16.4 8v7.1a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v2.4a3.8 3.8 0 1 0 2.7 3.7V3Z" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base({ fill: "currentColor", stroke: "none", ...props })}>
      <path d="M20.7 5.2 17.9 19c-.2.9-.8 1.1-1.6.7l-4.4-3.2-2.1 2c-.2.3-.5.5-1 .5l.3-4.5 8.2-7.4c.4-.3-.1-.5-.6-.2L6.2 12.4 1.9 11c-.9-.3-.9-.9.2-1.3L19.5 4c.8-.3 1.4.2 1.2 1.2Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base({ fill: "currentColor", stroke: "none", ...props })}>
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18.1 5 12 5 12 5s-6.1 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9C2 8.8 2 12 2 12s0 3.2.4 4.8a2.7 2.7 0 0 0 1.9 1.9C5.9 19 12 19 12 19s6.1 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const map: Record<SocialPlatform, ComponentType<IconProps>> = {
  discord: DiscordIcon,
  github: GitHubIcon,
  tiktok: TikTokIcon,
  telegram: TelegramIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
};

export function SocialGlyph({
  id,
  className,
}: {
  id: SocialPlatform;
  className?: string;
}) {
  const Glyph = map[id];
  return <Glyph className={className} />;
}

export function featuredIsSocial(icon: FeaturedIcon): icon is SocialPlatform {
  return icon in map;
}
