# Proposal Builder

A starter Next.js app for creating editable, scroll-based brand and website proposal microsites.

This prototype is designed so you can push it to GitHub, run it locally, and start modifying the code. It currently stores proposals in browser `localStorage`, so it works without a backend while you experiment.

## What it does now

- Create, edit, duplicate, and delete proposals
- Edit proposal content, colors, fonts, team members, client logos, and deliverables
- Live preview inspired by an editorial proposal/microsite layout
- Persists proposal data locally in your browser
- Image URLs for team headshots

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial proposal builder prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## File structure

```txt
src/app/page.tsx                 Main builder UI
src/components/editor-panel.tsx  Editable CMS-style panel
src/components/proposal-preview.tsx Scrollable proposal preview
src/components/sidebar.tsx       Admin sidebar navigation
src/components/fields.tsx        Reusable editor fields
src/components/ui.tsx            Lightweight UI primitives
src/lib/starterProposal.ts       Starter content and blank template
src/lib/storage.ts               localStorage persistence
src/lib/types.ts                 TypeScript types
```

## Where to customize the design

Most front-end proposal styling lives in:

```txt
src/components/proposal-preview.tsx
```

The editable sidebar fields live in:

```txt
src/components/editor-panel.tsx
```

The starting proposal content lives in:

```txt
src/lib/starterProposal.ts
```

## Next steps to make it production-ready

The current project is a front-end prototype. To turn it into a real client proposal platform, add:

1. Authentication
2. Database storage
3. Media uploads
4. Public proposal routes like `/proposals/client-name`
5. Password protection for shared proposals
6. PDF export
7. Client approval button
8. Analytics for proposal views

Good backend/CMS options:

- Payload CMS + Postgres
- Sanity
- Supabase
- Prisma + Postgres

A strong production stack would be Next.js + Payload CMS + Postgres + Vercel.
