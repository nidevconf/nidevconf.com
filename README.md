# NIDC - Northern Ireland Developer Conference

The official website for [NIDC 2026](https://nidevconf.com), Northern Ireland's premier developer conference, celebrating 10 years. Saturday 21st November 2026 at ICC Belfast.

Built with [Next.js 16](https://nextjs.org) and deployed to GitHub Pages.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project Structure

The site is a single landing page with anchor-linked sections, plus one easter egg route.

```
app/
  page.tsx              # The landing page: hero, agenda, speak, villages,
                        # sponsors, tickets, footer
  layout.tsx            # Metadata, JSON-LD event schema, theme boot script
  site.css              # Site styles (brand direction "Headline")
  globals.css           # Tailwind v4 + shadcn tokens
  _components/          # Section components (Schedule, Tickets, HeroVideo,
                        # ThemeToggle, TiltBadge, TopicChips, SocialLinks)
  terminal/             # Hitchhiker's Guide easter egg
components/ui/          # shadcn-generated components
lib/utils.ts            # cn() class helper
public/images/          # Brand marks, photography
public/media/           # Hero trailer video + poster
```

## Deployment

The site is deployed to **GitHub Pages** automatically on every merge to `main`.

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs `next build` with static export and deploys the output to GitHub Pages.

**Live site:** https://nidevconf.com

## Contributing

The `main` branch is protected. To make changes:

1. Create a new branch from `main`
2. Make your changes
3. Open a Pull Request
4. Once approved and merged, the site deploys automatically

## Brand notes

- Pink `#EC008C` and yellow `#F2C94C` accents; light and dark themes invert the canvas
- Flat colour only, no gradients (scanline/dot/hatch patterns are fine)
- Theme tokens and the full style guide live at the top of `app/site.css`

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v4 + handwritten `site.css`, shadcn configured
- **Icons:** Lucide React
- **Integrations:** ti.to (ticket widget), Sessionize (call for speakers link)
- **Hosting:** GitHub Pages via GitHub Actions
