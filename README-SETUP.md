# Aritra Das Sharma Portfolio

## Requirements
- Node.js 20 LTS or newer
- npm
- Supabase project (for admin login, saved content, uploads and contact messages)

## Run locally (Windows PowerShell)
1. Open this folder in VS Code.
2. Open Terminal > New Terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Fill `.env.local` with the Supabase Project URL and publishable key.
6. In Supabase > SQL Editor, run `supabase/schema.sql`.
7. In Supabase > Authentication > Users, create the administrator user.
8. Copy that user's UUID. In Supabase > SQL Editor, run:
   `insert into public.admin_users (user_id, is_active) values ('PASTE-AUTH-USER-UUID-HERE', true);`
9. Run `npm run dev`.
10. Open the localhost URL printed by Vite.

## Admin access
- Open `/admin` (for example `http://localhost:5173/admin`).
- Sign in using the email/password created in Supabase Authentication.
- After login the site checks that the signed-in UUID exists in `public.admin_users` with `is_active = true`.
- The protected dashboard is `/dashboard`.
- Do not hardcode an admin password in source code and never use a Supabase service-role key in `.env.local`.

## Images
All existing artwork is in `public/images/`. The initial portfolio data uses paths beginning `/images/...`.
Do not rename those files unless you also update their paths in `src/data/initialData.js`.
The resume PDF used by the public download button is `public/resume.pdf`.

## Important content behaviour
- Each project has a stable `id` and `slug`; editing its title does not change its URL.
- `hidden` hides a project from the public portfolio without deleting it.
- `is_deleted` is a soft-delete flag; restore it from the dashboard list.
- Skill percentages are currently set to 90% as requested and can be edited in the dashboard.
- Project/gallery descriptions are written as five-sentence descriptions. Review visual details before publishing if any caption does not match the exact artwork.

## Troubleshooting
- If React or Navbar is reported missing, run `npm install` in the folder containing `package.json`, then restart `npm run dev`.
- If Supabase says the URL/key is missing, check `.env.local` variable names exactly.
- After editing `.env.local`, stop Vite with Ctrl+C and run `npm run dev` again.
