# Proposal Builder

Editable proposal builder for brand and website proposal microsites.

## What's included

- Next.js + React + TypeScript + Tailwind
- Editable proposal sidebar
- Live scrollable proposal preview
- Public preview route at `/proposals/[slug]`
- Duplicate, create, and delete proposals
- Editable colors, fonts, content, deliverables, team, and logo list
- Image uploads saved to browser storage for:
  - Letter signer headshots
  - About the studio image
  - Past client logo images
  - Experience section image
  - Team headshots

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Vercel settings

Use these settings when importing the repo:

- Framework Preset: Next.js
- Root Directory: `./`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave completely blank

## Note about image uploads

This version stores uploaded images in the browser using `localStorage`, which is perfect for prototyping. For production/client sharing across devices, connect this to a real CMS/database and image storage service.


## v7 update

Proposal section background colors remain full-width, while section content is constrained to a 1600px maximum width.
