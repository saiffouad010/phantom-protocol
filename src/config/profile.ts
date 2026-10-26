/**
 * PHANTOM PROTOCOL
 * Developed by ENG - SAIF
 *
 * Personal Digital Identity Experience
 */
export type SocialPlatform =
  | "discord"
  | "github"
  | "tiktok"
  | "telegram"
  | "youtube"
  | "instagram";

export type FeaturedIcon = SocialPlatform | "vscode" | "code" | "globe";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: SocialPlatform;
}

export interface FeaturedLink {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: FeaturedIcon;
  iconAsset?: string;
}

export const profile = {
  developerIdentity: {
    name: "ENG - SAIF",
    credit: "Developed by ENG - SAIF",
    project: "PHANTOM PROTOCOL",
  },
  protocolName: "PHANTOM PROTOCOL",
  displayName: "Saif Fouad",
  username: "",
  bio: "Building in the dark — code, games, and the quieter side of security. Curious about systems, careful with power, always learning.",
  status: "Building something new",
  terminalLine: "$ whoami",
  terminalValue: "saif fouad",
  roles: [
    { id: "developer", label: "Developer" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "gamer", label: "Gamer" },
  ] as const,
  about: {
    programming: ["Java", "Python", "C++"],
    games: ["Roblox", "CS2", "Valorant", "Resident Evil 4"],
    security: ["Red Team"],
    credentialsUrl: "https://www.credential.net/profile/saiffottuh434602/wallet",
  },
  media: {
    avatar: "/media/avatar-256.webp",
    banner: "/media/banner.webp",
    background: "/media/background.webp",
    poster: "/media/poster.webp",
    video: "/media/atmosphere.mp4",
    codeSymbol: "/media/code-symbol.webp",
    vscode: "/media/vscode.webp",
  },
  socialLinks: [
    { id: "discord-personal", label: "Discord Personal · s7.m9", href: "https://discord.com/users/1414704237144965240", icon: "discord" },
    { id: "discord-backup", label: "Discord Backup · 6x_n", href: "https://discord.com/users/1261663780451123210", icon: "discord" },
    { id: "github", label: "GitHub · saiffouad010", href: "https://github.com/saiffouad010", icon: "github" },
    { id: "instagram", label: "Instagram · s9x.x5", href: "https://www.instagram.com/s9x.x5/", icon: "instagram" },
    { id: "tiktok", label: "TikTok", href: "", icon: "tiktok" },
    { id: "telegram", label: "Telegram", href: "", icon: "telegram" },
    { id: "youtube", label: "YouTube", href: "", icon: "youtube" },
  ] satisfies SocialLink[],
  featuredLinks: [
    { id: "discord", title: "Discord Community", description: "Join my Discord server — community & updates", href: "", icon: "discord" },
    { id: "vscode", title: "Development Environment", description: "VS Code setup — my development workspace", href: "", icon: "vscode", iconAsset: "/media/vscode.webp" },
    { id: "projects", title: "Projects & Code", description: "Explore my projects — code, experiments & tools", href: "", icon: "code", iconAsset: "/media/code-symbol.webp" },
    { id: "tiktok", title: "TikTok", description: "Short-form content — gaming & development", href: "", icon: "tiktok" },
    { id: "github", title: "GitHub", description: "Source code & open-source work", href: "https://github.com/saiffouad010", icon: "github" },
  ] satisfies FeaturedLink[],
  seo: {
    title: "Saif Fouad — PHANTOM PROTOCOL",
    description: "Saif Fouad — developer working with Java, Python and C++, gamer, and Red Team cybersecurity enthusiast.",
  },
} as const;

export function isSafeUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function configuredSocialLinks() {
  return profile.socialLinks.filter((link) => isSafeUrl(link.href));
}

export function configuredFeaturedLinks() {
  return profile.featuredLinks.filter((link) => isSafeUrl(link.href));
}
