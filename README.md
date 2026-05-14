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


## v8 layout fix

Section background colors span the full browser width, while direct content inside each section is constrained to `max-width: 1600px` and centered with `width: 100%`.


## v11 layout update

All proposal sections now use a flex-centered outer wrapper with a max-width 1600px inner content container. Section background colors still span the full browser width.


## Header logo upload

Open the **Header** panel in the editor and use **Top-left Header Logo (.PNG)** to upload a transparent PNG studio logo. The logo is stored in browser localStorage for this prototype.


## Custom fonts

The app is configured to use:

- Heading: Queens Condensed
- Body: GT Alpina

For licensing reasons, font files are not bundled in this zip. Add your licensed font files here:

```txt
public/fonts/GT-Alpina-Standard-Light.otf
public/fonts/QueensCondensed.woff2
```

If your Queens file is `.otf`, name it:

```txt
public/fonts/QueensCondensed.otf
```

The font-face declarations live in:

```txt
src/app/globals.css
```


## Supabase database-backed storage

This version supports saving, duplicating, deleting, and previewing proposals through Supabase.

See `SUPABASE_SETUP.md` for setup instructions.

Important files:

```txt
src/lib/supabase.ts
src/lib/proposals-api.ts
src/lib/upload-asset.ts
supabase/schema.sql
supabase/storage-policies.sql
.env.example
```

When Supabase environment variables are present, uploaded images are sent to the `proposal-assets` bucket and proposals are saved to the `proposals` table. If Supabase is not configured, the app falls back to browser-local drafts!
