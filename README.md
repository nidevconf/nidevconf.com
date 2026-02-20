# NIDC - Northern Ireland Developers Conference

The official website for [NIDC 2025](https://nidevconf.github.io/nidevconf.com/) — Northern Ireland's premier developer conference. November 8th, 2025 at ICC Belfast.

Built with [Next.js 16](https://nextjs.org) and deployed to GitHub Pages.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project Structure

```
app/
  page.tsx              # Homepage
  agenda/               # Agenda (Sessionize embed)
  speakers/             # Speaker grid (Sessionize API)
  tickets/              # Tickets (ti.to embed)
  sponsors/             # Sponsor logos and links
  sponsor-info/         # Become a sponsor
  attendee/             # Attendee information
  past-events/          # Previous NIDC events
  faq/                  # Frequently asked questions
  code-of-conduct/      # Code of Conduct
  privacy/              # Privacy Policy
  terminal/             # Hitchhiker's Guide easter egg
components/             # Shared UI components
lib/data.ts             # Conference data, sponsors, navigation
public/sponsors/        # Sponsor logo images
```

## Deployment

The site is deployed to **GitHub Pages** automatically on every merge to `main`.

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs `next build` with static export and deploys the output to GitHub Pages.

**Live site:** https://nidevconf.github.io/nidevconf.com/

## Contributing

The `main` branch is protected. To make changes:

1. Create a new branch from `main`
2. Make your changes
3. Open a Pull Request
4. Once approved and merged, the site deploys automatically

## Adding or Updating Sponsor Logos

Place logo images in `public/sponsors/` and reference them in `lib/data.ts`. Supported formats: PNG, SVG, WebP. Logos should be at least 200px wide with a transparent background.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Integrations:** Sessionize (agenda/speakers), ti.to (tickets)
- **Hosting:** GitHub Pages via GitHub Actions
