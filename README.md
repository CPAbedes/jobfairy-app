# JobTrackr

A personal job-application tracker built with **TanStack Start (React 19 + Vite)**, **Tailwind CSS v4**, and **Supabase** (Postgres + Auth + RLS).

Created by Christian Paul Abedes.

---

## 1. Prerequisites

- Node.js 20+ and [Bun](https://bun.sh) (or npm/pnpm)
- A free [Supabase](https://supabase.com) account
- A [Vercel](https://vercel.com) or [Netlify](https://netlify.com) account for deployment

---

## 2. Set up a new Supabase project

1. Go to <https://supabase.com/dashboard> → **New project**. Pick a name, password, and region.
2. Once it finishes provisioning, open **SQL Editor** → **New query**.
3. Paste the contents of [`schema.sql`](./schema.sql) (in this repo) and click **Run**. This creates the `job_applications` table, its indexes, RLS policies, the `set_updated_at()` function, and the update trigger.
4. Open **Authentication → Providers → Email** and make sure email/password sign-in is enabled. (Optional: disable "Confirm email" while developing.)
5. Go to **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`
   - **Project ref** (the subdomain in the URL) → `VITE_SUPABASE_PROJECT_ID`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret, server-only)

---

## 3. Configure environment variables locally

Copy the template and fill in the values from step 2:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...   # same value as anon key
VITE_SUPABASE_PROJECT_ID=YOUR-PROJECT-REF

SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...        # only needed for admin server fns
```

> **Note:** Supabase's *publishable key* and *anon key* are the same value. The generated client reads `VITE_SUPABASE_PUBLISHABLE_KEY`; setting both keeps the client and any future code paths happy.

Install and run:

```bash
bun install
bun run dev
```

Open <http://localhost:5173>.

---

## 4. Deploy

### Option A — Vercel

1. Push this repo to GitHub.
2. <https://vercel.com/new> → **Import** the repo.
3. **Framework preset:** Vite. Build command and output directory are auto-detected.
4. Under **Environment Variables**, add every variable from your `.env` (both `VITE_*` and the server-side `SUPABASE_*` keys).
5. Click **Deploy**.
6. After the first deploy, go to your Supabase project → **Authentication → URL Configuration** and add your Vercel URL (e.g. `https://your-app.vercel.app`) to **Site URL** and **Redirect URLs**.

### Option B — Netlify

1. Push this repo to GitHub.
2. <https://app.netlify.com/start> → pick the repo.
3. **Build command:** `bun run build` (or `npm run build`). **Publish directory:** `dist`.
4. Under **Site settings → Environment variables**, add the same variables as above.
5. Deploy, then add the Netlify URL to Supabase **Authentication → URL Configuration**.

---

## 5. Project structure

```
src/
  routes/             # File-based routes (TanStack Start)
  components/         # JobTracker UI + design system
  integrations/
    supabase/
      client.ts       # Browser client (reads VITE_SUPABASE_*)
      client.server.ts# Admin client (reads SUPABASE_SERVICE_ROLE_KEY)
  lib/auth-context.tsx
supabase/migrations/  # Original migrations (also exported in schema.sql)
schema.sql            # One-shot schema for fresh Supabase projects
.env.example          # Environment variable template
```

---

## 6. Troubleshooting

- **"Missing Supabase environment variable(s)"** — `.env` not loaded. Restart the dev server after editing it.
- **Auth works locally but not in production** — add the deployed URL to Supabase → Authentication → URL Configuration.
- **Empty dashboard after sign-in** — RLS is on; make sure you ran `schema.sql` so the `own select/insert/update/delete` policies exist.

---

JobTrackr™ · Created by Christian Paul Abedes