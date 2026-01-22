# LiveStore Turbo FileSync

> **Note:** This project targets LiveStore 0.4, which is currently in beta.

This is an experimental repository for testing [LiveStore FileSync](https://github.com/slashv/livestore-filesync) in a cross-platform image gallery app.

Based on the [LiveStore Turbo](https://github.com/slashv/livestore-turbo) template.

---

A cross-platform app with real-time sync across web, desktop, and mobile. Uses [LiveStore](https://livestore.dev) for local-first data, [better-auth](https://better-auth.com) for authentication, and [Cloudflare](https://cloudflare.com) for deployment.

| Platform | Stack |
|----------|-------|
| Web | TanStack Router + Vite |
| Desktop | Electron |
| Mobile | Expo React Native |
| Backend | Cloudflare Workers + D1 |

---

## Project Structure

```
livestore-turbo-filesync/
├── apps/
│   ├── web/           # TanStack Router + Vite web app
│   ├── electron/      # Electron desktop app
│   ├── mobile/        # Expo React Native app
│   └── server/        # Cloudflare Worker (sync + auth)
├── packages/
│   ├── schema/        # Shared LiveStore schema
│   ├── core/          # Shared queries and utilities
│   ├── ui/            # Shared React components
│   └── tsconfig/      # Shared TypeScript configs
├── libs/
│   ├── livestore-filesync/  # FileSync submodule (dev branch)
│   └── livestore/           # LiveStore submodule (for AI context)
```

---

## Getting Started

### 1. Clone the repository

This repo uses git submodules for `libs/livestore-filesync` and `libs/livestore`. Clone with `--recursive` to include them:

```bash
git clone --recursive https://github.com/slashv/livestore-turbo-filesync.git
```

If you already cloned without `--recursive`, initialize the submodules:

```bash
git submodule update --init --recursive
```

**Why submodules?**
- `libs/livestore-filesync` - This repo serves as the testing ground for livestore-filesync, so both are developed in unison with the submodule pointing to the dev branch.
- `libs/livestore` - Included primarily to give AI coding agents better context about LiveStore internals when working on this codebase.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up the auth database

```bash
cd apps/server
pnpm db:migrate
```

This creates a local SQLite database for better-auth. For production setup, see [docs/deployment.md](./docs/deployment.md).

### 4. Start development

```bash
pnpm dev              # Web + server
pnpm dev:electron     # Desktop app
pnpm dev:mobile       # Mobile (Expo)
```

---

## Architecture

All apps share the same LiveStore schema from `@repo/schema`:

- **Tables**: `images`, `files`, `thumbnails`, `uiState`
- **Events**: `ImageCreated`, `ImageDeleted`, file sync events, etc.
- **Materializers**: Map events to SQLite state changes

Data syncs in real-time across all connected clients via the Cloudflare Worker.

---

## Documentation

- [Authentication](./docs/authentication.md) - Auth setup for web, desktop, and mobile
- [Testing](./docs/testing.md) - E2E tests with Playwright and Maestro
- [Deployment](./docs/deployment.md) - Deploy to Cloudflare, GitHub Releases, and EAS

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start web + server |
| `pnpm dev:web` | Start web + server only |
| `pnpm dev:mobile` | Start mobile (Expo) |
| `pnpm dev:electron` | Start desktop |
| `pnpm build` | Build all apps |
| `pnpm typecheck` | TypeScript checks |
| `pnpm lint` | Run Biome linter |
| `pnpm test:e2e:web` | Playwright web tests |
| `pnpm test:e2e:electron` | Playwright desktop tests |
| `pnpm test:e2e:mobile` | Maestro mobile tests |
| `pnpm deploy:preview` | Deploy all to preview |
| `pnpm deploy:prod` | Deploy all to production |
