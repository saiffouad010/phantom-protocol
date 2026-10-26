# PHANTOM PROTOCOL

**Developed and maintained by ENG - SAIF.**

PHANTOM PROTOCOL is a cinematic personal identity website for Saif Fouad, combining a dark gothic visual system with developer, gaming, and Red Team interests.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Motion for React
- Lucide React
- Cloudflare Pages Functions + KV for Profile Views

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification and production build

```bash
npm run build
npm audit
npm run preview
```

The build runs TypeScript checking and creates the production output in `dist/`. Production source maps are not emitted.

## Project structure

- `src/config/profile.ts` — editable identity, About Me data, links, and media paths.
- `src/components/` — profile, intro, About Me, social links, counter, and shared UI components.
- `functions/api/views.js` — Cloudflare Pages Function for the privacy-conscious session-based view counter.
- `public/media/` — optimized media used by the website.
- `public/_headers` — Cloudflare response headers and caching rules.
- `.github/workflows/ci.yml` — typecheck, build, and dependency audit.

## Customize

Edit `src/config/profile.ts` to update the name, bio, status, About Me categories, credential wallet, social links, and media paths. Social links must use real `https://` URLs; empty links remain hidden.

The Discord buttons use numeric Discord User IDs so they open profiles directly instead of copying usernames.

## Deploy to Cloudflare Pages

The project uses `wrangler.jsonc` for the Pages output directory and KV binding. After authenticating Wrangler:

```bash
npm run build
npx wrangler pages deploy dist --project-name phantom-protocol --branch main
```

Do not place Cloudflare API tokens in the repository. Use Wrangler login locally or protected CI secrets.

## Security and public release

Read `SECURITY.md`, `PUBLIC_RELEASE_AUDIT.md`, and `CLEANUP_REPORT.md` before publishing the repository. The client-side code is intentionally readable; public JavaScript cannot be made confidential through obfuscation. No secrets are required by this project.

The included media assets were supplied for this project. Confirm redistribution rights before making the repository public. No license file is included because code ownership and third-party media rights have not been confirmed.
