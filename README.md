# Proposal Builder

A GitHub/Vercel-ready Next.js proposal builder for creating editable brand and website proposal microsites.

## What's included

- Editable proposal builder sidebar
- Live in-app preview
- Working Preview button that opens `/proposals/[slug]`
- Multiple proposals saved in browser localStorage
- Duplicate, new, and delete proposal controls
- Editable colors, fonts, logos, team members, and deliverables

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploying to Vercel

Use these Vercel settings:

- Framework Preset: Next.js
- Root Directory: `./`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave empty

## Important note

This is still a front-end prototype. It stores proposals in the browser's localStorage. For a production app, the next step is adding a database, authentication, image uploads, and a real CMS/backend.
