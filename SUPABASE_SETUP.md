# Supabase setup

## 1. Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

Add the same two variables in Vercel under Project Settings → Environment Variables.

## 2. Database

In Supabase, go to SQL Editor → New query and run:

```sql
-- See supabase/schema.sql
```

You can copy the contents of `supabase/schema.sql` directly into the query editor.

## 3. Storage

Create a public Storage bucket named:

```txt
proposal-assets
```

If uploads are blocked, run the policies in `supabase/storage-policies.sql`.

## 4. Run locally

```bash
npm install
npm run dev
```

The app still keeps a local browser draft while you edit, but the Save, New, Duplicate, Delete, Preview, and image uploads now use Supabase when the environment variables are present.
