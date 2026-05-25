# bardbard-site — Session Memory

## Project
- **Local path:** `/Users/bradjensen/Library/Mobile Documents/com~apple~CloudDocs/bardbard-site`
- **GitHub repo:** `https://github.com/realbardbard-coder/bardbard-site.git`
- **GitHub account:** `realbardbard-coder`
- **User email:** `realbardbard@gmail.com`

## Git State (as of 2026-05-25)
- Branch: `main` — pushed to GitHub ✅
- Remote `origin` is set to `https://github.com/realbardbard-coder/bardbard-site.git`
- Commits:
  - `9ec5dc1` Add .gitignore
  - `f414288` initial commit
- `.gitignore` excludes: `.DS_Store`, `.wrangler/`, `node_modules/`
- PAT type that works: **classic PAT with `repo` scope** (fine-grained tokens with Contents:Read-only block git push)

## What Was Done
1. ✅ Added git remote `origin` pointing to the GitHub repo
2. ✅ Created `.gitignore` and committed it
3. ✅ Pushed `main` to GitHub — repo is live at https://github.com/realbardbard-coder/bardbard-site

## Live URLs
- **Production:** https://bardbard.xyz → `main` branch (auto-deploys on push)
- **Staging:** https://staging.bardbard-site.pages.dev → `staging` branch (auto-deploys on push, Cloudflare Access protected)
- **GitHub:** https://github.com/realbardbard-coder/bardbard-site

## Branch Setup
- `production` — Cloudflare Pages production branch (what gets deployed to bardbard.xyz)
- `main` — source of truth, merge here first then merge to production
- `staging` — sandbox for trying changes before going live

## Staging Workflow
- Make changes on the `staging` branch
- Push → Cloudflare Pages deploys to `staging.bardbard-site.pages.dev`
- To promote: user says "push staging to production" → Claude merges staging→main→production and pushes all three

## Cloudflare Pages Config Issue (pending fix)
- Dashboard shows production branch = "production" (not "main")
- Workaround: we maintain a `production` branch that mirrors main
- Fix later: go to Pages → bardbard-site → Settings → General → change production branch to "main", then delete the production branch

## Build
- Build command: `npm run build` (Vite)
- Output directory: `dist`
- Entry point: `src/app.jsx`

## Files in Repo
- `index.html` — main entry point
- `assets/` — static assets
- `games/` — game files
- `src/` — source files
- `ws-resources.json` — Walrus/Web3 resources

## PAT Note
⚠️ Do NOT store the PAT in any file. Ask the user to paste a new token when needed.
