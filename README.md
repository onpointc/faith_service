# Rebuild the full monorepo with all features + automation, then zip it for download

import os, json, zipfile, pathlib, textwrap

root = "/mnt/data/faith-service-platform-starter"
if os.path.exists(root):
    # Clean rebuild
    import shutil
    shutil.rmtree(root)
os.makedirs(root, exist_ok=True)

# ------------------- Root setup -------------------
workspace_pkg = {
  "name": "faith-service-platform",
  "private": True,
  "packageManager": "pnpm@9.0.0",
  "workspaces": ["apps/*", "packages/*"]
}
with open(f"{root}/package.json","w") as f:
    json.dump(workspace_pkg, f, indent=2)

readme = """# Faith & Service Student Engagement Platform — Monorepo

Clean, modern starter for your platform with web, mobile, and API. Uses TypeScript across the stack.

## Stack
- **Web**: Next.js 14 + Tailwind
- **Mobile**: Expo (React Native)
- **API**: Fastify (TypeScript) + Prisma (PostgreSQL)
- **Auth**: Supabase (web + mobile), API JWT check via JWKS
- **AI**: OpenAI-driven sentiment on reflections (fallback heuristic)
- **PDF**: PDFKit student report
- **News/Blog**: CRUD + student feed
- **Achievement Levels**: thresholds per school + auto-level updates
- **Automation**: GitHub Codespaces devcontainer, GitHub Actions CI, Fly.io API deploy

## Quick start (local)
```bash
pnpm install
cp .env.example .env
# Edit DATABASE_URL etc.

pnpm --filter @fse/api prisma:generate
pnpm --filter @fse/api dev    # API http://localhost:8787
pnpm --filter @fse/web dev    # Web http://localhost:3000

cd apps/mobile && npx expo start
